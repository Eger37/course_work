from pyramid.security import ALL_PERMISSIONS, NO_PERMISSION_REQUIRED, Allow, Deny, Everyone, Authenticated
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPUnauthorized, HTTPForbidden

from .ACLAuthorizationPolicy import MyACLAuthorizationPolicy
from .password import hash_password, check_password


TOKEN_EXPIRATION_SECONDS = 60 * 60 * 24 * 2


class Root(object):
	def __acl__(self):
		return [
			(Allow, Authenticated, ("navigate")),
		]

	def __init__(self, request):
		self.request = request


def groupfinder(userid, request):
	permissions = {request.jwt_claims.get('role')}
	return permissions


def includeme(config):
	# Authorization
	config.set_root_factory(Root)
	authz_policy = MyACLAuthorizationPolicy()
	config.set_authorization_policy(authz_policy)

	# Enable JWT authentication.
	config.include('pyramid_jwt')
	config.set_jwt_authentication_policy(
		'MY SUPER SECRET KEY 9',
		auth_type='Bearer',
		http_header='Authorization',
		callback=groupfinder,
		expiration=TOKEN_EXPIRATION_SECONDS
	)

	config.add_route("status", "/status")
	config.add_view_deriver(is_blocked_deriver)


def is_blocked_deriver(view, info):
	if info.options.get('permission') in (NO_PERMISSION_REQUIRED, None, ):
		return view

	def wrapped_view(context, request):
		if request.redis.exists(f"is_blocked:{request.authenticated_userid}"):
			raise HTTPUnauthorized()
		return view(context, request)
	return wrapped_view


@view_config(route_name="status", renderer="json", permission="navigate")
def status(request):
	return request.jwt_claims
