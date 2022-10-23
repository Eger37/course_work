from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import MetaData

from ..subscriptable import Subscriptable

# metadata_user = MetaData(schema="user")
metadata_user = MetaData()
BaseUser = declarative_base(metadata=metadata_user, cls=Subscriptable)
