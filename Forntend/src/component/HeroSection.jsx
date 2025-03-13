import React, { useContext, useEffect, useState } from 'react';
import CardComp from './CardComp';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import server from '../environment';

const HeroSection = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const router = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      console.log("User Hero ", user);
      fetchUserArticles(user._id);
    }
  }, [user]);

  const fetchUserArticles = async (userId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found in localStorage.");
      return;
    }

    try {
      const response = await axios.get(`${server}/api/v1/article/getPosts`, {
        params: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching user articles:", error);
    }
  };

  const handleRoute = () => {
    router('/article');
  };

  return (
    <div className='hero_container'>
      <h1>Hey {user ? user.first_name : "user"}! Create Your First Blog</h1>
      <div className='hero_content'>
        <p>Share your thoughts and ideas with the world
          <button onClick={handleRoute}>Get Started</button>
        </p>
        <img src="./news_Letter.jpg" alt="" />
      </div>
      <div className='card_container'>
        {articles.map((article) => (
          <CardComp key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;