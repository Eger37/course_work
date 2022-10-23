import colander


class CreateClientSchema(colander.MappingSchema):
    first_name = colander.SchemaNode(colander.Str(), validator=colander.Length(max=128), missing=None)
    last_name = colander.SchemaNode(colander.Str(), validator=colander.Length(max=128), missing=None)
    password = colander.SchemaNode(colander.Str(), validator=colander.Length(max=128))
    email = colander.SchemaNode(colander.Str())


class ResponseBodyClientSchema(colander.MappingSchema):
    message = colander.SchemaNode(colander.String())
