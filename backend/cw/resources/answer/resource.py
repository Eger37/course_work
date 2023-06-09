from pyramid.security import (
    Allow,
    Everyone
)
from sqlalchemy import and_
from pyramid.httpexceptions import HTTPNotFound

from cornice.resource import resource, view
from cornice.validators import (
    colander_body_validator,
    colander_path_validator,
    colander_validator
)

from cw.database import UserRole, Answer

from .schema import (
    GetAnswerSchema,
    ResponseBodyAnswerSchema,
    GetAnswersSchema,
    ResponseBodyAnswersSchema,
    UpdateAnswerSchema,
    CreateAnswerSchema
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


@resource(path="/answer/{id}", collection_path="/answer", description="Answer resource",
          tags=["answer"], **negotiation_params)
class AnswerResource(object):
    def __init__(self, request, context=None):
        self.request = request

    def __acl__(self):
        return [
            (Allow, UserRole.admin, ("get", "create", "update", "delete",)),
            (Allow, UserRole.psychologist, ("get", "create", "update", "delete",)),
            (Allow, UserRole.client, ("get", "create")),
        ]

    # @view(
    #     schema=GetAnswerSchema(),
    #     validators=(colander_path_validator,),
    #     response_schemas={
    #         '200': ResponseBodyAnswerSchema(description="Return OK response"),
    #     },
    #     permission="get",
    # )
    # def get(self):
    #     path_data = self.request.validated
    #     answer = self.request.db.query(Answer).get(path_data['id'])
    #     if answer is None:
    #         raise HTTPNotFound(explanation="Answer option not found!")
    #     # return map_data_to_body_schema(ResponseBodyAnswerSchema, dict(answer))
    #     # TODO I added a question_category_description crutch for
    #     #  the QuestionCategory resource, because there were problems with a conflict of context react admin.
    #     return map_data_to_body_schema(ResponseBodyAnswerSchema,
    #                                    dict(answer,
    #                                         answer_text=answer.text))

    # @view(
    #     schema=GetAnswersSchema(),
    #     validators=(colander_validator,),
    #     response_schemas={
    #         '200': ResponseBodyAnswersSchema(description="Return OK response"),
    #     },
    #     permission="get",
    #     renderer='json'
    # )
    # def collection_get(self):
    #     data = self.request.validated['querystring']
    #     apply_range = True
    #     if data["filter"].pop("no_range", None):
    #         apply_range = False
    #
    #     answer_query = self.request.db.query(Answer)
    #     answer_count_query = self.request.db.query(func.count(Answer.id))
    #     answer_query, answer_count_query = apply_filter_sort_range_for_query(Answer, answer_query,
    #                                                                                answer_count_query,
    #                                                                                data=data, apply_range=apply_range)
    #
    #     answer = answer_query.all()
    #     answer_count = answer_count_query.scalar()
    #
    #     answer = [dict(answer, answer_text=answer.text) for answer in answer]
    #
    #     if data.get("range"):
    #         self.request.response.headers.add(
    #             "Content-Range",
    #             generate_range(data["range"] if apply_range else False, answer_count)
    #         )
    #
    #     return map_data_to_body_schema(ResponseBodyAnswersSchema, answer)

    # @view(
    #     schema=UpdateAnswerSchema(),
    #     validators=(colander_validator,),
    #     response_schemas={
    #         '200': ResponseBodyAnswerSchema(description="return OK response")
    #     },
    #     permission="update",
    # )
    # def put(self):
    #     body_data = self.request.validated["body"]
    #     path_data = self.request.validated["path"]
    #
    #     answer = self.request.db.query(Answer).get(path_data["id"])
    #     text = body_data.pop("answer_text")
    #     body_data["text"] = text
    #     for key in body_data:
    #         if body_data[key] is None:
    #             continue
    #         setattr(answer, key, body_data[key])
    #
    #     self.request.db.flush()
    #
    #     return map_data_to_body_schema(ResponseBodyAnswerSchema,
    #                                    dict(answer,
    #                                         answer_text=answer.text))

    @view(
        schema=CreateAnswerSchema(),
        validators=(colander_body_validator,),
        response_schemas={
            '200': ResponseBodyAnswerSchema(description="return OK response")
        },
        permission="create",
    )
    def collection_post(self):
        data = {**self.request.validated}
        answer = self.request.db.query(Answer).filter(
            and_(
                Answer.question_id == data["question_id"],
                Answer.testing_id == data["testing_id"])
        ).first()
        print("\n\n\n")
        print("answer")
        print(answer)
        print("\n\n\n")
        if answer:
            for key in data:
                if data[key] is None:
                    continue
                setattr(answer, key, data[key])
            self.request.db.flush()
            print("\n\n\n")
            print("update")
            print("\n\n\n")
        else:
            print("\n\n\n")
            print("create")
            print("\n\n\n")
            answer = Answer(**data)
            self.request.db.add(answer)
            self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyAnswerSchema, dict(answer))

    # @view(
    #     schema=GetItemByIdParamSchema(),
    #     validators=(colander_path_validator,),
    #     response_schemas={
    #         '200': ResponseBodyEmptySchema(description="Return OK response")
    #     },
    #     permission="delete",
    #     content_type="text/plain"
    # )
    # def delete(self):
    #     self.request.db.query(Answer).filter(Answer.id == self.request.validated["id"]).delete()
    #     self.request.db.flush()
    #
    #     return map_data_to_body_schema(ResponseBodyEmptySchema, "")
