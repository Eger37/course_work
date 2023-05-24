from pyramid.security import (
    Allow,
    Everyone
)
from sqlalchemy import func
from pyramid.httpexceptions import HTTPNotFound

from cornice.resource import resource, view
from cornice.validators import (
    colander_body_validator,
    colander_path_validator,
    colander_validator
)

from cw.database import UserRole, ResultGrade

from .schema import (
    GetResultGradeSchema,
    ResponseBodyResultGradeSchema,
    GetResultGradesSchema,
    ResponseBodyResultGradesSchema,
    UpdateResultGradeSchema,
    CreateResultGradeSchema
)

from .._shared.schema import (
    map_data_to_body_schema,
    ResponseBodyEmptySchema,
    GetItemByIdParamSchema
)

from .._shared.query import (
    apply_filter_sort_range_for_query,
    generate_range,
)

from cw.modules.cornice import negotiation_params


@resource(path="/result-grade/{id}", collection_path="/result-grade", description="Result grade resource",
          tags=["result_grade"], **negotiation_params)
class ResultGradeResource(object):
    def __init__(self, request, context=None):
        self.request = request

    def __acl__(self):
        return [
            (Allow, UserRole.admin, ("get", "create", "update", "delete",)),
            (Allow, UserRole.psychologist, ("get", "create", "update", "delete",)),
            (Allow, Everyone, ("get",)),
        ]

    @view(
        schema=GetResultGradeSchema(),
        validators=(colander_path_validator,),
        response_schemas={
            '200': ResponseBodyResultGradeSchema(description="Return OK response"),
        },
        permission="get",
    )
    def get(self):
        path_data = self.request.validated
        result_grade = self.request.db.query(ResultGrade).get(path_data['id'])
        if result_grade is None:
            raise HTTPNotFound(explanation="Result grade not found!")
        return map_data_to_body_schema(ResponseBodyResultGradeSchema, dict(result_grade))

    @view(
        schema=GetResultGradesSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyResultGradesSchema(description="Return OK response"),
        },
        permission="get",
        renderer='json'
    )
    def collection_get(self):
        data = self.request.validated['querystring']
        apply_range = True
        if data["filter"].pop("no_range", None):
            apply_range = False

        questions_query = self.request.db.query(ResultGrade)
        questions_count_query = self.request.db.query(func.count(ResultGrade.id))
        questions_query, questions_count_query = apply_filter_sort_range_for_query(ResultGrade, questions_query,
                                                                                   questions_count_query,
                                                                                   data=data, apply_range=apply_range)

        questions = questions_query.all()
        questions_count = questions_count_query.scalar()

        questions = [dict(result_grade) for result_grade in questions]

        if data.get("range"):
            self.request.response.headers.add(
                "Content-Range",
                generate_range(data["range"] if apply_range else False, questions_count)
            )

        return map_data_to_body_schema(ResponseBodyResultGradesSchema, questions)

    @view(
        schema=UpdateResultGradeSchema(),
        validators=(colander_validator,),
        response_schemas={
            '200': ResponseBodyResultGradeSchema(description="return OK response")
        },
        permission="update",
    )
    def put(self):
        body_data = self.request.validated["body"]
        path_data = self.request.validated["path"]

        result_grade = self.request.db.query(ResultGrade).get(path_data["id"])

        for key in body_data:
            if body_data[key] is None:
                continue
            setattr(result_grade, key, body_data[key])

        self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyResultGradeSchema, dict(result_grade))

    @view(
        schema=CreateResultGradeSchema(),
        validators=(colander_body_validator,),
        response_schemas={
            '200': ResponseBodyResultGradeSchema(description="return OK response")
        },
        permission="create",
    )
    def collection_post(self):
        data = {**self.request.validated}
        result_grade = ResultGrade(**data)
        self.request.db.add(result_grade)
        self.request.db.flush()
        return map_data_to_body_schema(ResponseBodyResultGradeSchema, dict(result_grade))


    @view(
        schema=GetItemByIdParamSchema(),
        validators=(colander_path_validator,),
        response_schemas={
            '200': ResponseBodyEmptySchema(description="Return OK response")
        },
        permission="delete",
        content_type="text/plain"
    )
    def delete(self):
        self.request.db.query(ResultGrade).filter(ResultGrade.id == self.request.validated["id"]).delete()
        self.request.db.flush()

        return map_data_to_body_schema(ResponseBodyEmptySchema, "")
