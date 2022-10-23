import datetime

from cornice import Service
from cornice.validators import (
	colander_body_validator,
)

from pyramid.httpexceptions import HTTPBadRequest
from sqlalchemy.orm import with_polymorphic

from cw.database import User, Admin, Manager, Client, UserType
from cw.modules.security import check_password

from cw.resources.auth.schema import (
	SchemaLogin,
	ResponseBodyLoginSchema,
)

from cw.modules.cornice import negotiation_params
from cw.resources.auth.service import map_user_type_to_role


login = Service(name="login", description="Authorization", path="/login", tags=["Authorization"], **negotiation_params)

@login.get(
	renderer="json",
	response_schemas={
		'200': ResponseBodyLoginSchema(description="Return OK response"),
	}
)
def login_test(request):
	return {"message": "Hello"}


@login.post(
	schema=SchemaLogin(),
	validators=(colander_body_validator,),
	response_schemas={
		'200': ResponseBodyLoginSchema(description="Return OK response"),
	}
)
def auth_login(request):
	"""Returns 'token', 'role' by email and password
	"""
	email = request.validated["email"]
	password = request.validated["password"]

	UserPolymorphic = with_polymorphic(User, [Admin, Manager, Client], aliased=True)

	user = request.db.query(User)\
		.with_polymorphic([Admin, Manager, Client])\
		.filter(User.email == email)\
		.first()

	if user is None:
		raise HTTPBadRequest(explanation="Incorrect email!")

	if not check_password(password, user.password):
		raise HTTPBadRequest(explanation="Incorrect password!")

	if user.is_blocked:
		raise HTTPBadRequest(explanation="User is blocked!")

	user_role = map_user_type_to_role(user.type)

	permissions = {
		"role": user_role,
	}

	token = request.create_jwt_token(user.id, **permissions)

	user.authorized_at = datetime.datetime.utcnow()
	request.db.flush()

	full_name = None
	
	if all([user.first_name, user.last_name]):
		if user.first_name == user.last_name:
			full_name = user.first_name
		else:
			full_name = " ".join([user.first_name, user.last_name])
	else:
		if not user.last_name and bool(user.first_name):
			full_name = user.first_name
		elif not user.first_name and bool(user.last_name):
			full_name = user.last_name

	return {
		"token": token,
		"permissions": dict(permissions,
			id=user.id,
			email=user.email,
			# locale=user.locale,
			fullName=full_name,
		),
	}
