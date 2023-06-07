from sqlalchemy import Column, Integer, ForeignKey

from .meta import BaseTest
from .AnswerOption import AnswerOption
from .Testing import Testing


class Answer(BaseTest):
    __tablename__ = "answer"

    id = Column(Integer(), primary_key=True)
    testing_id = Column(Integer, ForeignKey(Testing.id), nullable=False)
    answer_option_id = Column(Integer, ForeignKey(AnswerOption.id), nullable=False)

    def __repr__(self):
        return f"Answer({self.id}, answer_option_id={self.answer_option_id})"
