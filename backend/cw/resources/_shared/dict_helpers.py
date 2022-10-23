def extract_keys(d, keys):
    return {k: d[k] for k in keys}


def remove_keys(d, keys):
    keys = set(keys)
    return {k: d[k] for k in d if k not in keys}
