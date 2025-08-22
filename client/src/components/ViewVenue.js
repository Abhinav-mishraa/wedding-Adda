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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        
        const response = await axios.get(`${API_URL}/api/venues`);
        console.log('API Response:', response.data); // Debug log
        
        // Handle new response format from updated backend
        let venuesData = [];
        if (response.data.success && response.data.venues) {
          // New format: { success: true, venues: [...] }
          venuesData = response.data.venues;
        } else if (Array.isArray(response.data)) {
          // Old format: direct array
          venuesData = response.data;
        } else {
          console.warn('Unexpected response format:', response.data);
          venuesData = [];
        }
        
        setVenues(venuesData);
        setFilteredVenues(venuesData);
        
        // Extract unique locations for dropdown
        const uniqueLocations = [...new Set(venuesData.map(v => v.location))].filter(Boolean);
        setAllLocations(uniqueLocations);
        
        setError("");
      } catch (err) {
        console.error("Error fetching venues:", err);
        setError("Failed to fetch venues. Please try again.");
        setVenues([]);
        setFilteredVenues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
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

  // Show loading state
  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading venues...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
        {filteredVenues && filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <div key={venue._id} className="border rounded-xl p-4 shadow-lg">
              {/* Image with proper error handling */}
              <img
                src={venue.image || venue.imageUrl || "https://via.placeholder.com/400x300?text=No+Image"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                }}
                alt={venue.name}
                className="venue-card"
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />

              {/* Map section */}
              {venue.mapUrl && (
                <div className="venue-map">
                  <iframe 
                    src={venue.mapUrl} 
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }}
                    allowFullScreen="" 
                    loading="lazy" 
                    title="Venue Location"
                  />
                </div>
              )}
             
              <h2 className="text-xl font-bold">{venue.name}</h2>
              <p className="text-gray-700">Price: ₹{venue.price}</p>
              <p className="text-gray-700">{venue.description}</p>
              <p className="text-gray-600">📞 {venue.phone}</p>
              <p className="text-gray-600">📍 {venue.location}</p>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', gridColumn: '1 / -1' }}>
            <p>No venues found. {venues.length === 0 ? 'Add some venues to get started!' : 'Try adjusting your filters.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewVenues;