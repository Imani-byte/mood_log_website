from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_migrate import Migrate
from models import db, User, DepressiveDisorderAnswer, AnxietyDisorderAnswer, BipolarDisorderAnswer, Comment
from flask_cors import CORS
import os

# Initialize Flask app
app = Flask(__name__, static_folder='../client/build', static_url_path='/')
# Configure Cross-Origin Resource Sharing (CORS) to allow requests from http://localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# Configure the SQLite database URI and secret key for the Flask app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'
app.config['SECRET_KEY'] = 'imany'

# Initialize Flask-Migrate with the Flask app and SQLAlchemy database instance
migrate = Migrate(app, db)

# Initialize the SQLAlchemy database with the Flask app
db.init_app(app)


# Homepage
@app.route("/")
def index():
    """Render the homepage."""
    return render_template('home.html')

# User Signup
@app.route("/signup", methods=['GET', 'POST'])
def signup():
    """Handle user signup."""
    try:
        # Retrieve user signup data from the JSON request
        full_name = request.json.get('full_name')
        email = request.json.get('email')
        password = request.json.get('password')

        # Create a new user instance with the provided data
        new_user = User(full_name=full_name, email=email, password=password)

        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()

        # Set the user's email in the session for tracking the authenticated user
        session['email'] = email

        # Return a JSON response indicating successful signup
        return jsonify({"message": "Signup successful"}), 200
    except Exception as e:
        # Log any signup errors
        print(f"Signup error: {str(e)}")

        # Return a JSON response indicating signup failure
        return jsonify({"error": "Signup failed"}), 500


# User Login Route
@app.route("/login", methods=['GET', 'POST'])
def login():
    """Handle user login."""
    try:
        # Check if the incoming request contains JSON data
        if request.is_json:
            # Retrieve JSON data from the request
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')

            # Check if the user exists in the database using the provided email and password
            user = User.query.filter_by(email=email, password=password).first()

            if user:
                # Set the session email upon successful login
                session['email'] = email
                # Return a JSON response indicating successful login and redirecting to the Bipolar Disorder Quiz
                return jsonify({"message": "Login successful", "redirect": "/bipolar_quiz"}), 200
            else:
                # Return a JSON response indicating user not found
                return jsonify({"error": "User not found. Please check your email and password."}), 401

    except Exception as e:
        # Log any login errors
        print(f"Login error: {str(e)}")

    # Return a JSON response for invalid request format
    return jsonify({"error": "Invalid request format"}), 400

# Count "No" Answers for Bipolar Quiz
def count_no_answers_bipolar(user_id, disorder_model):
    """Count 'No' answers for Bipolar Quiz."""
    return disorder_model.query.filter_by(user_id=user_id).count()


# Bipolar Disorder Quiz Route
@app.route("/bipolar_quiz", methods=['GET', 'POST'])
def bipolar_quiz():
    """Handle Bipolar Disorder Quiz."""
    print('In bipolar_quiz route')
    
    # Check if the user is logged in (using the 'email' session key)
    if 'email' in session:
        # Handle POST request for quiz submission
        if request.method == 'POST':
            # Retrieve JSON data from the POST request
            data = request.get_json()
            print('Received data:', data)

            # Retrieve the user details using their email from the session
            user = User.query.filter_by(email=session['email']).first()

            # Assuming you have a simple function to count "No" answers for Bipolar Disorder
            no_count = count_no_answers_bipolar(user.id, BipolarDisorderAnswer)

            # Process and store answers for each of the 5 questions
            for i in range(1, 6):
                question_key = f'question{i}'
                answer = data.get(question_key)

                if answer is None:
                    # Log a warning if an answer is missing
                    app.logger.warning(f"Answer missing for Question {i} from user {user.id}")
                else:
                    # Create a Bipolar Disorder Answer object and add it to the database
                    bipolar_answer = BipolarDisorderAnswer(
                        user_id=user.id,
                        question=f"Question {i}",
                        answer=answer
                    )
                    db.session.add(bipolar_answer)
                    db.session.commit()

            # If the count of "No" answers is greater than or equal to 3, redirect to the Depressive Disorder Quiz
            if no_count >= 3:
                return jsonify({"redirect": True})
            else:
                # Return a JSON response indicating that the quiz should not be shown
                return jsonify({"showQuiz": False})

        else:
            # Handle GET request, returning a JSON response indicating successful quiz submission and redirecting to the Depressive Disorder Quiz
            return jsonify({"message": "Quiz submitted successfully",})

    # Redirect to the index page if the user is not logged in
    return redirect(url_for('index'))


# Count "No" Answers for Depressive Quiz
def count_no_answers_depressive(user_id, disorder_model):
    """Count 'No' answers for Depressive Quiz."""
    return disorder_model.query.filter_by(user_id=user_id, answer='no').count()

# Depressive Disorder Quiz Route
@app.route("/depressive_quiz", methods=['GET', 'POST'])
def depressive_quiz():
    """Handle Depressive Disorder Quiz."""
    print('In depressive_quiz route')

    # Check if the user is logged in (using the 'email' session key)
    if 'email' in session:
        # Handle POST request for quiz submission
        if request.method == 'POST':
            # Retrieve JSON data from the POST request
            data = request.get_json()
            print('Received data:', data)

            # Retrieve the user details using their email from the session
            user = User.query.filter_by(email=session['email']).first()

            # Process and store answers for each of the 5 questions
            for i in range(1, 6):
                question_key = f'question{i}'
                answer = data.get(question_key)

                if answer is None:
                    # Log a warning if an answer is missing
                    app.logger.warning(f"Answer missing for Question {i} from user {user.id}")
                else:
                    # Create a Depressive Disorder Answer object and add it to the database
                    depressive_answer = DepressiveDisorderAnswer(
                        user_id=user.id,
                        question=f"Question {i}",
                        answer=answer
                    )
                    db.session.add(depressive_answer)
                    db.session.commit()

            # If you have a similar count function for Depressive Disorder, you can use it here
            # For now, let's assume you have a function called count_no_answers_depressive
            no_count = count_no_answers_depressive(user.id, DepressiveDisorderAnswer)

            # If the count of "No" answers is greater than or equal to 3, redirect to the next page
            if no_count >= 3:
                return jsonify({"redirect": True})

            # Return a JSON response indicating that the quiz should not be shown
            return jsonify({"showQuiz": False})

        else:
            # Handle GET request, returning a JSON response indicating successful quiz submission
            return jsonify({"message": "Quiz submitted successfully",})

    # Redirect to the index page if the user is not logged in
    return redirect(url_for('index'))


# Count 'No' answers for Anxiety Quiz
def count_no_answers_anxiety(user_id, disorder_model):
    return disorder_model.query.filter_by(user_id=user_id, answer='no').count()

# Count 'No' answers for Anxiety Quiz
def count_no_answers_anxiety(user_id, disorder_model):
    return disorder_model.query.filter_by(user_id=user_id, answer='no').count()

# Anxiety Disorder Quiz Route
@app.route("/anxiety_quiz", methods=['POST'])
def anxiety_quiz():
    """Handle Anxiety Disorder Quiz."""
    print('In anxiety_quiz route')

    if 'email' in session:
        if request.method == 'POST':
            data = request.get_json()
            print('Received data:', data)

            user = User.query.filter_by(email=session['email']).first()

            for i in range(1, 6):
                question_key = f'question{i}'
                answer = data.get(question_key)

                if answer is None:
                    app.logger.warning(f"Answer missing for Question {i} from user {user.id}")
                else:
                    anxiety_answer = AnxietyDisorderAnswer(
                        user_id=user.id,
                        question=f"Question {i}",
                        answer=answer
                    )
                    db.session.add(anxiety_answer)
                    db.session.commit()

            no_count = count_no_answers_anxiety(user.id, AnxietyDisorderAnswer)

            if no_count >= 3:
                return jsonify({"redirect": True})

            return jsonify({"showQuiz": False})

    return redirect(url_for('index'))


# Comment Submission and Display Route
@app.route("/support", methods=['GET', 'POST'])
def support():
    # Check if user is logged in; if not, redirect to the index page
    if 'email' not in session:
        return redirect(url_for('index'))

    # Handling POST requests for submitting comments
    if request.method == 'POST':
        data = request.json  # Extract JSON data from the request
        comment_text = data.get('comment')  # Get the comment text from the JSON data
        user = User.query.filter_by(email=session['email']).first()  # Retrieve the user from the database

        if user:
            # Create a new comment object and add it to the database
            new_comment = Comment(user_id=user.id, comment=comment_text)
            db.session.add(new_comment)
            db.session.commit()

    # Retrieve all comments from the database, ordered by timestamp in descending order
    comments = Comment.query.order_by(Comment.timestamp.desc()).all()

    # Prepare comments data for response in JSON format
    comments_data = [
        {"id": comment.id, "user_id": comment.user_id, "comment": comment.comment, "timestamp": comment.timestamp}
        for comment in comments
    ]

    # Return the comments data in the response
    return jsonify({"comments": comments_data})

# Delete Comment Route
@app.route("/delete_comment/<int:comment_id>", methods=['POST'])
def delete_comment(comment_id):
    # Retrieve the comment object based on the comment_id
    comment = Comment.query.get(comment_id)

    # Check if the comment exists, delete it from the database, and commit the changes
    if comment:
        db.session.delete(comment)
        db.session.commit()

    # Redirect to the support route after deleting the comment
    return redirect(url_for('support'))


# logout
@app.route("/logout", methods=['POST'])
def logout():
    """Handle user logout."""

    # Check if the 'email' key exists in the session
    if 'email' in session:
        # If the 'email' key exists, remove it from the session (clear the user's session)
        session.pop('email', None)

    # Redirect the user to the home page after logout
    return redirect(url_for('index'))

# 404 Error Handling
@app.errorhandler(404)
def not_found(e):
    """Handle 404 errors by serving the React app."""
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(port=5000, debug=True)
