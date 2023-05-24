from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

from .meta import BaseTest
from .QuestionCategory import QuestionCategory


class ResultGrade(BaseTest):
    __tablename__ = "result_grade"

    id = Column(Integer(), primary_key=True)
    question_category_id = Column(Integer, ForeignKey(QuestionCategory.id), nullable=False)
    min = Column(Integer(), nullable=False)
    max = Column(Integer(), nullable=False)
    text = Column(String(2048), nullable=False)

    def __repr__(self):
        return f"ResultGrade({self.id}, {self.test_id})"
