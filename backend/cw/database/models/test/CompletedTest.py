from sqlalchemy import Column, Integer, String, DateTime

from .meta import BaseTest
from datetime import datetime


class CompletedTest(BaseTest):
    __tablename__ = "completed_tests"

    id = Column(Integer(), primary_key=True)
    test_id = Column(Integer())
    user_id = Column(Integer())
    created_at = Column(DateTime(timezone=False), nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"CompletedTest({self.id}, {self.test_id})"
