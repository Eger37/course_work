from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import MetaData

from .models.subscriptable import Subscriptable

# NAMING_CONVENTION = {
# 	"ix": 'ix_%(column_0_label)s',
# 	"uq": "uq_%(table_name)s_%(column_0_name)s",
# 	"ck": "ck_%(table_name)s_%(constraint_name)s",
# 	"fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# 	"pk": "pk_%(table_name)s"
# }

# metadata = MetaData()
# Base = declarative_base(metadata=metadata_user, cls=Subscriptable)

from .models.user.meta import BaseUser

INIT_META = [
    BaseUser,
]

SERIALIZABLE_BASES = [
    *INIT_META,
]
