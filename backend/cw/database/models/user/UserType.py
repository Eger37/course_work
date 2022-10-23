import enum
from ...EnumType import EnumType


class UserType(enum.IntEnum):
    admin = 1
    manager = 2
    client = 3


class UserTypeType(EnumType):
    EnumClass = UserType
