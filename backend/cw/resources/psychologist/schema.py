import colander

from .._shared.schema import (
    order_filed_validator,
    user_sort_filed_validator,
    StringSequenceSchema,
    StringMappingSchema,
    StringTupleSchema,
    GetCollectionBaseSchema,
    CreateUserBaseSchema,
    UpdateUserBaseSchema,
)


class CreateManagerSchema(CreateUserBaseSchema):
    pass


class GetManagerSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())


class UpdateManagerSchema(UpdateUserBaseSchema):
    is_manager = colander.SchemaNode(colander.Boolean(), missing=False)
    is_terminal = colander.SchemaNode(colander.Boolean(), missing=False)


GetManagersSchema = GetCollectionBaseSchema(
    sort_fields=["id", "first_name", "last_name", "email", "phone"],
    filter_fields=[
        ("id", colander.List),
        ("no_range", colander.Boolean),
        "first_name", "last_name", "email", "phone",
    ],
)


class UpdateManagerValidatorSchema(colander.MappingSchema):
    body = UpdateManagerSchema()
    path = GetManagerSchema()
