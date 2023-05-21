import colander

from .._shared.schema import (
    GetCollectionBaseSchema,
)


class GetTestSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())


GetTestsSchema = GetCollectionBaseSchema(
    sort_fields=["id", "title", "subtitle", "description", "created_at"],
    filter_fields=[
        ("id", colander.List),
        "title", "subtitle", "description",
        ("created_at", colander.DateTime),
    ],
)


class CreateTestSchema(colander.MappingSchema):
    title = colander.SchemaNode(colander.String())
    subtitle = colander.SchemaNode(colander.String())
    description = colander.SchemaNode(colander.String())


class UpdateTestBaseSchema(colander.MappingSchema):
    title = colander.SchemaNode(colander.String())
    subtitle = colander.SchemaNode(colander.String())
    description = colander.SchemaNode(colander.String())


class UpdateTestSchema(colander.MappingSchema):
    body = UpdateTestBaseSchema()
    path = GetTestSchema()


class ResponseTestBaseSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())
    title = colander.SchemaNode(colander.String())
    subtitle = colander.SchemaNode(colander.String())
    description = colander.SchemaNode(colander.String())
    created_at = colander.SchemaNode(colander.DateTime())


class ResponseBodyTestSchema(colander.MappingSchema):
    body = ResponseTestBaseSchema()


class ResponseBodyTestsSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsTestSchema(colander.SequenceSchema):
        test = ResponseTestBaseSchema()
