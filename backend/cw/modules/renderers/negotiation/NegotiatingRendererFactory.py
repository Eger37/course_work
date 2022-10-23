from pyramid.httpexceptions import HTTPBadRequest

# TODO: fix 'NegotiatingRendererFactory' object has no attribute 'render_errors'
class NegotiatingRendererFactory:
	_CONNEG_MAPPINGS = {
		# 'text/plain': renderers.string_renderer_factory
	}

	def __init__(self, mappings=None, **kw):
		if mappings is None:
			mappings = {}

		NegotiatingRendererFactory._CONNEG_MAPPINGS.update(mappings)
		NegotiatingRendererFactory._CONNEG_MAPPINGS.update(kw)

	def __call__(self, info):
		def _render(value, system):
			request = system.get('request')
			accept_header = request.headers['accept']

			for key in NegotiatingRendererFactory._CONNEG_MAPPINGS:
				if key in accept_header:
					negotiated_render = NegotiatingRendererFactory._CONNEG_MAPPINGS[key]
					result = negotiated_render(info)(value, system)
					return result

		return _render

	def render_errors(self, request):
		request.response.status = 400
		return request.errors
