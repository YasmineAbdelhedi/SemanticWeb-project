import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../public/logo.png';

const Navbar = () => {
  // Inline styles for the navbar
  const navbarStyle = {
    background: 'rgb(0,100,0)', /* Dark transparent background */
    backgroundImage: 'url(/assets/sport-background.jpg)', /* Background Image */
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    color: 'white',
  };

  const logoStyle = {
    width: '170px', /* Adjusted to a more reasonable size */
    height: '40px', /* Adjusted to a more reasonable size */
    objectFit: 'contain',
  };

  const titleStyle = {
    fontSize: '24px',
    color: '#fff',
    marginLeft: '10px',
  };

  const linkStyle = {
    color: '#fff',
    fontSize: '18px',
    textTransform: 'uppercase',
  };

  const linkHoverStyle = {
    color: '#f1c40f', /* Highlight color on hover */
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark w-100" style={navbarStyle}>
        <div className="container-fluid">
          <Link className="navbar-brand sport-logo" to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={img} 
              alt="Sportify Logo" 
              style={logoStyle} 
            />
            <span style={titleStyle}>Sportify</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" style={{ backgroundColor: '#fff' }}></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  to="/users" 
                  style={linkStyle}
                  onMouseOver={(e) => e.target.style.color = linkHoverStyle.color} 
                  onMouseOut={(e) => e.target.style.color = linkStyle.color}>
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  to="/installations" 
                  style={linkStyle}
                  onMouseOver={(e) => e.target.style.color = linkHoverStyle.color} 
                  onMouseOut={(e) => e.target.style.color = linkStyle.color}>
                  Installations
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  to="/reservations" 
                  style={linkStyle}
                  onMouseOver={(e) => e.target.style.color = linkHoverStyle.color} 
                  onMouseOut={(e) => e.target.style.color = linkStyle.color}>
                  Reservations
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  to="/payments" 
                  style={linkStyle}
                  onMouseOver={(e) => e.target.style.color = linkHoverStyle.color} 
                  onMouseOut={(e) => e.target.style.color = linkStyle.color}>
                  Payments
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  to="/equipment" 
                  style={linkStyle}
                  onMouseOver={(e) => e.target.style.color = linkHoverStyle.color} 
                  onMouseOut={(e) => e.target.style.color = linkStyle.color}>
                  Equipment
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
