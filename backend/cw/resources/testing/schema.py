import colander

from .._shared.schema import (
    GetCollectionBaseSchema,
)


class GetTestingSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())


GetTestingsSchema = GetCollectionBaseSchema(
    sort_fields=["id", "test_id", "user_id",],
    filter_fields=[
        ("id", colander.List),
        ("test_id", colander.Integer),
        ("user_id", colander.Integer),
    ],
)


class CreateTestingSchema(colander.MappingSchema):
    test_id = colander.SchemaNode(colander.Integer())


# class UpdateTestingBaseSchema(colander.MappingSchema):
#     text = colander.SchemaNode(colander.String())
#     sequential_number = colander.SchemaNode(colander.Integer())


# class UpdateTestingSchema(colander.MappingSchema):
#     body = UpdateTestingBaseSchema()
#     path = GetTestingSchema()


class ResponseTestingBaseSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())
    test_id = colander.SchemaNode(colander.Integer())
    user_id = colander.SchemaNode(colander.Integer())



class ResponseBodyTestingSchema(colander.MappingSchema):
    body = ResponseTestingBaseSchema()


class ResponseBodyTestingsSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsTestingSchema(colander.SequenceSchema):
        testing = ResponseTestingBaseSchema()
