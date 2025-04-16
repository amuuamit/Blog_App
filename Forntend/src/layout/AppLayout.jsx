import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../component/CardComp"; // Assuming you have a BlogCard component for displaying blogs
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ArticleComponent from "../component/ArticleComponent";
import HeroSection from "../component/HeroSection";
import About from "../component/About";
import server from "../environment";

const AppLayout = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${server}/api/v1/blogs/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} article={blog} />
        ))}
      </div>
      <HeroSection />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
