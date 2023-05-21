from pyramid.security import (
    Allow,
    Everyone
)
from sqlalchemy import func

from cornice.resource import resource, view
from cornice.validators import (
    colander_body_validator,
    colander_path_validator,
    colander_validator
)

from cw.database import UserRole, Test, Client

from .schema import (
    GetTestSchema,
    ResponseBodyTestSchema,
    GetTestsSchema,
    ResponseBodyTestsSchema,
    UpdateTestSchema,
    CreateTestSchema
)

from .._shared.schema import (
    map_data_to_body_schema
)

from .._shared.query import (
    apply_filter_sort_range_for_query,
    generate_range,
)

from cw.modules.cornice import negotiation_params


@resource(path="/test/{id}", collection_path="/test", description="Test resource",
          tags=["test"], **negotiation_params)
class TestResource(object):
    def __init__(self, request, context=None):
        self.request = request

    def __acl__(self):
        return [
            (Allow, UserRole.admin, ("get", "create", "update",)),
            (Allow, UserRole.psychologist, ("get", "create", "update",)),
            (Allow, Everyone, ("get",)),
        ]

    @view(
        schema=GetTestSchema(),
        validators=(colander_path_validator,),
        response_schemas={
            '200': ResponseBodyTestSchema(description="Return OK response"),
        },
        permission="get",
    )
    def get(self):
        path_data = self.request.validated
        test = self.request.db.query(Test).get(path_data['id'])
        return map_data_to_body_schema(ResponseBodyTestSchema, dict(test))

    @view(
        schema=GetTestsSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyTestsSchema(description="Return OK response"),
        },
        permission="get",
        renderer='json'
    )
    def collection_get(self):
        data = self.request.validated['querystring']
        apply_range = True
        if data["filter"].pop("no_range", None):
            apply_range = False

        tests_query = self.request.db.query(Test)
        tests_count_query = self.request.db.query(func.count(Test.id))
        tests_query, tests_count_query = apply_filter_sort_range_for_query(Test, tests_query, tests_count_query,
                                                                           data=data, apply_range=apply_range)

        tests = tests_query.all()
        tests_count = tests_count_query.scalar()

        tests = [dict(test) for test in tests]

        if data.get("range"):
            self.request.response.headers.add(
                "Content-Range",
                generate_range(data["range"] if apply_range else False, tests_count)
            )

        return map_data_to_body_schema(ResponseBodyTestsSchema, tests)

    @view(
        schema=UpdateTestSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyTestSchema(description="return OK response")
        },
        permission="update",
    )
    def put(self):
        body_data = self.request.validated["body"]
        path_data = self.request.validated["path"]

        test = self.request.db.query(Test).get(path_data["id"])

        for key in body_data:
            if body_data[key] is None:
                continue
            setattr(test, key, body_data[key])

        self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyTestSchema, dict(test))

    @view(
        schema=CreateTestSchema(),
        validators=(colander_body_validator,),
        response_schemas={
            '200': ResponseBodyTestSchema(description="return OK response")
        },
        permission="create",
    )
    def collection_post(self):
        data = {**self.request.validated}
        test = Test(**data)
        self.request.db.add(test)
        self.request.db.flush()
        return map_data_to_body_schema(ResponseBodyTestSchema, dict(test))
