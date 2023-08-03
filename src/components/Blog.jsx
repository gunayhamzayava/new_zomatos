import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Responsive__.css";
import "./Blog.css";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:8000/blogs/")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        console.log(data);
      });
  }, [id]);

  return (
    <div className="mainss">
      <div className="zomato-header-img">
        <img src="https://b.zmtcdn.com/data/file_assets/621862abf874a7c2be8fdd6d062ca67a1678705718.webp" />
        <ul>
          <li style={{ borderBottom: "1px solid rgb(255,0,45)" }}>
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
          <li>
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
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
