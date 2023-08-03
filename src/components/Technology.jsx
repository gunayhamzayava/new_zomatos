import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Responsive__.css";

function Technology() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/blogs/?category=technology")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        console.log(data);
      });
  }, []);
  return (
    <div className="mains">
      <div className="zomato-header-img">
        <img src="https://b.zmtcdn.com/data/file_assets/621862abf874a7c2be8fdd6d062ca67a1678705718.webp" />
        <ul>
          <li>
            <Link to={"/blog"}>All Categories</Link>
          </li>
          <li>
            <Link to={"/community"}>Community</Link>
          </li>
          <li>
            <Link to={"/company"}>Company</Link>
          </li>
          <li>
            <Link to={"/culture"}>Culture</Link>
          </li>
          <li style={{ borderBottom: "1px solid rgb(255,0,45)" }}>
            <Link to={"/technology"}>Technology</Link>
          </li>
        </ul>
      </div>
      <br />
      <div className="blog-map">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog__one">
            <Link to={`/blog/${blog.id}`}>
              <div>
                <img src={blog.image} alt="" />
              </div>
              <br />
              <div>
                <p>{blog.category}</p>
                <h4>{blog.title}</h4>
                <p>{blog.created_date}</p>
                <span>{blog.description}</span>
                <p>{blog.category}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Technology;
