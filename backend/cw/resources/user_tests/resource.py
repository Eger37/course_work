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
    GetUserTestsSchema,
)

from .response_schema import (
    ResponseBodyUserTestsSchema,
)

from .._shared.query import (
    apply_filter_sort_range_for_query,
    generate_range,
)

from .._shared.schema import (
    map_data_to_body_schema
)

from cw.modules.cornice import negotiation_params


@resource(path="/user_tests/{id}", description="Client resource", **negotiation_params)
class UserTestsResource(object):
    def __init__(self, request, context=None):
        self.request = request

    def __acl__(self):
        return [
            (Allow, UserRole.psychologist, ("get", "create", "update",)),
        ]

    @view(
        schema=GetUserTestsSchema(),
        validators=(colander_path_validator,),
        response_schemas={
            '200': ResponseBodyUserTestsSchema(description="Return OK response"),
        },
        permission="get",
    )
    def get(self):
        path_data = self.request.validated

        user = self.request.db.query(User).get(path_data['id'])
        user = dict(user)

        return map_data_to_body_schema(ResponseBodyUserTestsSchema, user)
