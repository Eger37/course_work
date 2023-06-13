from sqlalchemy import Column, Integer, String, DateTime, Boolean

from .meta import BaseTest
from datetime import datetime


class Test(BaseTest):
    __tablename__ = "test"

    id = Column(Integer(), primary_key=True)
    title = Column(String(128), nullable=False)
    subtitle = Column(String(256), nullable=False)
    description = Column(String(2048), nullable=False)
    activ = Column(Boolean, nullable=False, default=False)

    created_at = Column(DateTime(timezone=False), nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Test({self.id}, {self.title})"
