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

from cw.database import UserRole, AnswerOption

from .schema import (
    GetAnswerOptionSchema,
    ResponseBodyAnswerOptionSchema,
    GetAnswerOptionsSchema,
    ResponseBodyAnswerOptionsSchema,
    UpdateAnswerOptionSchema,
    CreateAnswerOptionSchema
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


@resource(path="/answer-option/{id}", collection_path="/answer-option", description="Answer option resource",
          tags=["answer_option"], **negotiation_params)
class AnswerOptionResource(object):
    def __init__(self, request, context=None):
        self.request = request

    def __acl__(self):
        return [
            (Allow, UserRole.admin, ("get", "create", "update", "delete",)),
            (Allow, UserRole.psychologist, ("get", "create", "update", "delete",)),
            (Allow, UserRole.client, ("get",)),
        ]

    @view(
        schema=GetAnswerOptionSchema(),
        validators=(colander_path_validator,),
        response_schemas={
            '200': ResponseBodyAnswerOptionSchema(description="Return OK response"),
        },
        permission="get",
    )
    def get(self):
        path_data = self.request.validated
        answer_option = self.request.db.query(AnswerOption).get(path_data['id'])
        if answer_option is None:
            raise HTTPNotFound(explanation="Answer option not found!")
        # return map_data_to_body_schema(ResponseBodyAnswerOptionSchema, dict(answer_option))
        # TODO I added a question_category_description crutch for
        #  the QuestionCategory resource, because there were problems with a conflict of context react admin.
        return map_data_to_body_schema(ResponseBodyAnswerOptionSchema,
                                       dict(answer_option,
                                            answer_option_text=answer_option.text))

    @view(
        schema=GetAnswerOptionsSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyAnswerOptionsSchema(description="Return OK response"),
        },
        permission="get",
        renderer='json'
    )
    def collection_get(self):
        data = self.request.validated['querystring']
        apply_range = True
        if data["filter"].pop("no_range", None):
            apply_range = False

        answer_options_query = self.request.db.query(AnswerOption)
        answer_options_count_query = self.request.db.query(func.count(AnswerOption.id))
        answer_options_query, answer_options_count_query = apply_filter_sort_range_for_query(AnswerOption, answer_options_query,
                                                                                   answer_options_count_query,
                                                                                   data=data, apply_range=apply_range)

        answer_options = answer_options_query.all()
        answer_options_count = answer_options_count_query.scalar()

        answer_options = [dict(answer_option, answer_option_text=answer_option.text) for answer_option in answer_options]

        if data.get("range"):
            self.request.response.headers.add(
                "Content-Range",
                generate_range(data["range"] if apply_range else False, answer_options_count)
            )

        return map_data_to_body_schema(ResponseBodyAnswerOptionsSchema, answer_options)

    @view(
        schema=UpdateAnswerOptionSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyAnswerOptionSchema(description="return OK response")
        },
        permission="update",
    )
    def put(self):
        body_data = self.request.validated["body"]
        path_data = self.request.validated["path"]

        answer_option = self.request.db.query(AnswerOption).get(path_data["id"])
        text = body_data.pop("answer_option_text")
        body_data["text"] = text
        for key in body_data:
            if body_data[key] is None:
                continue
            setattr(answer_option, key, body_data[key])

        self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyAnswerOptionSchema,
                                       dict(answer_option,
                                            answer_option_text=answer_option.text))

    @view(
        schema=CreateAnswerOptionSchema(),
        validators=(colander_body_validator,),
        response_schemas={
            '200': ResponseBodyAnswerOptionSchema(description="return OK response")
        },
        permission="create",
    )
    def collection_post(self):
        data = {**self.request.validated}
        text = data.pop("answer_option_text")
        data["text"] = text
        answer_option = AnswerOption(**data)
        self.request.db.add(answer_option)
        self.request.db.flush()
        return map_data_to_body_schema(ResponseBodyAnswerOptionSchema,
                                       dict(answer_option,
                                            answer_option_text=answer_option.text))

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
        self.request.db.query(AnswerOption).filter(AnswerOption.id == self.request.validated["id"]).delete()
        self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyEmptySchema, "")
