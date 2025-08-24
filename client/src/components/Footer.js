 

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Footer.css';

// function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         {/* Top Section */}
//         <div className="footer-top">
//           <div className="footer-section">
//             <h3 className="footer-logo">Wedding Adda 💍</h3>
//             <p className="footer-tagline">Making your special day unforgettable</p>
//           </div>
          
//           <div className="footer-section">
//             <h4>Quick Links</h4>
//             <ul className="footer-links">
//               <li><Link to="/">Home</Link></li>
//               <li><Link to="/viewvenues">View Venues</Link></li>
//               <li><Link to="/Addfeedback">Feedback</Link></li>
//               <li><Link to="/register">Join Us</Link></li>
//             </ul>
//           </div>
          
//           <div className="footer-section">
//             <h4>Contact Info</h4>
//             <div className="contact-info">
//               <p>📧 info@weddingadda.com</p>
//               <p>📞 +91 9589106617</p>
//               <p>📍 Bhopal, Madhya Pradesh</p>
//             </div>
//           </div>
          
//           <div className="footer-section">
//             <h4>Follow Us</h4>
//             <div className="social-links">
//               <a href="#" aria-label="Facebook">📘</a>
//               <a href="#" aria-label="Instagram">📷</a>
//               <a href="www.linkedin.com/in/abhinav-mishra004" aria-label="Twitter">🐦</a>
//               <a href="#" aria-label="YouTube">📹</a>
//             </div>
//           </div>
//         </div>
        
//         {/* Bottom Section */}
//         <div className="footer-bottom">
//           <p>© 2025 Wedding Adda. All rights reserved.</p>
//           <p>Made with ❤️ by Abhinav Mishra</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const handleSocialClick = (platform) => {
  const urls = {
    Facebook: 'https://facebook.com/your-actual-page',      // ← Put your real Facebook URL here
    Instagram: 'https://instagram.com/your-actual-page',    // ← Put your real Instagram URL here  
    LinkedIn: ' www.linkedin.com/in/abhinav-mishra004' // ← Put your real LinkedIn URL here
  };
  
  if (urls[platform]) {
    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  }
};

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-section">
            <h3 className="footer-logo">Wedding Adda 💍</h3>
            <p className="footer-tagline">Making your special day unforgettable</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/viewvenues">View Venues</Link></li>
              <li><Link to="/Addfeedback">Feedback</Link></li>
              <li><Link to="/register">Join Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p><i className="fas fa-envelope"></i> info@weddingadda.com</p>
              <p><i className="fas fa-phone"></i> +91 9876543210</p>
              <p><i className="fas fa-map-marker-alt"></i> Bhopal, Madhya Pradesh</p>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <button 
                onClick={() => handleSocialClick('Facebook')}
                aria-label="Facebook"
                className="social-btn facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </button>
              <button 
                onClick={() => handleSocialClick('Instagram')}
                aria-label="Instagram"
                className="social-btn instagram"
              >
                <i className="fab fa-instagram"></i>
              </button>
              <button 
                onClick={() => handleSocialClick('LinkedIn')}
                aria-label="LinkedIn"
                className="social-btn linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>© 2025 Wedding Adda. All rights reserved.</p>
          <p>Made with ❤️ by Abhinav Mishra</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;