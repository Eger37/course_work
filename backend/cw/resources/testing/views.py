from cornice import Service
from cornice.validators import (
    colander_body_validator,
    colander_querystring_validator,
    colander_path_validator,
    colander_validator,
)
from sqlalchemy import func, desc, and_
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
    testing_id = path_data['id']
    testing = request.db.query(Testing).get(testing_id)

    if testing is None:
        raise HTTPNotFound(explanation="Testing not found!")

    testing_result_query = request.db.query(Testing, QuestionCategory, func.sum(AnswerOption.score)) \
        .filter(Testing.id == testing_id) \
        .join(Test, Testing.test_id == Test.id) \
        .join(QuestionCategory, QuestionCategory.test_id == Test.id) \
        .join(Answer, Answer.testing_id == Testing.id) \
        .join(AnswerOption, and_(Answer.answer_option_id == AnswerOption.id,
                                 AnswerOption.question_category_id == QuestionCategory.id)) \
        .group_by(Testing.id, QuestionCategory.id,) \
        .order_by(desc(func.sum(AnswerOption.score)))

    testing_result_list = testing_result_query.all()

    # print("\n\n\n")
    # print("testing_result_list")
    # for i in testing_result_list:
    #     print(i)
    #
    # print("\n\n\n")

    testing_result_for_category = [dict(
        question_category=dict(question_category),
        result_option=get_result_option_by_QuestionCategory_and_score(request.db, question_category, score),
        score=score
    ) for _, question_category, score in testing_result_list]

    result_dict = dict(
        id=testing_id,
        testing_result_for_category=testing_result_for_category
    )
    return map_data_to_body_schema(ResponseBodyTestingResultSchema, result_dict)
