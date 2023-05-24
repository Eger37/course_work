from pyramid.security import (
    Allow,
    Everyone
)
from sqlalchemy import func
from pyramid.httpexceptions import HTTPNotFound

from cornice.resource import resource, view
from cornice.validators import (
    colander_body_validator,
    colander_path_validator,
    colander_validator
)

from cw.database import UserRole, ResultCategory

from .schema import (
    GetResultCategorySchema,
    ResponseBodyResultCategorySchema,
    GetResultCategoriesSchema,
    ResponseBodyResultCategoriesSchema,
    UpdateResultCategorySchema,
    CreateResultCategorySchema
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


@resource(path="/question-category/{id}", collection_path="/question-category", description="Result category resource",
          tags=["result_category"], **negotiation_params)
class ResultCategoryResource(object):
    def __init__(self, request, context=None):
        self.request = request

    def __acl__(self):
        return [
            (Allow, UserRole.admin, ("get", "create", "update", "delete",)),
            (Allow, UserRole.psychologist, ("get", "create", "update", "delete",)),
            (Allow, Everyone, ("get",)),
        ]

    @view(
        schema=GetResultCategorySchema(),
        validators=(colander_path_validator,),
        response_schemas={
            '200': ResponseBodyResultCategorySchema(description="Return OK response"),
        },
        permission="get",
    )
    def get(self):
        path_data = self.request.validated
        result_category = self.request.db.query(ResultCategory).get(path_data['id'])
        if result_category is None:
            raise HTTPNotFound(explanation="Result category not found!")
        return map_data_to_body_schema(ResponseBodyResultCategorySchema, dict(result_category))

    @view(
        schema=GetResultCategoriesSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyResultCategoriesSchema(description="Return OK response"),
        },
        permission="get",
        renderer='json'
    )
    def collection_get(self):
        data = self.request.validated['querystring']
        apply_range = True
        if data["filter"].pop("no_range", None):
            apply_range = False

        questions_query = self.request.db.query(ResultCategory)
        questions_count_query = self.request.db.query(func.count(ResultCategory.id))
        questions_query, questions_count_query = apply_filter_sort_range_for_query(ResultCategory, questions_query,
                                                                                   questions_count_query,
                                                                                   data=data, apply_range=apply_range)

        result_categories = questions_query.all()
        questions_count = questions_count_query.scalar()

        result_categories = [dict(result_category) for result_category in result_categories]

        if data.get("range"):
            self.request.response.headers.add(
                "Content-Range",
                generate_range(data["range"] if apply_range else False, questions_count)
            )

        return map_data_to_body_schema(ResponseBodyResultCategoriesSchema, result_categories)

    @view(
        schema=UpdateResultCategorySchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyResultCategorySchema(description="return OK response")
        },
        permission="update",
    )
    def put(self):
        body_data = self.request.validated["body"]
        path_data = self.request.validated["path"]

        result_category = self.request.db.query(ResultCategory).get(path_data["id"])

        for key in body_data:
            if body_data[key] is None:
                continue
            setattr(result_category, key, body_data[key])

        self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyResultCategorySchema, dict(result_category))

    @view(
        schema=CreateResultCategorySchema(),
        validators=(colander_body_validator,),
        response_schemas={
            '200': ResponseBodyResultCategorySchema(description="return OK response")
        },
        permission="create",
    )
    def collection_post(self):
        data = {**self.request.validated}
        result_category = ResultCategory(**data)
        self.request.db.add(result_category)
        self.request.db.flush()
        return map_data_to_body_schema(ResponseBodyResultCategorySchema, dict(result_category))


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
        self.request.db.query(ResultCategory).filter(ResultCategory.id == self.request.validated["id"]).delete()
        self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyEmptySchema, "")
