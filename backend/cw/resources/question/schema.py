import colander

from .._shared.schema import (
    GetCollectionBaseSchema,
)


class GetQuestionSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())


GetQuestionsSchema = GetCollectionBaseSchema(
    sort_fields=["id", "test_id", "text", "sequential_number"],
    filter_fields=[
        ("id", colander.List),
        ("test_id", colander.Integer),
        ("sequential_number", colander.Integer),
        "text",
    ],
)


class CreateQuestionSchema(colander.MappingSchema):
    test_id = colander.SchemaNode(colander.Integer())
    text = colander.SchemaNode(colander.String())
    sequential_number = colander.SchemaNode(colander.Integer())


class UpdateQuestionBaseSchema(colander.MappingSchema):
    test_id = colander.SchemaNode(colander.Integer())
    text = colander.SchemaNode(colander.String())
    sequential_number = colander.SchemaNode(colander.Integer())


class UpdateQuestionSchema(colander.MappingSchema):
    body = UpdateQuestionBaseSchema()
    path = GetQuestionSchema()


class ResponseQuestionBaseSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())
    test_id = colander.SchemaNode(colander.Integer())
    sequential_number = colander.SchemaNode(colander.Integer())
    text = colander.SchemaNode(colander.String())


class ResponseBodyQuestionSchema(colander.MappingSchema):
    body = ResponseQuestionBaseSchema()


class ResponseBodyQuestionsSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsQuestionSchema(colander.SequenceSchema):
        question = ResponseQuestionBaseSchema()
