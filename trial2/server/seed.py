from app import app
from models import db, User, DepressiveDisorderAnswer, AnxietyDisorderAnswer, BipolarDisorderAnswer, Comment
from faker import Faker

fake = Faker()

with app.app_context():
    print("seed data!")

    users = []

    for i in range(10):
        user = User(
            full_name = fake.name(),
            email = fake.email(),
            password = fake.word()
        )
        users.append(user)
        db.session.add_all(users)
        db.session.commit()

    comments = []

    for user in users:
        for _ in range(2):
            comment = Comment(
                full_name=user.full_name,
                user=user,
                comment=fake.text()
            )
            comments.append(comment)

    # Add comments to the database
    db.session.add_all(comments)
    db.session.commit()


    print("Seeding complete!")  
