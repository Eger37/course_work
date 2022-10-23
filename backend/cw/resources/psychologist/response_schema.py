import colander

from .._shared.schema import (
    digits_only,
    ResponseUserBaseSchema,
)


# class ManagerSchema(colander.MappingSchema):
# 	id = colander.SchemaNode(colander.Integer())
# 	first_name = colander.SchemaNode(colander.String(), missing=None)
# 	last_name = colander.SchemaNode(colander.String(), missing=None)
# 	email = colander.SchemaNode(colander.String(), missing=None)
# 	phone = colander.SchemaNode(colander.String(), missing=None, preparer=digits_only)


# class ManagersSchema(colander.SequenceSchema):
# 	item = ManagerSchema()

class ResponseManagerBaseSchema(ResponseUserBaseSchema):
    pass


class ResponseBodyManagerSchema(colander.MappingSchema):
    # body = ManagerSchema()
    body = ResponseUserBaseSchema()


class ResponseBodyManagersSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsManagerSchema(colander.SequenceSchema):
        # manager = ManagerSchema()
        manager = ResponseUserBaseSchema()
