import colander
from colander import SchemaNode, MappingSchema, SequenceSchema, TupleSchema
from colander import OneOf
from colander import Str, Int

import json
import re

from . import mapper

ORDER_ASC = "ASC"
ORDER_DESC = "DESC"


class SequenceSchemaList(colander.SequenceSchema):
    def deserialize(self, *args, **kwargs):
        res = super().deserialize(*args, **kwargs)
        if res == [None]:
            return None
        return res

    def serialize(self, *args, **kwargs):
        res = super().serialize(*args, **kwargs)
        if res == colander.null:
            return ["all"]
        return res


def list_of(_type):
    class ListSchema(colander.SequenceSchema):
        item = colander.SchemaNode(_type())

    return ListSchema


def digits_only(x):
    if x is colander.null:
        return colander.null
    return "".join(re.findall(r"\d", x))


def map_data_to_schema_by_key(Schema, key, data):
    return mapper.map_to_schema(Schema, {
        key: data,
    })[key]


def map_data_to_body_schema(Schema, data):
    return map_data_to_schema_by_key(Schema, "body", data)


class SqlalchemyMappingSchema(MappingSchema):
    def deserialize(self, cstruct, *args, **kwargs):
        return super(SqlalchemyMappingSchema, self).deserialize(cstruct.as_dict(), *args, **kwargs)


# TODO: use mixin approach for deserialize
class StringMappingSchema(MappingSchema):
    def deserialize(self, cstruct, *args, **kwargs):
        if type(cstruct) == str:
            cstruct = json.loads(cstruct)
        return super(StringMappingSchema, self).deserialize(cstruct, *args, **kwargs)


class StringSequenceSchema(SequenceSchema):
    def deserialize(self, cstruct, *args, **kwargs):
        if type(cstruct) == str:
            cstruct = json.loads(cstruct)
        return super(StringSequenceSchema, self).deserialize(cstruct, *args, **kwargs)


class StringTupleSchema(TupleSchema):
    def deserialize(self, cstruct, *args, **kwargs):
        if type(cstruct) == str:
            cstruct = json.loads(cstruct)
        return super(StringTupleSchema, self).deserialize(cstruct, *args, **kwargs)


order_filed_validator = OneOf([ORDER_ASC, ORDER_DESC])
user_sort_filed_validator = OneOf(["id", "first_name", "last_name", "email", "phone"])


class GetItemByIdParamSchema(MappingSchema):
    id = SchemaNode(Int())


def GetCollectionBaseSchema(sort_fields, filter_fields=None, name=None, filter_type=colander.String,
                            filter_type_obj={}):
    if filter_fields is None:
        filter_fields = sort_fields

    class Filter(StringMappingSchema):
        _query = colander.SchemaNode(colander.String(), missing=None)

    class Range(StringTupleSchema):
        range_from = colander.SchemaNode(colander.Integer())
        range_to = colander.SchemaNode(colander.Integer())

    class Sort(StringTupleSchema):
        field = colander.SchemaNode(colander.String(), validator=colander.OneOf(sort_fields))
        order = colander.SchemaNode(colander.String(), validator=colander.OneOf([ORDER_ASC, ORDER_DESC]))

    filter_node = Filter(missing=None)

    for field in filter_fields:
        if isinstance(field, tuple) and len(field) >= 2:
            f_name, f_type, *f_rest = field
            args = dict(missing=None, name=f_name)
            node = f_type(**args) if issubclass(f_type, colander.SchemaNode) else colander.SchemaNode(f_type(), **args)
            filter_node.add(node)
        else:
            if field in filter_type_obj:
                filter_node.add(
                    filter_type_obj[field](missing=None, name=field)
                    # filter_type_obj[field](missing=colander.drop, name=field)
                )
            else:
                filter_node.add(
                    colander.SchemaNode(filter_type(), missing=None, name=field),
                    # colander.SchemaNode(filter_type(), missing=colander.drop, name=field),
                )

    class _GetCollectionSchema(MappingSchema):
        filter = filter_node
        range = Range(missing=None)
        sort = Sort(missing=None)

    # this need for correct map to swagger schema
    class GetCollectionSchema(MappingSchema):
        querystring = _GetCollectionSchema()

    return GetCollectionSchema


# Item basic schemas
class ItemSchema(MappingSchema):
    id = SchemaNode(Int())
    name = SchemaNode(Str())


class ItemListSchema(SequenceSchema):
    item = ItemSchema()


class ResponseBodyItemSchema(MappingSchema):
    body = ItemSchema()


class ResponseBodyItemListSchema(MappingSchema):
    body = ItemListSchema()


class ItemIdSchema(SequenceSchema):
    item = SchemaNode(Int())


GetItemListParamSchema = GetCollectionBaseSchema(
    sort_fields=["id"],
    filter_type_obj={'id': ItemIdSchema}
)


class ResponseBodyEmptySchema(MappingSchema):
    body = SchemaNode(Str())


class UserBaseSchema(MappingSchema):
    first_name = SchemaNode(Str(), validator=colander.Length(max=128))
    last_name = SchemaNode(Str(), validator=colander.Length(max=128))
    email = SchemaNode(Str())
    phone = SchemaNode(Str(), preparer=digits_only)


# TODO: Try to inherite from UserBaseSchema
class UpdateUserBaseSchema(MappingSchema):
    first_name = SchemaNode(Str(), validator=colander.Length(max=128), missing=None)
    last_name = SchemaNode(Str(), validator=colander.Length(max=128), missing=None)
    email = SchemaNode(Str(), missing=None)
    phone = SchemaNode(Str(), preparer=digits_only, missing=None)


class ResponseUserBaseSchema(UpdateUserBaseSchema):
    id = colander.SchemaNode(colander.Integer())
    is_blocked = colander.SchemaNode(colander.Boolean())


class ResponseUsersBaseSchema(UpdateUserBaseSchema):
    item = ResponseUserBaseSchema()


class CreateUserBaseSchema(UserBaseSchema):
    password = SchemaNode(Str())
