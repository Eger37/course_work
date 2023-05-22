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

from cw.database import UserRole, Question

from .schema import (
    GetQuestionSchema,
    ResponseBodyQuestionSchema,
    GetQuestionsSchema,
    ResponseBodyQuestionsSchema,
    UpdateQuestionSchema,
    CreateQuestionSchema
)

from .._shared.schema import (
    map_data_to_body_schema
)

from .._shared.query import (
    apply_filter_sort_range_for_query,
    generate_range,
)

from cw.modules.cornice import negotiation_params


@resource(path="/question/{id}", collection_path="/question", description="Question resource",
          tags=["question"], **negotiation_params)
class QuestionResource(object):
    def __init__(self, request, context=None):
        self.request = request

    def __acl__(self):
        return [
            (Allow, UserRole.admin, ("get", "create", "update",)),
            (Allow, UserRole.psychologist, ("get", "create", "update",)),
            (Allow, Everyone, ("get",)),
        ]

    @view(
        schema=GetQuestionSchema(),
        validators=(colander_path_validator,),
        response_schemas={
            '200': ResponseBodyQuestionSchema(description="Return OK response"),
        },
        permission="get",
    )
    def get(self):
        path_data = self.request.validated
        question = self.request.db.query(Question).get(path_data['id'])
        return map_data_to_body_schema(ResponseBodyQuestionSchema, dict(question))

    @view(
        schema=GetQuestionsSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyQuestionsSchema(description="Return OK response"),
        },
        permission="get",
        renderer='json'
    )
    def collection_get(self):
        data = self.request.validated['querystring']
        apply_range = True
        if data["filter"].pop("no_range", None):
            apply_range = False

        questions_query = self.request.db.query(Question)
        questions_count_query = self.request.db.query(func.count(Question.id))
        questions_query, questions_count_query = apply_filter_sort_range_for_query(Question, questions_query, questions_count_query,
                                                                           data=data, apply_range=apply_range)

        questions = questions_query.all()
        questions_count = questions_count_query.scalar()

        questions = [dict(question) for question in questions]

        if data.get("range"):
            self.request.response.headers.add(
                "Content-Range",
                generate_range(data["range"] if apply_range else False, questions_count)
            )

        return map_data_to_body_schema(ResponseBodyQuestionsSchema, questions)

    @view(
        schema=UpdateQuestionSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyQuestionSchema(description="return OK response")
        },
        permission="update",
    )
    def put(self):
        body_data = self.request.validated["body"]
        path_data = self.request.validated["path"]

        question = self.request.db.query(Question).get(path_data["id"])

        for key in body_data:
            if body_data[key] is None:
                continue
            setattr(question, key, body_data[key])

        self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyQuestionSchema, dict(question))

    @view(
        schema=CreateQuestionSchema(),
        validators=(colander_body_validator,),
        response_schemas={
            '200': ResponseBodyQuestionSchema(description="return OK response")
        },
        permission="create",
    )
    def collection_post(self):
        data = {**self.request.validated}
        question = Question(**data)
        self.request.db.add(question)
        self.request.db.flush()
        return map_data_to_body_schema(ResponseBodyQuestionSchema, dict(question))
