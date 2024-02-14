# mood_log_website

## Application Description
This Flask application serves as a mental health quiz platform. Users can sign up, log in, and participate in quizzes related to Bipolar Disorder, Depressive Disorder, and Anxiety Disorder. The backend is implemented using Flask, Flask-SQLAlchemy for database management, Flask-Migrate for database migrations, and Faker for generating fake data.

## Components
The frontend of the application is built using React and includes the following components:

- Landing: Initial landing page.
- Signup: User registration component.
- Login: User login component.
- Support: Component for submitting and displaying user comments.
- Logout: Component for handling user logout.
- BipolarQuiz: Component for the Bipolar Disorder quiz.
- PossibleBipolar: Component displaying possible outcomes for Bipolar Disorder.
- DepressiveQuiz: Component for the Depressive Disorder quiz.
- PossibleDepression: Component displaying possible outcomes for Depressive Disorder.
- AnxietyQuiz: Component for the Anxiety Disorder quiz.
- PossibleAnxiety: Component displaying possible outcomes for Anxiety Disorder.
- Inconclusive: Component displaying an inconclusive outcome.

## To setup Backend
1. Install required Python packages using Pipenv install.
2. Activate the virtual environment with pipenv shell
3. cd into server. Run the Flask application python app.py

## To setup Frontend
1. Ensure you have Node.js and npm installed. cd into client and run npm install in the terminal
2. start the React development server with npm start

## How does the website work
- Open the application in a web browser.
- Sign up or log in to access the quizzes.
- Complete the quizzes for Bipolar Disorder, Depressive Disorder, or Anxiety Disorder.
- View possible outcomes based on quiz results.
- Submit comments for support.
- Log out when finished.
