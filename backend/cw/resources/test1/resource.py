from pyramid.security import (
    Allow,
)

from cornice.resource import resource, view
from cornice.validators import (
    colander_body_validator,
)

from cw.database import UserRole, Test, Client

from .schema import (
    CreateTest1Schema,
)

from .response_schema import (
    ResponseTest1BaseSchema,
)

from cw.modules.cornice import negotiation_params


def get_level_result(score):
    if score < 2.3:
        return "низький"
    elif score < 3.5:
        return "нижче середнього"
    elif score < 4.6:
        return "середній"
    elif score < 5.7:
        return "вище середнього"
    elif score < 7:
        return "високий"


def generate_result(test_1_data, answers):
    well_being_score = 0
    activity_score = 0
    mood_score = 0
    for i in range(30):
        if test_1_data[i]["type"] == 1:
            well_being_score += answers[i]
        elif test_1_data[i]["type"] == 2:
            activity_score += answers[i]
        elif test_1_data[i]["type"] == 3:
            mood_score += answers[i]
    well_being_score /= 10
    activity_score /= 10
    mood_score /= 10

    return {"well_being": {"score": well_being_score, "description": get_level_result(well_being_score)},
            "activity": {"score": activity_score, "description": get_level_result(activity_score)},
            "mood": {"score": mood_score, "description": get_level_result(mood_score)}, }


def gen_text_result(result):
    return f"самопочуття: {result['well_being']['description']}, активність: {result['activity']['description']}, настрій: {result['mood']['description']},"


@resource(path="/tests/test1", collection_path="/tests/test1", description="Test 1 resource",
          tags=["test"], **negotiation_params)
class Test1Resource(object):
    def __init__(self, request, context=None):
        self.request = request

    def __acl__(self):
        return [
            (Allow, UserRole.client, ("create",)),
        ]

    @view(
        schema=CreateTest1Schema(),
        validators=(colander_body_validator,),
        response_schemas={
            '200': ResponseTest1BaseSchema(description="return OK response")
        },
        permission="create",
        renderer='json'

    )
    def post(self):
        data = {**self.request.validated}

        result = generate_result(data["test_1_data"], data["answers"])

        text_result = gen_text_result(result)
        test = Test(
            test_type_id=1,
            user_id=data["user_id"],
            result=text_result
        )

        self.request.db.add(test)
        self.request.db.flush()
        client = self.request.db.query(Client).get(data["user_id"], )
        tests = client.tests
        if tests:
            tests = tests + [test.id]
        else:
            tests = [test.id]
        client.tests = tests
        self.request.db.flush()
        return {"result": result}
