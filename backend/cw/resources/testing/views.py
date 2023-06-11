from cornice import Service
from cornice.validators import (
    colander_body_validator,
    colander_querystring_validator,
    colander_path_validator,
    colander_validator,
)
from sqlalchemy import func, and_, or_, case
from pyramid.httpexceptions import HTTPNotFound

from cw.modules.cornice import negotiation_params
from cw.database import UserRole, Testing, Test, \
    QuestionCategory, ResultOption, AnswerOption, Answer, Question

from .._shared.schema import (
    map_data_to_body_schema,
)
from .schema import (
    GetTestingSchema,
    ResponseBodyTestingResultSchema,
)

def get_result_option_by_QuestionCategory_and_score(db, question_category, score):
    result_option = db.query(ResultOption) \
        .filter(ResultOption.min <= score) \
        .filter(ResultOption.max > score) \
        .filter(ResultOption.question_category_id == question_category.id) \
        .first()
    if result_option:
        return result_option
    else:
        return dict()

testing_result_view = Service(name="testing-result", description="testing-result", path="/testing-result/{id}",
                         tags=["testing-result"], **negotiation_params)


@testing_result_view.get(
    schema=GetTestingSchema(),
    validators=(colander_path_validator,),
    response_schemas={
        '200': ResponseBodyTestingResultSchema(description="Return OK response"),
    }
)
def get(request):
    path_data = request.validated
    testing = request.db.query(Testing).get(path_data['id'])

    if testing is None:
        raise HTTPNotFound(explanation="Testing not found!")

    # WORK
    testing_result_query = request.db.query(QuestionCategory, func.sum(AnswerOption.score)) \
        .join(Test, QuestionCategory.test_id == Test.id) \
        .join(AnswerOption, AnswerOption.question_category_id == QuestionCategory.id) \
        .join(Answer, Answer.answer_option_id == AnswerOption.id) \
        .filter(QuestionCategory.test_id == testing.test_id) \
        .group_by(QuestionCategory.id) \
        .order_by(func.sum(AnswerOption.score))
    testing_result_list = testing_result_query.all()

    result_dict = [dict(
        question_category=dict(question_category),
        result_option= get_result_option_by_QuestionCategory_and_score(request.db, question_category, score),
        score=score
    ) for question_category, score in testing_result_list]
    return map_data_to_body_schema(ResponseBodyTestingResultSchema, result_dict)

