from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, DateTime
from sqlalchemy.dialects import postgresql
from datetime import datetime

from .meta import BaseUser
from .UserType import UserType, UserTypeType


class User(BaseUser):
    __tablename__ = "user"

    id = Column(Integer(), primary_key=True)
    first_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    email = Column(String(64), nullable=False, unique=True)
    phone = Column(String(16))
    password = Column(String(128), nullable=False)

    created_by = Column(Integer())

    created_at = Column(DateTime(timezone=False), nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=False), nullable=True, default=datetime.utcnow, onupdate=datetime.utcnow)
    authorized_at = Column(DateTime(timezone=False), default=None)

    is_blocked = Column(Boolean(), nullable=False, default=False)

    type = Column(UserTypeType(), nullable=False)

    @property
    def is_manager(self):
        return self.type == UserType.manager

    __mapper_args__ = {
        'polymorphic_identity': None,
        'polymorphic_on': type,
    }

    def __repr__(self):
        return f"{self.__class__.__name__}({self.id}, {self.email}, {self.type})"


class Admin(User):
    __mapper_args__ = {
        'polymorphic_identity': UserType.admin,
    }


class Manager(User):
    __mapper_args__ = {
        'polymorphic_identity': UserType.manager,
    }


class Client(User):
    __mapper_args__ = {
        'polymorphic_identity': UserType.client,
    }
