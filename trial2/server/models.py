from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)

    depressive_disorder_answers = db.relationship("DepressiveDisorderAnswer", order_by="DepressiveDisorderAnswer.id", back_populates="user")
    bipolar_disorder_answers = db.relationship("BipolarDisorderAnswer", order_by="BipolarDisorderAnswer.id", back_populates="user")
    anxiety_disorder_answers = db.relationship("AnxietyDisorderAnswer", order_by="AnxietyDisorderAnswer.id", back_populates="user")
    comments = db.relationship("Comment", order_by="Comment.id", back_populates="user")

    def __repr__(self) -> str:
        return f"{self.id}, {self.full_name}, {self.email}, {self.password}"
    
class DepressiveDisorderAnswer(db.Model):
    __tablename__ = 'depressive_disorder_answers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    question = db.Column(db.String, nullable=False)
    answer = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="depressive_disorder_answers")

    def __repr__(self) -> str:
        return f"{self.id}, {self.user_id}, {self.question}, {self.answer}"

class BipolarDisorderAnswer(db.Model):
    __tablename__ = 'bipolar_disorder_answers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    question = db.Column(db.String, nullable=False)
    answer = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="bipolar_disorder_answers")

    def __repr__(self) -> str:
        return f"{self.id}, {self.user_id}, {self.question}, {self.answer}"

class AnxietyDisorderAnswer(db.Model):
    __tablename__ = 'anxiety_disorder_answers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    question = db.Column(db.String, nullable=False)
    answer = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="anxiety_disorder_answers")

    def __repr__(self) -> str:
        return f"{self.id}, {self.user_id}, {self.question}, {self.answer}"

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    comment = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="comments")

    def __repr__(self) -> str:
        return f"{self.id}, {self.user_id}, {self.comment}"
