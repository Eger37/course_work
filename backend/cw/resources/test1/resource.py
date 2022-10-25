from pyramid.security import (
    authenticated_userid,
    Allow,
)

from cornice.resource import resource, view
from cornice.validators import (
    colander_body_validator,
    colander_path_validator,
    colander_validator,
)

from sqlalchemy import func

from cw.database import User, Admin, Client, UserRole, UserType
from cw.modules.security import hash_password

from .schema import (
    CreateTest1Schema,
)

from .response_schema import (
    ResponseBodyClientSchema,
    ResponseBodyClientsSchema,
)

from .._shared.query import (
    apply_filter_sort_range_for_query,
    generate_range,
)

from .._shared.schema import (
    map_data_to_body_schema
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
            '200': ResponseBodyClientSchema(description="return OK response")
        },
        permission="create",
        renderer='json'

    )
    def post(self):
        test_data = {**self.request.validated}

        result = generate_result(test_data["test_1_data"], test_data["answers"])
        # manager_data["password"] = hash_password(manager_data["password"])
        # user = Client(
        #     **manager_data,
        #     created_by=authenticated_userid(self.request)
        # )
        # self.request.db.add(user)
        # self.request.db.flush()
        #
        # user = dict(user)

        return {"result": result}
