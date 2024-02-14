// Importing necessary React hooks and external dependencies
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Importing CSS file for styling
import '/home/naisiae/Development/code/Phase_4/trial2/client/src/styling/support.css';

// Functional component for the Support section
function Support() {
  // State variables to manage comments and the new comment input
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // useCallback to memoize the fetchComments function for optimization
  const fetchComments = useCallback(async () => {
    try {
      // Fetching comments from the server using Axios
      const response = await axios.get('http://localhost:5000/support', { withCredentials: true });
      console.log(response.data);
      // Updating the state with the fetched comments
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, []);

  // useEffect hook to fetch comments when the component mounts
  useEffect(() => {
    // Function to fetch data (comments) and handle errors
    const fetchData = async () => {
      try {
        await fetchComments();
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    // Calling fetchData when the component mounts
    fetchData();

    // Adding fetchComments as a dependency to useEffect
  }, [fetchComments]);

  // Event handler for adding a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      // Sending a POST request to add a new comment
      const response = await axios.post(
        'http://localhost:5000/support',
        { comment: newComment },
        { withCredentials: true }
      );
      // Updating the state with the updated comments and clearing the input
      setComments(response.data.comments);
      console.log(response.data);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Event handler for deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      // Sending a POST request to delete a comment
      await axios.post(`http://localhost:5000/delete_comment/${commentId}`, { withCredentials: true });
      // Refetching comments after deletion
      await fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // JSX structure for rendering the Support component
  return (
    <div className='commentcontainer'>
      <h1>Comments</h1>

      {/* Form for adding new comments */}
      <form className='comment-form' onSubmit={handleAddComment}>
        <label htmlFor="comment">Add a comment:</label>
        <input
          type="text"
          name="comment"
          required
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {/* List to display existing comments */}
      <ul className='comment-list'>
        {comments && comments.map((comment) => (
          <li className='comment' key={comment.id}>
            {/* Displaying user's full name, comment, and timestamp */}
            <div className='comment-user'>
               {comment.full_name}:
            </div>
            {comment.comment} - {comment.timestamp}

            {/* Button to delete the comment */}
            <div className='comment-actions'>
              <button className='delete-button' onClick={() => handleDeleteComment(comment.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Exporting the Support component as the default export
export default Support;

