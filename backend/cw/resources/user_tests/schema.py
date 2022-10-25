import colander


class GetUserTestsSchema(colander.SequenceSchema):
    id = colander.SchemaNode(colander.Integer())
