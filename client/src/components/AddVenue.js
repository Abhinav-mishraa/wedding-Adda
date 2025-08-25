import React, { useState, useEffect } from "react";
import axios from "axios";
import './AddVenue.css';

const AddVenue = () => {
  const [venue, setVenue] = useState({
    name: "",
    location: "",
    capacity: "",
    price: "",
    imageUrl: "",
    description: "",
    phone: "",
    mapUrl: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if user is logged in when component loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleChange = (e) => {
    setVenue({ ...venue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first to add a venue!');
      return;
    }

    setLoading(true);
    console.log("Submitting:", venue);
    
    try {
      // Send request with authentication header
    const response = await axios.post(
  "https://wedding-adda-backend.onrender.com",
        venue,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Response:", response.data);
      
      if (response.data.success) {
        alert("Venue added successfully!");
        // Clear the form
        setVenue({ 
          name: "", 
          location: "", 
          capacity: "", 
          price: "", 
          imageUrl: "", 
          description: "", 
          phone: "", 
          mapUrl: "" 
        });
      } else {
        alert(response.data.error || "Failed to add venue");
      }
      
    } catch (err) {
      console.error("Error adding venue:", err);
      
      if (err.response?.status === 401) {
        alert('Your session has expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
      } else {
        alert(err.response?.data?.error || "Failed to add venue");
      }
    }
    
    setLoading(false);
  };

  // If user is not logged in, show login prompt
  if (!isLoggedIn) {
    return (
      <div className="form-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Please Login to Add Venue</h2>
          <p>You need to be logged in to add a venue to the platform.</p>
          <button 
            onClick={() => window.location.href = '/login'}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '20px'
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Add Venue</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Venue Name" 
          value={venue.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="location" 
          placeholder="Location" 
          value={venue.location} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="capacity" 
          placeholder="Capacity" 
          value={venue.capacity} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="price" 
          placeholder="Price" 
          value={venue.price} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="imageUrl" 
          placeholder="Image URL" 
          value={venue.imageUrl} 
          onChange={handleChange} 
        />
        
        <textarea 
          name="description" 
          placeholder="Description" 
          value={venue.description} 
          onChange={handleChange} 
        />
        <input 
          type="number" 
          name="phone" 
          placeholder="Phone Number" 
          value={venue.phone} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="mapUrl" 
          placeholder="Google Map Embed URL" 
          value={venue.mapUrl} 
          onChange={handleChange} 
          required
        />

        <button 
          type="submit" 
          disabled={loading}
          style={{
            backgroundColor: loading ? '#cccccc' : '#4CAF50',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Adding Venue...' : 'Add Venue'}
        </button>
      </form>
    </div>
  );
};

export default AddVenue;
 