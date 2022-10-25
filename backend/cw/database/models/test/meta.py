from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import MetaData

from ..subscriptable import Subscriptable

BaseTest = declarative_base(metadata=MetaData(), cls=Subscriptable)
