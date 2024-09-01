import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDribbble, FaEnvelope, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const MainPage = () => {
  const navigate = useNavigate();

 

  const navigateToFacultyLogin = () => {
    navigate('/login');
  };

  const imageUrl = "https://www.veltech.edu.in/faculty/assets/images/Full-Campus.jpg"; 
  const logoUrl = 'http://ts1.mm.bing.net/th?id=OIP.fQeA69zTW0ljn5rNIiqb4AAAAA&pid=15.1';

  return (
    <div className="flex flex-col min-h-screen"> 
      <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center"> 
        <img src={logoUrl} alt="Your Logo" className="h-13 w-20" /> 
        <div className="space-x-4">
          
          <button 
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110" 
            onClick={navigateToFacultyLogin}
          >
            Faculty
          </button>
        </div>
      </header>

      <main 
        className="flex flex-col items-center justify-center flex-grow relative" 
        style={{ 
          backgroundImage: `url(${imageUrl})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        <div className="text-center mt-1 mb-20"> 
          <h1 className="text-4xl md:text-6xl font-bold text-black font-serif"> 
            Faculty Management System
          </h1> 
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <h3 className="text-lg md:text-xl font-semibold mr-4 text-yellow-400">Get in Touch</h3> 
        <div className="flex space-x-4">
          <a href="https://www.instagram.com/ascendioninc/" className="text-gray-300 hover:text-yellow-400 text-xl transition duration-300"> 
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/your_profile" className="text-gray-300 hover:text-yellow-400 text-xl transition duration-300">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/your_handle" className="text-gray-300 hover:text-yellow-400 text-xl transition duration-300">
            <FaTwitter />
          </a>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <FaDribbble className="text-yellow-400 mr-2 text-xl" /> 
          <a href="https://ascendion.com/" className="text-gray-300 hover:text-yellow-400 no-underline transition duration-300">
            ascendion.com/example
          </a>
        </div>
        <div className="flex items-center">
          <FaEnvelope className="text-yellow-400 mr-2 text-xl" /> 
          <a href="mailto:contact@example.com" className="text-gray-300 hover:text-yellow-400 no-underline transition duration-300">
            contact@ascendion.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default MainPage;