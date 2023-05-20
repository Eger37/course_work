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

from cw.database import User, Admin, Client, UserRole, CompletedTest

from .schema import (
    GetUserTestsSchema,
)

from .response_schema import (
    ResponseBodyUserTestsSchema,
)

from .._shared.schema import (
    map_data_to_body_schema
)
from .._shared.query import (
    apply_filter_sort_range_for_query,
    generate_range,
)
from cw.modules.cornice import negotiation_params

from sqlalchemy import func


@resource(path="/user_tests", description="Client resource", **negotiation_params)
class UserTestsResource(object):
    def __init__(self, request, context=None):
        self.request = request

    def __acl__(self):
        return [
            (Allow, UserRole.admin, ("get",)),
            (Allow, UserRole.psychologist, ("get",)),
            (Allow, UserRole.client, ("get",)),
        ]

    @view(
        schema=GetUserTestsSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyUserTestsSchema(description="Return OK response"),
        },
        permission="get",
        renderer='json'
    )
    def get(self):
        data = self.request.validated['querystring']
        user_id = data["filter"]["user_id"]

        tests = self.request.db.query(CompletedTest).filter(user_id == CompletedTest.user_id).all()

        if data.get("range"):
            self.request.response.headers.add(
                "Content-Range",
                generate_range(data['range'], len(tests))
            )
        return map_data_to_body_schema(ResponseBodyUserTestsSchema, tests)
