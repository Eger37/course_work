from sqlalchemy import Integer, types
import enum


class EnumType(types.TypeDecorator):
	EnumClass = types.Integer
	impl = types.Integer

	def process_bind_param(self, value, dialect):
		if isinstance(value, (int, str,)):
			return value
		return value.value

	def process_result_value(self, value, dialect):
		if value is None:
			return value
		return self.EnumClass(value)
