from sqlalchemy import Column, Integer, ForeignKey, DateTime, String
from datetime import datetime

from .meta import BaseTest
from .Test import Test
from ..user import User

class Testing(BaseTest):
    __tablename__ = "testing"

    id = Column(Integer(), primary_key=True)
    test_id = Column(Integer, ForeignKey(Test.id), nullable=False)
    user_id = Column(Integer, ForeignKey(User.id), nullable=False)
    note = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=False), nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Testing({self.id}, {self.test_id})"
