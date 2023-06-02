import colander

from .._shared.schema import (
    GetCollectionBaseSchema,
)


class GetResultOptionSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())


GetResultOptionsSchema = GetCollectionBaseSchema(
    sort_fields=["id", "test_id", "question_category_id", "min", "max", "text",],
    filter_fields=[
        ("id", colander.List),
        ("test_id", colander.Integer),
        ("question_category_id", colander.Integer),
        ("min", colander.Integer),
        ("max", colander.Integer),
        "text",
    ],
)


class CreateResultOptionSchema(colander.MappingSchema):
    test_id = colander.SchemaNode(colander.Integer())
    question_category_id = colander.SchemaNode(colander.Integer())
    min = colander.SchemaNode(colander.Integer())
    max = colander.SchemaNode(colander.Integer())
    text = colander.SchemaNode(colander.String())


class UpdateResultOptionBaseSchema(colander.MappingSchema):
    question_category_id = colander.SchemaNode(colander.Integer())
    min = colander.SchemaNode(colander.Integer())
    max = colander.SchemaNode(colander.Integer())
    text = colander.SchemaNode(colander.String())


class UpdateResultOptionSchema(colander.MappingSchema):
    body = UpdateResultOptionBaseSchema()
    path = GetResultOptionSchema()


class ResponseResultOptionBaseSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())
    test_id = colander.SchemaNode(colander.Integer())
    question_category_id = colander.SchemaNode(colander.Integer())
    min = colander.SchemaNode(colander.Integer())
    max = colander.SchemaNode(colander.Integer())
    text = colander.SchemaNode(colander.String())


class ResponseBodyResultOptionSchema(colander.MappingSchema):
    body = ResponseResultOptionBaseSchema()


class ResponseBodyResultOptionsSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsResultOptionSchema(colander.SequenceSchema):
        result_option = ResponseResultOptionBaseSchema()
