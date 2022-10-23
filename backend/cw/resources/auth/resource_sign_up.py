from cornice import Service
from cornice.validators import (
    colander_body_validator,
)

from pyramid.httpexceptions import HTTPBadRequest

from cw.database import User, Admin, Manager, Client

from cw.resources.auth.schema_sign_up import (
    CreateClientSchema,
    ResponseBodyClientSchema
)

from cw.modules.cornice import negotiation_params
from cw.modules.security import hash_password

sign_up = Service(name="sign-up", description="Authorization", path="/sign-up", tags=["Authorization"],
                  **negotiation_params)


@sign_up.post(
    schema=CreateClientSchema(),
    validators=(colander_body_validator,),
    response_schemas={
        '200': ResponseBodyClientSchema(description="Return OK response"),
    },
    renderer='json'

)
def auth_sign_up(request):
    print("\n\n\n\n")
    print("sign-upsign-up")
    print("\n\n\n\n")
    print("\n\n\n\n")
    client_data = {**request.validated}
    client_data["password"] = hash_password(client_data["password"])
    friend = request.db.query(User) \
        .with_polymorphic([Admin, Manager, Client]) \
        .filter(User.email == client_data["email"]) \
        .first()

    if "@" not in client_data["email"]:
        raise HTTPBadRequest(explanation="Incorrect email!")

    if friend:
        raise HTTPBadRequest(explanation="Email busy!")
    user = Client(
        **client_data
    )
    request.db.add(user)
    request.db.flush()
    return {
        "message": "User created",
    }
