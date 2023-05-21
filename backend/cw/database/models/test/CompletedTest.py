from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

from .meta import BaseTest
from datetime import datetime
from ..user.User import User
from .Test import Test


class CompletedTest(BaseTest):
    __tablename__ = "completed_tests"

    id = Column(Integer(), primary_key=True)
    test_id = Column(Integer, ForeignKey(Test.id), nullable=False)
    user_id = Column(Integer, ForeignKey(User.id), nullable=False)
    created_at = Column(DateTime(timezone=False), nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"CompletedTest({self.id}, {self.test_id})"
