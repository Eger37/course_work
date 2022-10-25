import colander

from .._shared.schema import (
    ResponseUserBaseSchema,
)


class ResponseClientBaseSchema(ResponseUserBaseSchema):
    pass


class ResponseBodyClientSchema(colander.MappingSchema):
    body = ResponseUserBaseSchema()


class ResponseBodyClientsSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsClientSchema(colander.SequenceSchema):
        client = ResponseUserBaseSchema()
