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
    print("\n\n\n")
    print("testing")
    print(testing)
    print("\n\n\n")

    # testing_result_query = request.db.query(QuestionCategory, case((
    #     and_(ResultOption.min <= func.sum(AnswerOption.score),
    #          ResultOption.max > func.sum(AnswerOption.score)), ResultOption.text),
    #     (func.count(ResultOption.id) == 0, None),
    #     else_=None
    # ), func.sum(AnswerOption.score)) \
    #     .join(Test, QuestionCategory.test_id == Test.id) \
    #     .join(AnswerOption, AnswerOption.question_category_id == QuestionCategory.id) \
    #     .join(Answer, Answer.answer_option_id == AnswerOption.id) \
    #     .outerjoin(ResultOption, QuestionCategory.id == ResultOption.question_category_id) \
    #     .filter(QuestionCategory.test_id == testing.test_id) \
    #     .group_by(QuestionCategory.id, ResultOption.id) \
    #     .order_by(func.sum(AnswerOption.score)) \
    #     .having(func.count(ResultOption.id) == 2)
    #
    #
    # print("\n\n\n")
    # print("sum_res")
    # for i in testing_result_list:
    #     print(i)
    # # print(sum_res)
    # print("\n\n\n")
    # print("\n\n\n")
    # # return map_data_to_body_schema(ResponseBodyTestingSchema, dict(testing))
    # result_dict = [dict(
    #     question_category=dict(question_category),
    #     result_option= dict(result_option),
    #     score=score
    # ) if result_option else
    #                dict(
    #                    question_category=dict(question_category),
    #                    score=score
    #                )
    #                for question_category, result_option, score in testing_result_list]

    # WORK
    testing_result_query = request.db.query(QuestionCategory, func.sum(AnswerOption.score)) \
        .join(Test, QuestionCategory.test_id == Test.id) \
        .join(AnswerOption, AnswerOption.question_category_id == QuestionCategory.id) \
        .join(Answer, Answer.answer_option_id == AnswerOption.id) \
        .filter(QuestionCategory.test_id == testing.test_id) \
        .group_by(QuestionCategory.id) \
        .order_by(func.sum(AnswerOption.score))
    testing_result_list = testing_result_query.all()
    print("\n\n\n")
    print("sum_res")
    for i in testing_result_list:
        print(i)
    # print(sum_res)
    print("\n\n\n")
    print("\n\n\n")
    result_dict = [dict(
        question_category=dict(question_category),
        score=score
    ) for question_category, score in testing_result_list]
    return map_data_to_body_schema(ResponseBodyTestingResultSchema, result_dict)

