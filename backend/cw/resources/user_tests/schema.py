import colander

from .._shared.schema import (
    GetCollectionBaseSchema
)

# class GetUserTestsSchema(colander.MappingSchema):
#     id = colander.SchemaNode(colander.Integer())

GetUserTestsSchema = GetCollectionBaseSchema(
    sort_fields=["id"],
    filter_fields=[("user_id", colander.Integer)]
)