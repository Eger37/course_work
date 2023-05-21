from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

from .meta import BaseTest
from .ResultCategory import ResultCategory


class Grade(BaseTest):
    __tablename__ = "grade"

    id = Column(Integer(), primary_key=True)
    result_category_id = Column(Integer, ForeignKey(ResultCategory.id), nullable=False)
    min = Column(Integer(), nullable=False)
    max = Column(Integer(), nullable=False)
    text = Column(String(2048), nullable=False)

    def __repr__(self):
        return f"Grade({self.id}, {self.test_id})"
