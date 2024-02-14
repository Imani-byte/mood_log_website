import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '/home/naisiae/Development/code/Phase_4/trial2/client/src/styling/bipolarquiz.css';
import Possibleanxiety from './possibleanxiety';  // Update the import path

const AnxietyQuiz = () => {
    console.log('Rendering AnxietyQuiz');
    // State to manage form data and count of 'no' responses
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

    // useEffect to update 'noCount' whenever form data changes
    useEffect(() => {
        const count = Object.values(formData).filter(value => value === 'no').length;
        setNoCount(count);
    }, [formData]);

    // Handle change in form inputs
    const handleChange = (e) => {
        console.log('handleChange called');
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        try {
            // Send form data to server
            const response = await fetch('http://localhost:5000/anxiety_quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            if (response.ok) {
                // If submission successful, handle server response
                history.push('/possibleanxiety')  // Update the route accordingly
                console.log('Quiz submitted successfully');

                try {
                    const responseData = await response.json();
                    if (responseData.redirect) {
                        // Redirect logic based on the number of 'no' responses
                        if (noCount >= 3) {
                            setShowQuiz(false);
                            history.push('/inconclusive');  // Update the route accordingly
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
                <label htmlFor="question1">Question 1: Do you frequently experience excessive worry or fear about various aspects of your life, such as work, relationships, or health?</label>
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
                <label htmlFor="question2">Question 2: Do you often experience physical symptoms of anxiety, such as muscle tension, trembling, sweating, or a racing heart?</label>
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
                <label htmlFor="question3">Question 3: Do you find it challenging to engage in social situations due to fear of judgment, embarrassment, or criticism?</label>
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
                <label htmlFor="question4">Question 4: Have you ever experienced sudden and intense episodes of fear or discomfort, accompanied by physical symptoms like chest pain, dizziness, or a sense of impending doom?</label>
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
                <label htmlFor="question5">Question 5: Has anxiety significantly interfered with your ability to perform everyday tasks, meet responsibilities, or maintain relationships?</label>
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
                <Possibleanxiety />
            )}
        </div>
    );
};

export default AnxietyQuiz;
