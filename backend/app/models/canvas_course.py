# ---------------------------------------------------------
# This file defines the DATABASE model for canvas courses
# ---------------------------------------------------------
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, autoincrement=True)
    canvas_course_id = Column(Integer, nullable=False, unique=True)
    name = Column(String(512), nullable=False)
    course_code = Column(String(128))
    enrollment_term = Column(String(128))
    cached_at = Column(DateTime, default=datetime.utcnow)

    modules = relationship("Module", back_populates="course", cascade="all, delete-orphan")


class Module(Base):
    __tablename__ = "modules"
    id = Column(Integer, primary_key=True, autoincrement=True)
    canvas_module_id = Column(Integer, nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(512), nullable=False)
    position = Column(Integer)
    cached_at = Column(DateTime, default=datetime.utcnow)

    course = relationship("Course", back_populates="modules")
    items = relationship("ModuleItem", back_populates="module", cascade="all, delete-orphan")


class ModuleItem(Base):
    __tablename__ = "module_items"
    id = Column(Integer, primary_key=True, autoincrement=True)
    canvas_item_id = Column(Integer, nullable=False)
    module_id = Column(Integer, ForeignKey("modules.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(1024), nullable=False)
    type = Column(String(64))
    url = Column(Text)
    content_id = Column(Integer)
    position = Column(Integer)
    cached_at = Column(DateTime, default=datetime.utcnow)

    module = relationship("Module", back_populates="items")