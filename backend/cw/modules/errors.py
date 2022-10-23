from pyramid.view import exception_view_config
from pyramid.httpexceptions import HTTPException, HTTPNotFound, HTTPForbidden, HTTPUnauthorized, HTTPBadRequest
import sqlalchemy


@exception_view_config(sqlalchemy.exc.IntegrityError, renderer="json")
def integrity_error_to_bad_error(exception, request):
	try:
		# Handle IntegrityError to handle unique database error
		# print(" >>>>> ERR CODE", exception.code)
		if exception.code == "gkpj":
			message = str(exception).split("DETAIL: ")[-1].split("\n")[0]
			exception = HTTPBadRequest(explanation=message)
		else:
			raise exception
	except Exception as e:
		print(e)
		exception = HTTPBadRequest(explanation="Server error! Please try again or contact developers to fix this error.")
	return format_exception_to_dict(exception, request)


@exception_view_config(HTTPForbidden, renderer="json")
def forbidden_to_unauhorized(exception, request):
	if request.authenticated_userid is None:
		exception = HTTPUnauthorized()

	return format_exception_to_dict(exception, request)


@exception_view_config(HTTPException, renderer="json")
@exception_view_config(HTTPNotFound, renderer="json")
@exception_view_config(HTTPUnauthorized, renderer="json")
def format_exception_to_dict(exception, request):
	request.response.status = exception.status_code

	return {
		"message": exception.detail or exception.explanation,
		"code": exception.status_code,
		"title": exception.title
	}
