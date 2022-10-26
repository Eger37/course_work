from sqlalchemy import Column, Integer, String, DateTime

from .meta import BaseTest
from datetime import datetime


class Test(BaseTest):
    __tablename__ = "test"

    id = Column(Integer(), primary_key=True)
    test_type_id = Column(Integer())
    user_id = Column(Integer())
    result = Column(String(), default=None)
    created_at = Column(DateTime(timezone=False), nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Port({self.id}, {self.test_type_id})"
