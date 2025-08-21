import React, { useState } from "react";
import axios from "axios";
import './AddFeedback.css';

const AddFeedback = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback", feedback);
      alert("Feedback submitted successfully!");
      setFeedback({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Failed to submit feedback.");
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={feedback.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={feedback.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Feedback" value={feedback.message} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddFeedback;
