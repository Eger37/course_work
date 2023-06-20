import colander

from .._shared.schema import (
    GetCollectionBaseSchema,
)
from .._shared.schema import (
    GetCollectionBaseSchema,
)

from ..question_category.schema import (
    ResponseQuestionCategoryBaseSchema
)
from ..result_option.schema import (
    ResponseResultOptionBaseSchema
)


class GetTestingSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())


GetTestingsSchema = GetCollectionBaseSchema(
    sort_fields=["id", "test_id", "user_id", "created_at",],
    filter_fields=[
        ("id", colander.List),
        ("test_id", colander.Integer),
        ("user_id", colander.Integer),
        ("created_at", colander.DateTime),

    ],
)


class CreateTestingSchema(colander.MappingSchema):
    test_id = colander.SchemaNode(colander.Integer())


class UpdateTestingBaseSchema(colander.MappingSchema):
    note = colander.SchemaNode(colander.String())


class UpdateTestingSchema(colander.MappingSchema):
    body = UpdateTestingBaseSchema()
    path = GetTestingSchema()


class ResponseTestingBaseSchema(colander.MappingSchema):
    id = colander.SchemaNode(colander.Integer())
    test_id = colander.SchemaNode(colander.Integer())
    user_id = colander.SchemaNode(colander.Integer())
    created_at = colander.SchemaNode(colander.DateTime())
    note = colander.SchemaNode(colander.String())



class ResponseBodyTestingSchema(colander.MappingSchema):
    body = ResponseTestingBaseSchema()


class ResponseBodyTestingsSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsTestingSchema(colander.SequenceSchema):
        testing = ResponseTestingBaseSchema()




class ResponseQuestionCategorySchema(ResponseQuestionCategoryBaseSchema):
    description = colander.SchemaNode(colander.String())
class ResponseTestingResultForCategoryBaseSchema(colander.MappingSchema):
    question_category = ResponseQuestionCategorySchema()
    result_option = ResponseResultOptionBaseSchema()
    score = colander.SchemaNode(colander.Integer())

class ResponseBodyTestingResultSchema(colander.MappingSchema):
    @colander.instantiate(name="body")
    class BodyItemsTestingSchema(colander.SequenceSchema):
        testing_result_for_category = ResponseTestingResultForCategoryBaseSchema()

# class ResponseBodyTestingResultsSchema(colander.MappingSchema):
#     @colander.instantiate(name="body")
#     class BodyItemsTestingSchema(colander.SequenceSchema):
#         testing_result = ResponseBodyTestingResultSchema