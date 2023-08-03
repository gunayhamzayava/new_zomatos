import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../components/Blog.css";
import "./Responsive__.css";
import "./Article.css";

function Article() {
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/article/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setBlog(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <>
      <div className="article">
        <img src={blog.image} alt="" />
        <h2>{blog.title}</h2>
        <p>{blog.created_date}</p>
        <p>{blog.description}</p>
        <h5>{blog.comments}</h5>
        <h4>{blog.question}</h4>
        <ul>
          <li>
            We were able to run the cluster on smaller machines resulting in{" "}
            <b>~75%</b> reduction in individual instances’ <b>CPU</b> and{" "}
            <b>Memory</b> requirements.
          </li>
          <li>
            We observed significant improvement in average and tail latencies.
          </li>
          <li>
            Smaller index per shard also improved <b>scale-up</b> time by{" "}
            <b>~20%</b>.
          </li>
        </ul>
        <div className="social__media">
          <a href="https://www.facebook.com" target="_blank">
            <div className="face">
              <i className="fa-brands fa-facebook-f"></i>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fblog.zomato.com%2Ffrom-the-streets-of-bharat"
            target="_blank"
          >
            <div className="linkedin">
              <i className="fa-brands fa-linkedin"></i>
            </div>
          </a>
          <a href="https://www.twitter.com" target="_blank">
            <div className="twitter">
              <i className="fa-brands fa-twitter"></i>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Article;
