import os
import colander

def file_validator(request, **kw):
	schema = kw["schema"]
	if "file" not in request.POST:
		request.errors.add("body", name="file", description="File for upload is not provided")
	file = request.POST.get("file")

	file_name, file_extension = os.path.splitext(file.filename)

	try:
		serialized = schema.deserialize({
			"extension": file_extension,
		})
	except colander.Invalid as e:
		e_dict = e.asdict()
		for key, description in e_dict.items():
			request.errors.add("body", name=key, description=description)

	request.validated["file"] = file
	request.validated["name"] = file_name
	request.validated["extension"] = file_extension

def is_locked_by_date(now, dt_from, dt_to):
	return not(dt_from is None and dt_to is None) and (
		(dt_from is None and now <= dt_to) or
		(dt_to is None and dt_from <= now) or
		(not(dt_from is None) and not(dt_to is None) and (dt_from <= now <= dt_to))
	)