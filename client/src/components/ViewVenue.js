 

// export default ViewVenues;
import React, { useState, useEffect } from "react";
import axios from "axios";
import './ViewVenues.css';


function ViewVenues() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/venues")
      .then((res) => {
        setVenues(res.data);
        setFilteredVenues(res.data);

        // Extract unique locations for dropdown
        const uniqueLocations = [...new Set(res.data.map(v => v.location))];
        setAllLocations(uniqueLocations);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilter = () => {
    let filtered = venues;

    if (searchTerm) {
      filtered = filtered.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minPrice !== "") {
      filtered = filtered.filter(v => parseInt(v.price) >= parseInt(minPrice));
    }

    if (maxPrice !== "") {
      filtered = filtered.filter(v => parseInt(v.price) <= parseInt(maxPrice));
    }

    if (location !== "") {
      filtered = filtered.filter(v => v.location === location);
    }

    setFilteredVenues(filtered);
  };

  return (
   <div className="container">

  
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Locations</option>
          {allLocations.map((loc, index) => (
            <option key={index} value={loc}>{loc}</option>
          ))}
        </select>

        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply Filter
        </button>
      </div>

      <div className="venue-grid">
        {filteredVenues.map((venue) => (
          <div key={venue._id} className="border rounded-xl p-4 shadow-lg">
            {/* <img src={venue.image} alt={venue.name} className="venue-card" /> */}
            <img
  src={venue.imageUrl || "https://i.imgur.com/BkIYh6A.jpg"}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://i.imgur.com/BkIYh6A.jpg";
  }}
  alt={venue.name}
  className="venue-card"
/>

<div className="venue-map"> <iframe src={venue.mapUrl} width="100%" height="300" style={{ border: 0 }}allowFullScreen="" loading="lazy" title="Venue Location"></iframe> </div>

           
            <h2 className="text-xl font-bold">{venue.name}</h2>
            <p className="text-gray-700">Price: ₹{venue.price}</p>
            <p className="text-gray-700">{venue.description}</p>
            <p className="text-gray-600">📞 {venue.phone}</p>
            <p className="text-gray-600">📍 {venue.location}</p>
          </div>
        ))}
      </div>
    </div>
   
  );
}

export default ViewVenues;
