from cw.database import UserRole, UserType

mapper = {
    UserType.admin: UserRole.admin,
    UserType.manager: UserRole.psychologist,
    UserType.client: UserRole.client,
}


def map_user_type_to_role(user_type):
    return mapper \
        .get(user_type, None)
