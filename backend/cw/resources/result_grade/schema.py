import colander

from .._shared.schema import (
    GetCollectionBaseSchema,
)


class GetResultGradeSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())


GetResultGradesSchema = GetCollectionBaseSchema(
    sort_fields=["id", "test_id", "text", "sequential_number"],
    filter_fields=[
        ("id", colander.List),
        ("test_id", colander.Integer),
        ("sequential_number", colander.Integer),
        "text",
    ],
)


class CreateResultGradeSchema(colander.MappingSchema):
    test_id = colander.SchemaNode(colander.Integer())
    text = colander.SchemaNode(colander.String())
    sequential_number = colander.SchemaNode(colander.Integer())


class UpdateResultGradeBaseSchema(colander.MappingSchema):
    text = colander.SchemaNode(colander.String())
    sequential_number = colander.SchemaNode(colander.Integer())


class UpdateResultGradeSchema(colander.MappingSchema):
    body = UpdateResultGradeBaseSchema()
    path = GetResultGradeSchema()


class ResponseResultGradeBaseSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())
    test_id = colander.SchemaNode(colander.Integer())
    sequential_number = colander.SchemaNode(colander.Integer())
    text = colander.SchemaNode(colander.String())


class ResponseBodyResultGradeSchema(colander.MappingSchema):
    body = ResponseResultGradeBaseSchema()


class ResponseBodyResultGradesSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsResultGradeSchema(colander.SequenceSchema):
        question = ResponseResultGradeBaseSchema()
