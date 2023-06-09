import colander

from .._shared.schema import (
    GetCollectionBaseSchema,
)


class GetAnswerSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())


GetAnswersSchema = GetCollectionBaseSchema(
    sort_fields=["id", "testing_id", "question_id", "answer_option_id",],
    filter_fields=[
        ("id", colander.List),
        ("testing_id", colander.Integer),
        ("question_id", colander.Integer),
        ("answer_option_id", colander.Integer),
    ],
)


class CreateAnswerSchema(colander.MappingSchema):
    testing_id = colander.SchemaNode(colander.Integer())
    question_id = colander.SchemaNode(colander.Integer())
    answer_option_id = colander.SchemaNode(colander.Integer())


class UpdateAnswerBaseSchema(colander.MappingSchema):
    testing_id = colander.SchemaNode(colander.Integer())
    question_id = colander.SchemaNode(colander.Integer())
    answer_option_id = colander.SchemaNode(colander.Integer())


class UpdateAnswerSchema(colander.MappingSchema):
    body = UpdateAnswerBaseSchema()
    path = GetAnswerSchema()


class ResponseAnswerBaseSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())
    testing_id = colander.SchemaNode(colander.Integer())
    question_id = colander.SchemaNode(colander.Integer())
    answer_option_id = colander.SchemaNode(colander.Integer())




class ResponseBodyAnswerSchema(colander.MappingSchema):
    body = ResponseAnswerBaseSchema()


class ResponseBodyAnswersSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsAnswerSchema(colander.SequenceSchema):
        answer = ResponseAnswerBaseSchema()
