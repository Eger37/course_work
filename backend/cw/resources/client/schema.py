import colander

from .._shared.schema import (
    GetCollectionBaseSchema,
    CreateUserBaseSchema,
    UpdateUserBaseSchema,
)


class CreateClientSchema(CreateUserBaseSchema):
    pass


class GetClientSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())


class UpdateClientSchema(UpdateUserBaseSchema):
    pass


GetClientsSchema = GetCollectionBaseSchema(
    sort_fields=["id", "first_name", "last_name", "email", "phone"],
    filter_fields=[
        ("id", colander.List),
        ("no_range", colander.Boolean),
        "first_name", "last_name", "email", "phone",
    ],
)


class UpdateClientValidatorSchema(colander.MappingSchema):
    body = UpdateClientSchema()
    path = GetClientSchema()
