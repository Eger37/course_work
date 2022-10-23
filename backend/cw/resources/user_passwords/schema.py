import colander
from colander import SchemaNode, MappingSchema, SequenceSchema
from colander import Str, Int, DateTime, Date, Time, Boolean
from colander import instantiate

from .._shared.schema import (
    GetItemByIdParamSchema
)


class UserPasswordSchema(colander.MappingSchema):
    old_password = colander.SchemaNode(colander.String(), missing=None)
    password = colander.SchemaNode(colander.String())
    confirm_password = colander.SchemaNode(colander.String())


class UpdateUserPasswordSchema(colander.MappingSchema):
    body = UserPasswordSchema()
    path = GetItemByIdParamSchema()


class ResponseUserPasswordSchema(colander.Schema):
    class body(colander.Schema):
        id = colander.SchemaNode(colander.Integer())
