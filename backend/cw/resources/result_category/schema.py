import colander

from .._shared.schema import (
    GetCollectionBaseSchema,
)


class GetResultCategorySchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())


GetResultCategoriesSchema = GetCollectionBaseSchema(
    sort_fields=["id", "test_id", "text", "sequential_number"],
    filter_fields=[
        ("id", colander.List),
        ("test_id", colander.Integer),
        ("sequential_number", colander.Integer),
        "text",
    ],
)


class CreateResultCategorySchema(colander.MappingSchema):
    test_id = colander.SchemaNode(colander.Integer())
    text = colander.SchemaNode(colander.String())
    sequential_number = colander.SchemaNode(colander.Integer())


class UpdateResultCategoryBaseSchema(colander.MappingSchema):
    text = colander.SchemaNode(colander.String())
    sequential_number = colander.SchemaNode(colander.Integer())


class UpdateResultCategorySchema(colander.MappingSchema):
    body = UpdateResultCategoryBaseSchema()
    path = GetResultCategorySchema()


class ResponseResultCategoryBaseSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())
    test_id = colander.SchemaNode(colander.Integer())
    sequential_number = colander.SchemaNode(colander.Integer())
    text = colander.SchemaNode(colander.String())


class ResponseBodyResultCategorySchema(colander.MappingSchema):
    body = ResponseResultCategoryBaseSchema()


class ResponseBodyResultCategoriesSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsResultCategorySchema(colander.SequenceSchema):
        result_category = ResponseResultCategoryBaseSchema()
