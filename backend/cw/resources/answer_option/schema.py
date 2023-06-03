import colander

from .._shared.schema import (
    GetCollectionBaseSchema,
)


class GetAnswerOptionSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())


GetAnswerOptionsSchema = GetCollectionBaseSchema(
    sort_fields=["id", "question_id", "question_category_id", "answer_option_text", "score",],
    filter_fields=[
        ("id", colander.List),
        ("question_id", colander.Integer),
        ("question_category_id", colander.Integer),
        "answer_option_text",
        ("score", colander.Integer),
    ],
)


class CreateAnswerOptionSchema(colander.MappingSchema):
    question_id = colander.SchemaNode(colander.Integer())
    question_category_id = colander.SchemaNode(colander.Integer())
    answer_option_text = colander.SchemaNode(colander.String())
    score = colander.SchemaNode(colander.Integer())


class UpdateAnswerOptionBaseSchema(colander.MappingSchema):
    question_category_id = colander.SchemaNode(colander.Integer())
    answer_option_text = colander.SchemaNode(colander.String())
    score = colander.SchemaNode(colander.Integer())


class UpdateAnswerOptionSchema(colander.MappingSchema):
    body = UpdateAnswerOptionBaseSchema()
    path = GetAnswerOptionSchema()


class ResponseAnswerOptionBaseSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())
    question_id = colander.SchemaNode(colander.Integer())
    question_category_id = colander.SchemaNode(colander.Integer())
    answer_option_text = colander.SchemaNode(colander.String())
    score = colander.SchemaNode(colander.Integer())


class ResponseBodyAnswerOptionSchema(colander.MappingSchema):
    body = ResponseAnswerOptionBaseSchema()


class ResponseBodyAnswerOptionsSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsAnswerOptionSchema(colander.SequenceSchema):
        answer_option = ResponseAnswerOptionBaseSchema()
