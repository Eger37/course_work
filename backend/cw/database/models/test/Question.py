from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

from .meta import BaseTest
from .Test import Test


class Question(BaseTest):
    __tablename__ = "question"

    id = Column(Integer(), primary_key=True)
    test_id = Column(Integer, ForeignKey(Test.id), nullable=False)
    text = Column(String(1024), nullable=False)

    def __repr__(self):
        return f"Question({self.id}, {self.test_id})"
