from sqlalchemy import Column, Integer, String, ForeignKey

from .meta import BaseTest
from .Test import Test


class QuestionCategory(BaseTest):
    __tablename__ = "question_category"

    id = Column(Integer(), primary_key=True)
    test_id = Column(Integer, ForeignKey(Test.id), nullable=False)
    name = Column(String(128), nullable=False)
    description = Column(String(2048), nullable=False)

    def __repr__(self):
        return f"QuestionCategory({self.id}, {self.test_id})"
