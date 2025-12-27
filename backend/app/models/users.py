# ---------------------------------------------------------
# This file defines the DATABASE model for users
# ---------------------------------------------------------

import uuid
from app import db


class User(db.Model):
    __tablename__ = "users"

    # Supabase-style UUID stored as string
    id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    first_name = db.Column(db.String(100), nullable=True)
    last_name = db.Column(db.String(100), nullable=True)

    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        nullable=False
    )

    updated_at = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        onupdate=db.func.now(),
        nullable=False
    )

    def __repr__(self):
        return f"<User email:{self.email} , username:{self.username}>"
