import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '/home/naisiae/Development/code/Phase_4/trial2/client/src/styling/bipolarquiz.css';
import PossibleBipolar from '/home/naisiae/Development/code/Phase_4/trial2/client/src/components/possiblebipolar.js'


const BipolarQuiz = () => {
    console.log('Rendering BipolarQuiz');
    const [formData, setFormData] = useState({
       question1: '',
       question2: '',
       question3: '',
       question4: '',
       question5: '',
  });
  
  const [noCount, setNoCount] = useState(0); // State to manage the count of "No" answers
  const [showQuiz, setShowQuiz] = useState(true);
  const history = useHistory();

  useEffect(() => {
    // Update the noCount state when formData changes
    const count = Object.values(formData).filter(value => value === 'no').length;
    setNoCount(count);
  }, [formData]);

  const handleChange = (e) => {
    console.log('handleChange called');
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        try {
            const response = await fetch('http://localhost:5000/bipolar_quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include', // Include credentials (cookies) in the request
            });

            if (response.ok) {
                history.push('/possiblebipolar')
                console.log('Quiz submitted successfully');

    try {
        const responseData = await response.json();
        if (responseData.redirect) {
            // Redirect logic
            if (noCount >= 3) {
                setShowQuiz(false);
                history.push('/depressive_quiz');
                console.log('next page was gotten');
            }
        }
    } catch (error) {
        console.error('Error parsing JSON response', error);
        // Handle HTML response here
        // For example, you might display an error message to the user
    }
} else {
    console.error('Failed to submit quiz');
    // Handle failure, e.g., show an error message
}
} catch (error) {
console.error('Error submitting quiz', error);
// Handle error, e.g., show an error message
}
};
    
      

  return (
    <div >
        <header className='quizbanner'>
            <h1>Welcome to the quiz</h1>
            <p>scroll bellow for the test</p>
        </header>
        <div className="container">
      {showQuiz ? (
      <form onSubmit={handleSubmit}>
        <label htmlFor="question1">Question 1: Have you experienced periods where your mood was extremely elevated, characterized by heightened energy levels, increased self-esteem, and a decreased need for sleep?</label>
        <div>
            <input
            type="radio"
            name="question1"
            value="yes"
            checked={formData.question1 === 'yes'}
            onChange={handleChange}
            required
            />
        <label htmlFor="question1">Yes</label>
        </div>
        <div>
            <input
            type="radio"
            name="question1"
            value="no"
            checked={formData.question1 === 'no'}
            onChange={handleChange}
            required
            />
        <label htmlFor="question1">No</label>
        </div>
        <label htmlFor="question2">Question 2: Have you gone through extended periods of deep sadness or hopelessness, where even routine tasks feel overwhelming?</label>
        <div>
            <input
            type="radio"
            name="question2"
            value="yes"
            checked={formData.question2 === 'yes'}
            onChange={handleChange}
            required
            />
        <label htmlFor="question2">Yes</label>
        </div>
        <div>
            <input
            type="radio"
            name="question2"
            value="no"
            checked={formData.question2 === 'no'}
            onChange={handleChange}
            required
            />
        <label htmlFor="question2">No</label>
        </div>
        <label htmlFor="question3">Question 3: Have you noticed sudden and unexplained shifts in your mood from extreme highs to extreme lows?</label>
        <div>
            <input
            type="radio"
            name="question3"
            value="yes"
            checked={formData.question3 === 'yes'}
            onChange={handleChange}
            required
            />
        <label htmlFor="question3">Yes</label>
        </div>
        <div>
            <input
            type="radio"
            name="question3"
            value="no"
            checked={formData.question3 === 'no'}
            onChange={handleChange}
            required
            />
        <label htmlFor="question3">No</label>
        </div>
        <label htmlFor="question4">Question 4: Do you often find yourself with a surplus of energy and an increased drive to accomplish goals during certain periods?</label>
        <div>
            <input
            type="radio"
            name="question4"
            value="yes"
            checked={formData.question4 === 'yes'}
            onChange={handleChange}
            required
            />
        <label htmlFor="question4">Yes</label>
        </div>
        <div>
            <input
            type="radio"
            name="question4"
            value="no"
            checked={formData.question4 === 'no'}
            onChange={handleChange}
            required
            />
        <label htmlFor="question4">No</label>
        </div>
        <label htmlFor="question5">Question 5: Have you noticed changes in your sleep patterns, such as a decreased need for sleep during manic episodes or difficulty sleeping during depressive episodes?</label>
        <div>
            <input
            type="radio"
            name="question5"
            value="yes"
            checked={formData.question5 === 'yes'}
            onChange={handleChange}
            required
            />
        <label htmlFor="question5">Yes</label>
        </div>
        <div>
            <input
            type="radio"
            name="question5"
            value="no"
            checked={formData.question5 === 'no'}
            onChange={handleChange}
            required
            />
        <label htmlFor="question5">No</label>
        </div>

        <input type="submit" value="Submit" />
      </form>
      ) : (
        <PossibleBipolar />
      )}
      </div>
    </div>
  );
};

export default BipolarQuiz;
