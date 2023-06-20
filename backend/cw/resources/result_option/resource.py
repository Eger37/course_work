from pyramid.security import (
    Allow
)
from sqlalchemy import func
from pyramid.httpexceptions import HTTPNotFound

from cornice.resource import resource, view
from cornice.validators import (
    colander_body_validator,
    colander_path_validator,
    colander_validator
)

from cw.database import UserRole, ResultOption

from .schema import (
    GetResultOptionSchema,
    ResponseBodyResultOptionSchema,
    GetResultOptionsSchema,
    ResponseBodyResultOptionsSchema,
    UpdateResultOptionSchema,
    CreateResultOptionSchema
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


@resource(path="/result-option/{id}", collection_path="/result-option", description="Result option resource",
          tags=["result_option"], **negotiation_params)
class ResultOptionResource(object):
    def __init__(self, request, context=None):
        self.request = request

    def __acl__(self):
        return [
            (Allow, UserRole.admin, ("get", "create", "update", "delete",)),
            (Allow, UserRole.psychologist, ("get", "create", "update", "delete",)),
            (Allow, UserRole.client, ("get",)),
        ]

    @view(
        schema=GetResultOptionSchema(),
        validators=(colander_path_validator,),
        response_schemas={
            '200': ResponseBodyResultOptionSchema(description="Return OK response"),
        },
        permission="get",
    )
    def get(self):
        path_data = self.request.validated
        result_option = self.request.db.query(ResultOption).get(path_data['id'])
        if result_option is None:
            raise HTTPNotFound(explanation="Result option not found!")
        return map_data_to_body_schema(ResponseBodyResultOptionSchema, dict(result_option))

    @view(
        schema=GetResultOptionsSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyResultOptionsSchema(description="Return OK response"),
        },
        permission="get",
        renderer='json'
    )
    def collection_get(self):
        data = self.request.validated['querystring']
        apply_range = True
        if data["filter"].pop("no_range", None):
            apply_range = False

        result_options_query = self.request.db.query(ResultOption)
        result_options_count_query = self.request.db.query(func.count(ResultOption.id))
        result_options_query, result_options_count_query = apply_filter_sort_range_for_query(ResultOption, result_options_query,
                                                                                   result_options_count_query,
                                                                                   data=data, apply_range=apply_range)

        result_options = result_options_query.all()
        result_options_count = result_options_count_query.scalar()

        result_options = [dict(result_option) for result_option in result_options]

        if data.get("range"):
            self.request.response.headers.add(
                "Content-Range",
                generate_range(data["range"] if apply_range else False, result_options_count)
            )

        return map_data_to_body_schema(ResponseBodyResultOptionsSchema, result_options)

    @view(
        schema=UpdateResultOptionSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyResultOptionSchema(description="return OK response")
        },
        permission="update",
    )
    def put(self):
        body_data = self.request.validated["body"]
        path_data = self.request.validated["path"]

        result_option = self.request.db.query(ResultOption).get(path_data["id"])

        for key in body_data:
            if body_data[key] is None:
                continue
            setattr(result_option, key, body_data[key])

        self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyResultOptionSchema, dict(result_option))

    @view(
        schema=CreateResultOptionSchema(),
        validators=(colander_body_validator,),
        response_schemas={
            '200': ResponseBodyResultOptionSchema(description="return OK response")
        },
        permission="create",
    )
    def collection_post(self):
        data = {**self.request.validated}
        result_option = ResultOption(**data)
        self.request.db.add(result_option)
        self.request.db.flush()
        return map_data_to_body_schema(ResponseBodyResultOptionSchema, dict(result_option))


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
        self.request.db.query(ResultOption).filter(ResultOption.id == self.request.validated["id"]).delete()
        self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyEmptySchema, "")
