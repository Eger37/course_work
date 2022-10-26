import colander


class TestBaseSchema(colander.MappingSchema):
    test_type_id = colander.SchemaNode(colander.Int())
    created_at = colander.SchemaNode(colander.DateTime())
    user_id = colander.SchemaNode(colander.Int())
    result = colander.SchemaNode(colander.String())


class TestSchema(TestBaseSchema):
    id = colander.SchemaNode(colander.Int())


class ResponseBodyUserTestsSchema(colander.MappingSchema):
    @colander.instantiate()
    class body(colander.SequenceSchema):
        item = TestSchema()
