import colander


class Answers(colander.SequenceSchema):
    Answer = colander.SchemaNode(colander.Integer())


class TestItem(colander.MappingSchema):
    left = colander.SchemaNode(colander.String())
    reverse = colander.SchemaNode(colander.Boolean())
    right = colander.SchemaNode(colander.String())
    type = colander.SchemaNode(colander.Integer())


class Test1Data(colander.SequenceSchema):
    item = TestItem()


class CreateTest1Schema(colander.MappingSchema):
    user_id = colander.SchemaNode(colander.Integer())
    answers = Answers()
    test_1_data = Test1Data()
