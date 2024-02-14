import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '/home/naisiae/Development/code/Phase_4/trial2/client/src/styling/bipolarquiz.css';
import Possibledepression from './posibledepression';

const DepressiveQuiz = () => {
    console.log('Rendering DepressiveQuiz');
    const [formData, setFormData] = useState({
       question1: '',
       question2: '',
       question3: '',
       question4: '',
       question5: '',
    });

    const [noCount, setNoCount] = useState(0);
    const [showQuiz, setShowQuiz] = useState(true);
    const history = useHistory();

    useEffect(() => {
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
            const response = await fetch('http://localhost:5000/depressive_quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            if (response.ok) {
                history.push('/possibledepression')
                console.log('Quiz submitted successfully');

                try {
                    const responseData = await response.json();
                    if (responseData.redirect) {
                        // Redirect logic
                        if (noCount >= 3) {
                            setShowQuiz(false);
                            history.push('/anxiety_quiz');  // Update the route accordingly
                        }
                    }
                } catch (error) {
                    console.error('Error parsing JSON response', error);
                }
            } else {
                console.error('Failed to submit quiz');
            }
        } catch (error) {
            console.error('Error submitting quiz', error);
        }
    };

    return (
        <div className="container">
            <h1>Please answer the following questions</h1>
            {showQuiz ? (
                <form onSubmit={handleSubmit}>
                <label htmlFor="question1">Question 1: Have you experienced a persistent feeling of sadness or emptiness for most of the day, nearly every day?</label>
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
                <label htmlFor="question2">Question 2: Have you lost interest or pleasure in activities that you once enjoyed?</label>
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
                <label htmlFor="question3">Question 3: Do you have significant changes in appetite or weight (significant weight loss or gain)?</label>
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
                <label htmlFor="question4">Question 4: Have you noticed changes in your sleep patterns, such as difficulty falling asleep, staying asleep, or sleeping too much?</label>
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
                <label htmlFor="question5">Question 5: Do you feel fatigued or have a lack of energy, even after getting enough rest?</label>
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
                <Possibledepression />
            )}
        </div>
    );
};

export default DepressiveQuiz;

