from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint

from .meta import BaseTest
from .AnswerOption import AnswerOption
from .Testing import Testing
from .Question import Question


class Answer(BaseTest):
    __tablename__ = "answer"

    id = Column(Integer(), primary_key=True)
    testing_id = Column(Integer, ForeignKey(Testing.id), nullable=False)
    question_id = Column(Integer, ForeignKey(Question.id), nullable=False)
    answer_option_id = Column(Integer, ForeignKey(AnswerOption.id), nullable=False)
    UniqueConstraint('testing_id', 'question_id')

    def __repr__(self):
        return f"Answer({self.id}, testing_id={self.testing_id} answer_option_id={self.answer_option_id})"
