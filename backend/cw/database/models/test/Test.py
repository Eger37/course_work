from sqlalchemy import Column, Integer

from .meta import BaseTest


class Test(BaseTest):
    __tablename__ = "test"

    id = Column(Integer(), primary_key=True)
    test_id = Column(Integer(), default=None)

    def __repr__(self):
        return f"Port({self.id}, {self.test_id})"
