from pyramid.security import (
    authenticated_userid,
    Allow,
)

from cornice.resource import resource, view
from cornice.validators import (
    colander_body_validator,
    colander_path_validator,
    colander_validator,
)

from sqlalchemy import func

from cw.database import User, Admin, Client, UserRole, UserType
from cw.modules.security import hash_password

from .schema import (
    CreateClientSchema,
    GetClientSchema,
    GetClientsSchema,
    UpdateClientValidatorSchema,
)

from .response_schema import (
    ResponseBodyClientSchema,
    ResponseBodyClientsSchema,
)

from .._shared.query import (
    apply_filter_sort_range_for_query,
    generate_range,
)

from .._shared.schema import (
    map_data_to_body_schema
)

from cw.modules.cornice import negotiation_params


@resource(path="/client/{id}", collection_path="/client", description="Client resource",
          tags=["client"], **negotiation_params)
class ClientResource(object):
    def __init__(self, request, context=None):
        self.request = request

    def __acl__(self):
        return [
            (Allow, UserRole.admin, ("get", "create", "update",)),
            (Allow, UserRole.psychologist, ("get", "create", "update",)),
        ]

    @view(
        schema=GetClientSchema(),
        validators=(colander_path_validator,),
        response_schemas={
            '200': ResponseBodyClientSchema(description="Return OK response"),
        },
        permission="get",
    )
    def get(self):
        path_data = self.request.validated
        user = self.request.db.query(User).get(path_data['id'])
        user = dict(user)
        return map_data_to_body_schema(ResponseBodyClientSchema, user)

    @view(
        schema=GetClientsSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyClientsSchema(description="Return OK response"),
        },
        permission="get",
        renderer='json'
    )
    def collection_get(self):
        data = self.request.validated['querystring']
        apply_range = True
        if data["filter"].pop("no_range", None):
            apply_range = False

        filter_for_client = (User.type == UserType.client)  # noqa: E711
        users_query = self.request.db.query(User).with_polymorphic([Client]) \
            .filter(filter_for_client)
        users_count_query = self.request.db.query(func.count(User.id)).filter(filter_for_client)
        users_query, users_count_query = apply_filter_sort_range_for_query(User, users_query, users_count_query,
                                                                           data=data, apply_range=apply_range)

        users = users_query.all()
        users_count = users_count_query.scalar()

        users = [dict(u) for u in users]

        if data.get("range"):
            self.request.response.headers.add(
                "Content-Range",
                generate_range(data["range"] if apply_range else False, users_count)
            )

        return map_data_to_body_schema(ResponseBodyClientsSchema, users)

    @view(
        schema=UpdateClientValidatorSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyClientSchema(description="return OK response")
        },
        permission="update",
    )
    def put(self):
        body_data = self.request.validated["body"]
        path_data = self.request.validated["path"]

        user = self.request.db.query(Client).get(path_data["id"])

        for key in body_data:
            if body_data[key] is None:
                continue
            setattr(user, key, body_data[key])

        self.request.db.flush()

        user = dict(user)

        return map_data_to_body_schema(ResponseBodyClientSchema, user)

    @view(
        schema=CreateClientSchema(),
        validators=(colander_body_validator,),
        response_schemas={
            '200': ResponseBodyClientSchema(description="return OK response")
        },
        permission="create",
    )
    def collection_post(self):
        manager_data = {**self.request.validated}
        manager_data["password"] = hash_password(manager_data["password"])
        user = Client(
            **manager_data,
            created_by=authenticated_userid(self.request)
        )
        self.request.db.add(user)
        self.request.db.flush()

        user = dict(user)

        return map_data_to_body_schema(ResponseBodyClientSchema, user)
