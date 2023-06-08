from pyramid.security import (
    Allow,
    Everyone,
    authenticated_userid
)
from sqlalchemy import func
from pyramid.httpexceptions import HTTPNotFound

from cornice.resource import resource, view
from cornice.validators import (
    colander_body_validator,
    colander_path_validator,
    colander_validator
)

from cw.database import UserRole, Testing

from .schema import (
    GetTestingSchema,
    ResponseBodyTestingSchema,
    GetTestingsSchema,
    ResponseBodyTestingsSchema,
    # UpdateTestingSchema,
    CreateTestingSchema
)

from .._shared.schema import (
    map_data_to_body_schema,
    ResponseBodyEmptySchema,
    GetItemByIdParamSchema
)

from .._shared.query import (
    apply_filter_sort_range_for_query,
    generate_range,
)

from cw.modules.cornice import negotiation_params


@resource(path="/testing/{id}", collection_path="/testing", description="Testing resource",
          tags=["testing"], **negotiation_params)
class TestingResource(object):
    def __init__(self, request, context=None):
        self.request = request

    def __acl__(self):
        return [
            (Allow, UserRole.admin, ("get", "create", "update", "delete",)),
            (Allow, UserRole.psychologist, ("get", "create", "update", "delete",)),
            (Allow, Everyone, ("get", "create")),
        ]

    @view(
        schema=GetTestingSchema(),
        validators=(colander_path_validator,),
        response_schemas={
            '200': ResponseBodyTestingSchema(description="Return OK response"),
        },
        permission="get",
    )
    def get(self):
        path_data = self.request.validated
        testing = self.request.db.query(Testing).get(path_data['id'])
        if testing is None:
            raise HTTPNotFound(explanation="Testing not found!")
        return map_data_to_body_schema(ResponseBodyTestingSchema, dict(testing))

    @view(
        schema=GetTestingsSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyTestingsSchema(description="Return OK response"),
        },
        permission="get",
        renderer='json'
    )
    def collection_get(self):
        data = self.request.validated['querystring']
        apply_range = True
        if data["filter"].pop("no_range", None):
            apply_range = False

        testings_query = self.request.db.query(Testing)
        testings_count_query = self.request.db.query(func.count(Testing.id))
        testings_query, testings_count_query = apply_filter_sort_range_for_query(Testing, testings_query,
                                                                                   testings_count_query,
                                                                                   data=data, apply_range=apply_range)

        testings = testings_query.all()
        testings_count = testings_count_query.scalar()

        testings = [dict(testing) for testing in testings]

        if data.get("range"):
            self.request.response.headers.add(
                "Content-Range",
                generate_range(data["range"] if apply_range else False, testings_count)
            )

        return map_data_to_body_schema(ResponseBodyTestingsSchema, testings)

    # @view(
    #     schema=UpdateTestingSchema(),
    #     validators=(colander_validator,),
    #     response_schemas={
    #         '200': ResponseBodyTestingSchema(description="return OK response")
    #     },
    #     permission="update",
    # )
    # def put(self):
    #     body_data = self.request.validated["body"]
    #     path_data = self.request.validated["path"]
    #
    #     testing = self.request.db.query(Testing).get(path_data["id"])
    #
    #     for key in body_data:
    #         if body_data[key] is None:
    #             continue
    #         setattr(testing, key, body_data[key])
    #
    #     self.request.db.flush()
    #
    #     return map_data_to_body_schema(ResponseBodyTestingSchema, dict(testing))

    @view(
        schema=CreateTestingSchema(),
        validators=(colander_body_validator,),
        response_schemas={
            '200': ResponseBodyTestingSchema(description="return OK response")
        },
        permission="create",
    )
    def collection_post(self):
        data = {**self.request.validated}
        user_id = authenticated_userid(self.request)
        data["user_id"] = user_id
        testing = Testing(**data)
        self.request.db.add(testing)
        self.request.db.flush()
        return map_data_to_body_schema(ResponseBodyTestingSchema, dict(testing))


    @view(
        schema=GetItemByIdParamSchema(),
        validators=(colander_path_validator,),
        response_schemas={
            '200': ResponseBodyEmptySchema(description="Return OK response")
        },
        permission="delete",
        content_type="text/plain"
    )
    def delete(self):
        self.request.db.query(Testing).filter(Testing.id == self.request.validated["id"]).delete()
        self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyEmptySchema, "")
