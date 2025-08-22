// import React, { useState } from "react";
// import axios from "axios";

// const Register = () => {
//   const [user, setUser] = useState({ username: "", email: "", password: "" });

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/auth/register", user);
//       alert("Registered successfully!");
//     } catch (err) {
//       alert("Registration failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
//       <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//       <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//       <button type="submit">Register</button>
//     </form>
//   );
// };
import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Debug: Log what we're sending
    console.log("Sending registration data:", user);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log("Registration response:", data);
      
      if (response.ok) {
        setMessage("Registration successful! You can now login.");
        // Clear form
        setUser({ username: "", email: "", password: "" });
      } else {
        setMessage(data.error || "Registration failed. Please try again.");
      }
      
    } catch (err) {
      console.error("Registration error:", err);
      setMessage("Network error. Please check if your server is running.");
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      
      {message && (
        <div className={`p-4 mb-4 rounded ${
          message.includes('successful') 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div>
        <div className="mb-4">
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={user.username}
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={user.email}
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <input 
            type="password" 
            name="password" 
            placeholder="Password (min 6 chars)" 
            value={user.password}
            onChange={handleChange} 
            required 
            minLength={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
          } text-white`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
    </div>
  );
};
export default Register;
