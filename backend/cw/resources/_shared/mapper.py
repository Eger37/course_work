import colander


def map_dict_to_mapping_schema(schema, d):
    if len(schema.__all_schema_nodes__) == 0:
        return d
    result = {}
    for node in schema.__all_schema_nodes__:
        if isinstance(node.typ, colander.Sequence):
            result[node.name] = map_list_to_sequence_schema(
                node,
                d.get(node.name, [])
            )
        elif isinstance(node.typ, colander.Mapping):
            result[node.name] = map_dict_to_mapping_schema(
                node,
                d.get(node.name, {})
            )
        else:
            node_value = d.get(node.name)
            if node_value is None and node.missing is not colander.required:
                if node.missing == colander.drop:
                    pass
                elif callable(node.missing):
                    result[node.name] = node.missing()
                else:
                    result[node.name] = node.missing
            else:
                result[node.name] = node_value
    return result


def map_list_to_sequence_schema(schema, l):
    sch = schema.__all_schema_nodes__[0]
    return [map_dict_to_mapping_schema(sch, i) for i in l]


def map_to_schema(schema, data):
    s_type = schema.schema_type()

    if isinstance(s_type, colander.Sequence):
        result = map_list_to_sequence_schema(schema, data)
    elif isinstance(s_type, colander.Mapping):
        result = map_dict_to_mapping_schema(schema, data)

    return result
