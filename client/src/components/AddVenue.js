import React, { useState } from "react";
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
    phone:"",
    mapUrl:"",
  });

  const handleChange = (e) => {
    setVenue({ ...venue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", venue);
    try {
      await axios.post("http://localhost:5000/api/venues/add", venue);
      alert("Venue added successfully!");
      setVenue({ name: "", location: "", capacity: "", price: "", imageUrl: "" ,description: "", phone: "", mapUrl: ""});
    } catch (err) {
      console.error(err);
      alert("Failed to add venue");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Venue</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Venue Name" value={venue.name} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={venue.location} onChange={handleChange} required />
        <input type="number" name="capacity" placeholder="Capacity" value={venue.capacity} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={venue.price} onChange={handleChange} required />
        <input type="text" name="imageUrl" placeholder="Image URL" value={venue.imageUrl} onChange={handleChange} />
        
        <textarea name="description" placeholder="Description" value={venue.description} onChange={handleChange} />
        <input type="number" name="phone" placeholder="phone" value={venue.phone} onChange={handleChange} />
        <input type="text" name="mapUrl" placeholder="Google Map Embed URL" value={venue.mapUrl} onChange={handleChange} required/>

        <button type="submit">Add Venue</button>
      </form>
    </div>
  );
};

export default AddVenue;
