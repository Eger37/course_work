import colander

from .._shared.schema import (
    GetCollectionBaseSchema,
)


class GetResultOptionSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())


GetResultOptionsSchema = GetCollectionBaseSchema(
    sort_fields=["id", "test_id", "text", "sequential_number"],
    filter_fields=[
        ("id", colander.List),
        ("test_id", colander.Integer),
        ("sequential_number", colander.Integer),
        "text",
    ],
)


class CreateResultOptionSchema(colander.MappingSchema):
    test_id = colander.SchemaNode(colander.Integer())
    text = colander.SchemaNode(colander.String())
    sequential_number = colander.SchemaNode(colander.Integer())


class UpdateResultOptionBaseSchema(colander.MappingSchema):
    text = colander.SchemaNode(colander.String())
    sequential_number = colander.SchemaNode(colander.Integer())


class UpdateResultOptionSchema(colander.MappingSchema):
    body = UpdateResultOptionBaseSchema()
    path = GetResultOptionSchema()


class ResponseResultOptionBaseSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())
    test_id = colander.SchemaNode(colander.Integer())
    sequential_number = colander.SchemaNode(colander.Integer())
    text = colander.SchemaNode(colander.String())


class ResponseBodyResultOptionSchema(colander.MappingSchema):
    body = ResponseResultOptionBaseSchema()


class ResponseBodyResultOptionsSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsResultOptionSchema(colander.SequenceSchema):
        result_option = ResponseResultOptionBaseSchema()
