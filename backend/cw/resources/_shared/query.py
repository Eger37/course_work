import sqlalchemy as sa
from sqlalchemy import func, and_, or_
from sqlalchemy import DateTime, Date, Time, Integer, SmallInteger, BigInteger, Boolean

from .schema import ORDER_ASC, ORDER_DESC


def asc_desc_expression(order_expression, order):
	if order == ORDER_ASC:
		order_expression = order_expression.asc()
	elif order == ORDER_DESC:
		order_expression = order_expression.desc()
	return order_expression


def get_sort_by_key_and_order_expression(Object, key, order):
	order_expression = getattr(Object, key)
	order_expression = asc_desc_expression(order_expression, order)
	return order_expression


def _append_filter_column_to(fields_filters, column, value, operator=None):
	if isinstance(column, (list, )):
		if len(column) > 1:
			or_filters = []
			for col in column:
				_append_filter_column_to(or_filters, col, value, operator)
			fields_filters.append(sa.or_(*or_filters))
			return
		else:
			column = column[0]

	if isinstance(value, (list, )):
		fields_filters.append(column.in_(value))
	elif isinstance(getattr(column.type, "impl", column.type), (DateTime, Date, Time, Integer, SmallInteger, BigInteger, Boolean)):
		if operator:
			if operator == "gt":
				fields_filters.append(column > value)
			elif operator == "gte":
				fields_filters.append(column >= value)
			elif operator == "lt":
				fields_filters.append(column < value)
			elif operator == "lte":
				fields_filters.append(column <= value)
			elif operator == "eq":
				fields_filters.append(column == value)
		else:
			fields_filters.append(column == value)
	else:
		fields_filters.append(column.ilike(f"%{value}%"))


def safe_unpack_filter(filtr):
	result = filtr.split(":")
	unpack_length = len(result)
	if unpack_length == 1:
		return result[0], None
	if unpack_length == 2:
		return result[0], result[1]
	return None, None


def get_filter_expression(Table, filters):
	filters = dict(filters)
	global_filter_query = filters.pop("_query")
	fields_filters = []
	fields_filters_by_query = []

	for filtr in filters:
		filtr_key, filtr_operator = safe_unpack_filter(filtr)
		if filters.get(filtr) is None:
			continue
		fks = filtr_key.split("|")
		_append_filter_column_to(fields_filters, [getattr(Table, fk) for fk in fks], filters[filtr], operator=filtr_operator)

	if global_filter_query is not None:
		for filtr in filters:
			filtr_key, filtr_operator = safe_unpack_filter(filtr)
			column = getattr(Table, filtr_key)
			if isinstance(column.type, (DateTime, Integer, SmallInteger, BigInteger, Boolean)):
				continue
			_append_filter_column_to(fields_filters_by_query, column, global_filter_query)

	return and_(
		and_(*fields_filters),
		or_(*fields_filters_by_query),
	)


def with_range(query, range_):
	range_from, range_to = range_
	if range_to >= 0:
		query = query.offset(range_from).limit(range_to - range_from)
	return query


def apply_filter_sort_range_for_query(Model, query, count_query, data={}, sort_by=None, apply_range=True):
	if data.get("filter"):
		filter_expression = get_filter_expression(Model, data["filter"])
		query = query.filter(filter_expression)
		count_query = count_query.filter(filter_expression)

	if sort_by is not None:
		query = query.order_by(*sort_by)
	elif data.get("sort"):
		sort_field, sort_order = data["sort"]
		order_expression = get_sort_by_key_and_order_expression(Model, sort_field, sort_order)
		query = query.order_by(order_expression)

	if apply_range and data.get("range"):
		query = with_range(query, data["range"])

	return query, count_query


def create_filter_sort_range_for_model(db, Model, data={}):
	query = db.query(Model)
	count_query = db.query(func.count(Model.id))
	return apply_filter_sort_range_for_query(Model, query, count_query, data=data)


def generate_range(_range, count):
	if not _range:
		return f"0-{count}/{count}"
	return f"{_range[0]}-{_range[1]}/{count}"
