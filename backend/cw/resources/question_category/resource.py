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

from cw.database import UserRole, QuestionCategory

from .schema import (
    GetQuestionCategorySchema,
    ResponseBodyQuestionCategorySchema,
    GetQuestionCategoriesSchema,
    ResponseBodyQuestionCategoriesSchema,
    UpdateQuestionCategorySchema,
    CreateQuestionCategorySchema
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
          tags=["question_category"], **negotiation_params)
class QuestionCategoryResource(object):
    def __init__(self, request, context=None):
        self.request = request

    def __acl__(self):
        return [
            (Allow, UserRole.admin, ("get", "create", "update", "delete",)),
            (Allow, UserRole.psychologist, ("get", "create", "update", "delete",)),
            (Allow, UserRole.client, ("get",)),

        ]

    @view(
        schema=GetQuestionCategorySchema(),
        validators=(colander_path_validator,),
        response_schemas={
            '200': ResponseBodyQuestionCategorySchema(description="Return OK response"),
        },
        permission="get",
    )
    def get(self):
        path_data = self.request.validated
        question_category = self.request.db.query(QuestionCategory).get(path_data['id'])
        if question_category is None:
            raise HTTPNotFound(explanation="Result category not found!")
        # TODO I added a question_category_description crutch for
        #  the QuestionCategory resource, because there were problems with a conflict of context react admin.
        return map_data_to_body_schema(ResponseBodyQuestionCategorySchema,
                                       dict(question_category,
                                            question_category_description=question_category.description))

    @view(
        schema=GetQuestionCategoriesSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyQuestionCategoriesSchema(description="Return OK response"),
        },
        permission="get",
        renderer='json'
    )
    def collection_get(self):
        data = self.request.validated['querystring']
        apply_range = True
        if data["filter"].pop("no_range", None):
            apply_range = False

        questions_query = self.request.db.query(QuestionCategory)
        questions_count_query = self.request.db.query(func.count(QuestionCategory.id))
        questions_query, questions_count_query = apply_filter_sort_range_for_query(QuestionCategory, questions_query,
                                                                                   questions_count_query,
                                                                                   data=data, apply_range=apply_range)

        question_categories = questions_query.all()
        questions_count = questions_count_query.scalar()

        question_categories = [dict(question_category, question_category_description=question_category.description) for
                               question_category in question_categories]

        if data.get("range"):
            self.request.response.headers.add(
                "Content-Range",
                generate_range(data["range"] if apply_range else False, questions_count)
            )

        return map_data_to_body_schema(ResponseBodyQuestionCategoriesSchema, question_categories)

    @view(
        schema=UpdateQuestionCategorySchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyQuestionCategorySchema(description="return OK response")
        },
        permission="update",
    )
    def put(self):
        body_data = self.request.validated["body"]
        path_data = self.request.validated["path"]

        question_category = self.request.db.query(QuestionCategory).get(path_data["id"])
        description = body_data.pop("question_category_description")
        body_data["description"] = description
        for key in body_data:
            if body_data[key] is None:
                continue
            setattr(question_category, key, body_data[key])

        self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyQuestionCategorySchema,
                                       dict(question_category,
                                            question_category_description=question_category.description))

    @view(
        schema=CreateQuestionCategorySchema(),
        validators=(colander_body_validator,),
        response_schemas={
            '200': ResponseBodyQuestionCategorySchema(description="return OK response")
        },
        permission="create",
    )
    def collection_post(self):
        data = {**self.request.validated}
        description = data.pop("question_category_description")
        data["description"] = description
        question_category = QuestionCategory(**data)
        self.request.db.add(question_category)
        self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyQuestionCategorySchema,
                                       dict(question_category,
                                            question_category_description=question_category.description))

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
        self.request.db.query(QuestionCategory).filter(QuestionCategory.id == self.request.validated["id"]).delete()
        self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyEmptySchema, "")
