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

from cw.database import User, Manager, Client, UserRole, UserType
from cw.modules.security import hash_password

from .schema import (
    CreateManagerSchema,
    GetManagerSchema,
    GetManagersSchema,
    UpdateManagerValidatorSchema,
)

from .response_schema import (
    ResponseBodyManagerSchema,
    ResponseBodyManagersSchema,
)

from .._shared.query import (
    apply_filter_sort_range_for_query,
    generate_range,
)

from .._shared.schema import (
    map_data_to_body_schema
)

from cw.modules.cornice import negotiation_params


@resource(path="/psychologist/{id}", collection_path="/psychologist", description="Psychologist resource",
          tags=["CW psychologist"], **negotiation_params)
class PsychologistResource(object):
    def __init__(self, request, context=None):
        self.request = request

    def __acl__(self):
        return [
            (Allow, UserRole.admin, ("get", "create", "update",)),
        ]

    @view(
        schema=GetManagerSchema(),
        validators=(colander_path_validator,),
        response_schemas={
            '200': ResponseBodyManagerSchema(description="Return OK response"),
        },
        permission="get",
    )
    def get(self):
        path_data = self.request.validated
        user = self.request.db.query(User).get(path_data['id'])
        user = dict(user)
        return map_data_to_body_schema(ResponseBodyManagerSchema, user)

    @view(
        schema=GetManagersSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyManagersSchema(description="Return OK response"),
        },
        permission="get",
        renderer='json'
    )
    def collection_get(self):
        data = self.request.validated['querystring']
        apply_range = True
        if data["filter"].pop("no_range"):
            apply_range = False

        filter_for_manager = (User.type == UserType.manager)  # noqa: E711
        users_query = self.request.db.query(User).with_polymorphic([Manager]) \
            .filter(filter_for_manager)
        users_count_query = self.request.db.query(func.count(User.id)).filter(filter_for_manager)
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

        return map_data_to_body_schema(ResponseBodyManagersSchema, users)

    @view(
        schema=UpdateManagerValidatorSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyManagerSchema(description="return OK response")
        },
        permission="update",
    )
    def put(self):
        body_data = self.request.validated["body"]
        path_data = self.request.validated["path"]

        user = self.request.db.query(User).get(path_data["id"])

        user.type = UserType.manager

        for key in body_data:
            if body_data[key] is None:
                continue
            setattr(user, key, body_data[key])

        self.request.db.flush()

        user = dict(user)

        return map_data_to_body_schema(ResponseBodyManagerSchema, user)

    @view(
        schema=CreateManagerSchema(),
        validators=(colander_body_validator,),
        response_schemas={
            '200': ResponseBodyManagerSchema(description="return OK response")
        },
        permission="create",
    )
    def collection_post(self):
        manager_data = {**self.request.validated}
        manager_data["password"] = hash_password(manager_data["password"])
        user = Manager(
            **manager_data,
            created_by=authenticated_userid(self.request)
        )
        self.request.db.add(user)
        self.request.db.flush()

        user = dict(user, is_manager=user.type == UserType.manager)

        return map_data_to_body_schema(ResponseBodyManagerSchema, user)
