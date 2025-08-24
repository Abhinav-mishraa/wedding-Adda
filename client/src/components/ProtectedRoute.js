import React, { useState } from 'react';
import { useAuth } from './AuthContext';

// Protected Route Component - Only accessible to authenticated users
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Access Denied</h2>
        <p className="mb-4">You need to login to access this page.</p>
        <button 
          onClick={() => window.location.href = '/login'}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return children;
};

// Add Venue Component (Protected)
const AddVenue = () => {
  const { user, token } = useAuth();
  const [venue, setVenue] = useState({
    name: '',
    location: '',
    description: '',
    capacity: '',
    price: '',
    amenities: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setVenue({ ...venue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include JWT token
        },
        body: JSON.stringify(venue)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Venue added successfully!');
        setVenue({
          name: '',
          location: '',
          description: '',
          capacity: '',
          price: '',
          amenities: ''
        });
      } else {
        setMessage(data.error || 'Failed to add venue.');
      }
    } catch (err) {
      console.error('Add venue error:', err);
      setMessage('Network error. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Venue</h2>
      <p className="text-gray-600 mb-4 text-center">Logged in as: {user?.username}</p>

      {message && (
        <div className={`p-4 mb-4 rounded ${
          message.includes('successfully') 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Venue Name"
            value={venue.name}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={venue.location}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={venue.capacity}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="number"
            name="price"
            placeholder="Price per day"
            value={venue.price}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-4">
          <textarea
            name="description"
            placeholder="Description"
            value={venue.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-4">
          <input
            type="text"
            name="amenities"
            placeholder="Amenities (comma-separated)"
            value={venue.amenities}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600 cursor-pointer'
          } text-white`}
        >
          {loading ? 'Adding Venue...' : 'Add Venue'}
        </button>
      </form>
    </div>
  );
};

// Export both components
export { ProtectedRoute, AddVenue };
export default ProtectedRoute;