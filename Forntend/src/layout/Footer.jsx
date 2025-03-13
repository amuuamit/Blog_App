import React from 'react';
import { NavLink } from 'react-router-dom';
import CopyrightIcon from '@mui/icons-material/Copyright';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const footerContact = [
    {
      icon: <CopyrightIcon />,
      title: 'Find us',
      details: 'Mumbai, Maharashtra',
    },
    {
      icon: <CallIcon />,
      title: 'Call us',
      details: '8378027947',
    },
    {
      icon: <EmailIcon />,
      title: 'Mail us',
      details: 'yadavamit8968@gmail.com',
    },
  ];

  return (
    <footer className="footer-section">
      <div className="container grid grid-three-cols">
        {footerContact.map((currData, index) => {
          const { icon, title, details } = currData;
          return (
            <div className="footer-contact" key={index}>
              <div className="icon">{icon}</div>
              <div className="footer-contact-text">
                <p>{title}</p>
                <p>{details}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="copyright-area">
        <div className="container">
          <div className="grid grid-two-cols">
            <div className="copyright-text">
              <p>
                Copyright &copy; 2024, All Rights Reserved
                <NavLink to="/"> Amit Yadav </NavLink>
              </p>
            </div>

            <div className="footer-menu">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;