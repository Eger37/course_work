import colander

from .._shared.schema import (
    GetCollectionBaseSchema,
)


class GetQuestionCategorySchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())


GetQuestionCategoriesSchema = GetCollectionBaseSchema(
    sort_fields=["id", "test_id", "name", "question_category_description"],
    filter_fields=[
        ("id", colander.List),
        ("test_id", colander.Integer),
        "name",
        "question_category_description",
    ],
)


class CreateQuestionCategorySchema(colander.MappingSchema):
    test_id = colander.SchemaNode(colander.Integer())
    name = colander.SchemaNode(colander.String(), required=True)
    question_category_description = colander.SchemaNode(colander.String(), missing=None)


class UpdateQuestionCategoryBaseSchema(colander.MappingSchema):
    name = colander.SchemaNode(colander.String(), required=True)
    question_category_description = colander.SchemaNode(colander.String(), missing=None)


class UpdateQuestionCategorySchema(colander.MappingSchema):
    body = UpdateQuestionCategoryBaseSchema()
    path = GetQuestionCategorySchema()


class ResponseQuestionCategoryBaseSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())
    test_id = colander.SchemaNode(colander.Integer())
    name = colander.SchemaNode(colander.String())
    question_category_description = colander.SchemaNode(colander.String())


class ResponseBodyQuestionCategorySchema(colander.MappingSchema):
    body = ResponseQuestionCategoryBaseSchema()


class ResponseBodyQuestionCategoriesSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsQuestionCategorySchema(colander.SequenceSchema):
        question_category = ResponseQuestionCategoryBaseSchema()
