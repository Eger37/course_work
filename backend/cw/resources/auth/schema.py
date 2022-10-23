import colander


class SchemaLogin(colander.MappingSchema):
	email = colander.SchemaNode(colander.String())
	password = colander.SchemaNode(colander.String())


class ResponseBodyLoginSchema(colander.MappingSchema):
	@colander.instantiate(name="body")
	class BodyItemsCustomerSchema(colander.MappingSchema):
		token = colander.SchemaNode(colander.String())
		role = colander.SchemaNode(colander.String())


login_response_schema = {
	'200': ResponseBodyLoginSchema(description="Return OK response"),
}