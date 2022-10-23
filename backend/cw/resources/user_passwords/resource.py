from datetime import datetime

from pyramid.security import (
	authenticated_userid,
	Authenticated,
	Allow,
)
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest

from cornice.resource import resource, view
from cornice.validators import (
	colander_body_validator,
	colander_querystring_validator,
	colander_path_validator,
	colander_validator,
)

from sqlalchemy import func


from cw.database import User, UserRole
from cw.modules.cornice import negotiation_params
from cw.modules.security import (check_password, hash_password)


from .._shared.schema import (	
	ResponseBodyEmptySchema,
	map_data_to_body_schema,
)

from .schema import (
	UpdateUserPasswordSchema,
	ResponseUserPasswordSchema,
)

@resource(path="/user-passwords/{id}", description="User passwords resource", tags=["UserPasswords"], **negotiation_params)
class UserPasswordsResource(object):
	def __init__(self, request, context=None):
		self.request = request

	def __acl__(self):
		return [
			(Allow, Authenticated, ("update",)),
		]

	@view(
		schema=UpdateUserPasswordSchema(),
		validators=(colander_validator,),
		response_schemas={
			'200': ResponseUserPasswordSchema(description="resutn OK response")
		},
		permission="update",		
	)
	def put(self):
		body_data = self.request.validated["body"]
		path_data = self.request.validated["path"]

		change_user = self.request.db.query(User).get(path_data["id"])
		if change_user is None:
			raise HTTPBadRequest(explanation="Incorrect user id!")

		logged_user_id = authenticated_userid(self.request)
		if change_user.id == logged_user_id:
			old_password = body_data['old_password']
			if not check_password(old_password, change_user.password):
				raise HTTPBadRequest(explanation="Incorrect password!")
		else:
			pass
		
		change_user.password = hash_password(body_data['password'])
		
		self.request.db.flush()

		return map_data_to_body_schema(ResponseUserPasswordSchema, {
			"id": path_data["id"],
		});
