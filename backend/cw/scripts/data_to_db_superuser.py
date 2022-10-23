import colander
from cw.modules.security.password import hash_password
from cw.utils import data_to_db
from cw.database import Admin


class SchemaAdmin(colander.Schema):
    email = colander.SchemaNode(colander.String())
    first_name = colander.SchemaNode(colander.String())
    last_name = colander.SchemaNode(colander.String())
    password = colander.SchemaNode(colander.String())


def prepare_user(user_dict):
    user_dict["password"] = hash_password(user_dict["password"])
    return user_dict


if __name__ == "__main__":
    args = data_to_db.get_args()
    data_to_db.add_all(args, Admin, SchemaAdmin, proc_item=prepare_user)
