from pyramid.view import view_config
from pyramid.security import Allow, Everyone
from cornice_swagger import CorniceSwagger
from cornice_swagger.converters.schema import TypeConversionDispatcher, TypeConverter, ArrayTypeConverter, ValidatorConversionDispatcher, convert_length_validator_factory
from cornice.service import get_services
from cornice.validators import extract_cstruct
import colander

from cw.modules.renderers.negotiation import get_producers_by_render
from cw.modules.renderers.negotiation.XmlRendererFactory import ROOTNODE_XML_NAME

import six
from cornice_swagger.util import body_schema_transformer, merge_dicts, trim

import xmltodict


# @implementer(IViewDeriver)
# class deriver(object):
# 	def options(self):
# 		return ['deserializer']
# 	def __call__(self, view, info):
# 		return view
def deserializer_deriver(view, info):
    return view
deserializer_deriver.options = ('deserializer',)

def extract_cstruct_with_xml(request):
	cstruct = extract_cstruct(request)
	if request.content_type == 'text/xml':
		cstruct['body'] = xmltodict.parse(cstruct['body'])[ROOTNODE_XML_NAME]

	return cstruct


# class TupleTypeConverter(TypeConverter):
class TupleTypeConverter(ArrayTypeConverter):
	# type = 'array'

	def convert_type(self, schema_node):

		converted = super(TupleTypeConverter, self).convert_type(schema_node)
		converted['title'] = schema_node.children[0].title + '-' + schema_node.children[1].title
		# TODO: set max length for array
		converted['maxItems'] = 2

		return converted

class ListTypeConverter(ArrayTypeConverter):
    # type = 'array'

    def convert_type(self, schema_node):

        converted = super(ListTypeConverter, self).convert_type(schema_node)

        return converted


class CorniceSwaggerEx(CorniceSwagger):
	custom_type_converters = {
		colander.Tuple: TupleTypeConverter,
		colander.List: ListTypeConverter,
	}	

	def _extract_operation_from_view(self, view, args):
		op = super(CorniceSwaggerEx, self)._extract_operation_from_view(view, args)

		produces = get_producers_by_render(args.get('renderer', ''))
		if produces:
			op.setdefault('produces', produces)
		
		# not needed as add content_type is added to the resource
		# op.setdefault('consumes', ['application/json', 'text/xml'])

		return op


def extract_disallowed_services(principals, services):
	disallowed_services = []

	for service in services:
		for definition in service.definitions:
			method, view, opts = definition
			klass = opts.get("klass")
			if klass is None:
				continue
			acls = klass.__acl__(None)
			current_user_acls = set()
			for allow, role, permissions in acls:
				if allow is Allow and role in principals:
					current_user_acls.update(permissions)

			is_allowed = opts["permission"] in current_user_acls

			if not is_allowed:
				disallowed_services.append((service.path, method.lower()))
	return disallowed_services


def remove_disallowed_services_from_spec(spec, disallowed_services):
	for path, method in disallowed_services:
		_path = spec["paths"][path]
		_path_method = _path.get(method)
		if _path_method is not None:
			del _path[method]

	tags = set()
	for path in spec["paths"]:
		for route_key in spec["paths"][path]:
			route = spec["paths"][path][route_key]
			if isinstance(route, dict):
				tags.update(route["tags"])

	spec["tags"] = [{"name": t} for t in sorted(tags)]

def add_xml_root_name(spec):
	for path in spec["paths"]:
		for route_key in spec["paths"][path]:
			route = spec["paths"][path][route_key]
			if route_key in ['post', 'put', 'get']:
				for resp_key in route['responses']:
					resp = route['responses'][resp_key]
					if 'schema' in resp:
						resp['schema']['xml'] = {'name': ROOTNODE_XML_NAME}
				if route_key in ['post', 'put']:
					if 'parameters' in route:
						for param in route['parameters']:
							if param['in'] == 'body':
								param['schema']['xml'] = {'name': ROOTNODE_XML_NAME}

@view_config(route_name="swagger", renderer="json", permission="navigate")
def swagger(request):
	services = get_services()
	doc = CorniceSwaggerEx(services)
	doc.summary_docstrings = True
	spec = doc.generate('CW', '1.0.0')

	# TODO: Try to filter services after get_services()
	# principals = set(effective_principals(request))
	principals = set(request.effective_principals)
	disallowed_services = extract_disallowed_services(principals, services)
	remove_disallowed_services_from_spec(spec, disallowed_services)

	add_xml_root_name(spec)

	return spec


negotiation_params = dict(
	renderer="negotiate",
	content_type=('application/json', 'text/xml'),
	deserializer=extract_cstruct_with_xml,
)


def includeme(config):
	config.include("cornice")
	config.include("cornice_swagger")
	config.add_route("swagger", "/swagger.json")
	config.scan()
