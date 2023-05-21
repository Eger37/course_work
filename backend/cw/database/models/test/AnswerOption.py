from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

from .meta import BaseTest
from .Question import Question
from .ResultCategory import ResultCategory


class AnswerOption(BaseTest):
    __tablename__ = "answer_option"

    id = Column(Integer(), primary_key=True)
    question_id = Column(Integer, ForeignKey(Question.id), nullable=False)
    result_category_id = Column(Integer, ForeignKey(ResultCategory.id), nullable=False)
    text = Column(String(256), nullable=False)
    score = Column(Integer(), nullable=False)

    def __repr__(self):
        return f"AnswerOption({self.id}, {self.test_id})"
