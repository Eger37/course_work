from sqlalchemy import Column, Integer, String

from .meta import BaseTest


class Test(BaseTest):
    __tablename__ = "test"

    id = Column(Integer(), primary_key=True)
    test_id = Column(Integer())
    result = Column(String(), default=None)

    def __repr__(self):
        return f"Port({self.id}, {self.test_id})"
