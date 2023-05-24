import colander

from .._shared.schema import (
    GetCollectionBaseSchema,
)


class GetQuestionCategorySchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())


GetQuestionCategoriesSchema = GetCollectionBaseSchema(
    sort_fields=["id", "test_id", "text", "sequential_number"],
    filter_fields=[
        ("id", colander.List),
        ("test_id", colander.Integer),
        ("sequential_number", colander.Integer),
        "text",
    ],
)


class CreateQuestionCategorySchema(colander.MappingSchema):
    test_id = colander.SchemaNode(colander.Integer())
    text = colander.SchemaNode(colander.String())
    sequential_number = colander.SchemaNode(colander.Integer())


class UpdateQuestionCategoryBaseSchema(colander.MappingSchema):
    text = colander.SchemaNode(colander.String())
    sequential_number = colander.SchemaNode(colander.Integer())


class UpdateQuestionCategorySchema(colander.MappingSchema):
    body = UpdateQuestionCategoryBaseSchema()
    path = GetQuestionCategorySchema()


class ResponseQuestionCategoryBaseSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())
    test_id = colander.SchemaNode(colander.Integer())
    sequential_number = colander.SchemaNode(colander.Integer())
    text = colander.SchemaNode(colander.String())


class ResponseBodyQuestionCategorySchema(colander.MappingSchema):
    body = ResponseQuestionCategoryBaseSchema()


class ResponseBodyQuestionCategoriesSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsQuestionCategorySchema(colander.SequenceSchema):
        question_category = ResponseQuestionCategoryBaseSchema()
