from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

from .meta import BaseTest
from .Test import Test


class ResultCategory(BaseTest):
    __tablename__ = "result_category"

    id = Column(Integer(), primary_key=True)
    test_id = Column(Integer, ForeignKey(Test.id), nullable=False)
    name = Column(String(128), nullable=False)
    description = Column(String(1024), nullable=False)

    def __repr__(self):
        return f"ResultCategory({self.id}, {self.test_id})"
