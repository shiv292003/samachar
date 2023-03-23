import React from "react";
import { useRouter } from "next/router";
import img from "../Components/Alternate.png";

const NewsItem = (props) => {
  const url = `/${props.obj.title}`;
  // here using props.obj because in parent file object name is like this obj = {user}
  const router = useRouter();

  return (
    <div>
      <div className="card" style={{ width: "20rem" }}>
        <img
          className="card-img-top"
          src={
            !props.obj.urlToImage
              ? "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
              : props.obj.urlToImage
          }
          alt="News headline image"
        />
        <div className="card-body">
          <h5 className="card-title">{props.obj.title}</h5>
          <p className="card-text">{props.obj.content}</p>
          <p style={{ fontWeight: "500" }} className="card-text">
            {props.obj.source.name}
          </p>
          <h5
            onClick={() => {
              // console.log(url);
              router.push(url);
            }}
            className="btn btn-primary mr-4"
            style={{
              margin: "0px 10px 0 0",
            }}
          >
            Our Summary
          </h5>
          <a
            href={props.obj.url}
            className="btn btn-secondary"
            style={{
              margin: "0px 0 0 10px",
            }}
          >
            Visit Site
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
