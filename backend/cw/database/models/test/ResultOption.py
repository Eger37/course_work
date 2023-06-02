from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

from .meta import BaseTest
from .QuestionCategory import QuestionCategory, Test


class ResultOption(BaseTest):
    __tablename__ = "result_option"

    id = Column(Integer(), primary_key=True)
    test_id = Column(Integer, ForeignKey(Test.id), nullable=False)
    question_category_id = Column(Integer, ForeignKey(QuestionCategory.id), nullable=False)
    min = Column(Integer(), nullable=False)
    max = Column(Integer(), nullable=False)
    text = Column(String(2048), nullable=False)

    def __repr__(self):
        return f"ResultOption({self.id}, {self.test_id})"
