import Layout from "@/Components/Layout";
import axios from "axios";
import NewsItem from "@/Components/NewsItem";
import CategoryStyle from "../styles/Category.module.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "../Components/Search1.png";
import loadingImg from "../Components/giphy1.gif";
import LoadingComp from "../Components/Loading";

// News API credentials
const API_KEY = "1606a73c988e4b63b2f84de57dab8ef2";
const PageSz = 9;
const API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;

// Component that displays news articles and categories
export default function Index({ users }) {
  // State variables
  const [API_input, setAPI_input] = useState(users.articles); // holds the list of news articles
  const [searchTerm, setSearchTerm] = useState(""); // holds the search query entered by the user
  const [page, setPage] = useState(1);
  const [check, setCheck] = useState(1);
  const [category, setCategory] = useState("");
  const [articleCnt, setArticlesCnt] = useState(users.articlesCnt);
  const [loading, setLoading] = useState(false);

  // Function that changes the news category
  const changeCategory = async (title) => {
    setLoading(true);
    const response = await axios.get(
      `${API_URL}&pageSize=${PageSz}&category=${title}`
    );
    setLoading(false);
    // console.log(response.data.articles);
    setCategory(title);
    setCheck(1);
    setAPI_input(response.data.articles);
    setArticlesCnt(response.data.totalResults);
    setPage(1);
  };

  // Function that searches for news articles based on the user's query
  const searchNews = async (title) => {
    setLoading(true);
    const response = await axios.get(
      `${API_URL}&pageSize=${PageSz}&q=${title}`
    );
    setLoading(false);
    setCheck(2);
    setAPI_input(response.data.articles);
    setArticlesCnt(response.data.totalResults);
    setPage(1);
  };

  //run to check results from API
  // console.log(users.articlesCnt, "ans");
  // console.log(users.articles, "ans");

  // JSX code for rendering the component
  const handlePrevClick = async () => {
    setPage(page - 1);
    let modifiedAPI = `${API_URL}&pageSize=${PageSz}`;
    {
      modifiedAPI =
        check == 1
          ? `${modifiedAPI}&category=${category}&page=${page}`
          : `${modifiedAPI}&q=${searchTerm}&page=${page}`;
    }
    setLoading(true);
    const response = await axios.get(modifiedAPI);
    setLoading(false);
    setAPI_input(response.data.articles);
  };

  const handleNextClick = async () => {
    if (page + 1 > Math.ceil(articleCnt / PageSz)) {
    } else {
      setPage(page + 1);
      let modifiedAPI = `${API_URL}&pageSize=${PageSz}`;
      {
        modifiedAPI =
          check == 1
            ? `${modifiedAPI}&category=${category}&page=${page + 1}`
            : `${modifiedAPI}&q=${searchTerm}&page=${page + 1}`;
      }
      setLoading(true);
      const response = await axios.get(modifiedAPI);
      setLoading(false);
      setAPI_input(response.data.articles);
    }
  };

  return (
    <Layout>
      {/* Search bar */}
      <div className="container" style={{ marginTop: "30px" }}>
        <div className={CategoryStyle.search}>
          <input
            className={CategoryStyle.search_input}
            //here we r updating only searchTerm useState val as user is currently writing he is not yet finished
            placeholder="Search for news"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Image
            src={img}
            width="27"
            height="30"
            style={{ cursor: "pointer" }}
            alt="searchIcon"
            onClick={() => {
              searchNews(searchTerm);
            }}
          ></Image>
        </div>
      </div>

      {/* Categories */}
      <div>
        <div className={CategoryStyle.space}>
          <h2 className="container">
            <u>Categories</u>
          </h2>
        </div>
        <div className="container">
          <p
            className={CategoryStyle.shine}
            onClick={(e) => {
              changeCategory(e.target.innerHTML.toLowerCase());
            }}
          >
            General
          </p>
          <p
            className={CategoryStyle.shine}
            onClick={(e) => {
              changeCategory(e.target.innerHTML.toLowerCase());
            }}
          >
            Science
          </p>
          <p
            className={CategoryStyle.shine}
            onClick={(e) => {
              changeCategory(e.target.innerHTML.toLowerCase());
            }}
          >
            Sports
          </p>
          <p
            className={CategoryStyle.shine}
            onClick={(e) => {
              changeCategory(e.target.innerHTML.toLowerCase());
            }}
          >
            Technology
          </p>
          <p
            className={CategoryStyle.shine}
            onClick={(e) => {
              changeCategory(e.target.innerHTML.toLowerCase());
            }}
          >
            Business
          </p>
          <p
            className={CategoryStyle.shine}
            onClick={(e) => {
              changeCategory(e.target.innerHTML.toLowerCase());
            }}
          >
            Entertainment
          </p>
          <p
            className={CategoryStyle.shine}
            onClick={(e) => {
              changeCategory(e.target.innerHTML.toLowerCase());
            }}
          >
            Health
          </p>
        </div>
      </div>

      <div className="container my-3">
        <h2>
          <u>Our Top Headlines</u>
        </h2>
        {/*Checking length of input so that we can show no result found */}
        {loading && <LoadingComp />}
        {API_input?.length > 0 ? (
          <div className="row">
            {!loading &&
              API_input.map((user) => (
                <div className="col-md-3 p-4" key={user.url}>
                  <NewsItem obj={user} />
                </div>
              ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No news found</h2>
          </div>
        )}
      </div>

      <div className="container d-flex justify-content-between p-5">
        <button
          type="button"
          className="btn btn-dark"
          onClick={handlePrevClick}
          disabled={page <= 1}
        >
          &larr; Prev
        </button>
        <button
          type="button"
          className="btn btn-dark"
          disabled={page + 1 > Math.ceil(articleCnt / PageSz)}
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const { data } = await axios.get(`${API_URL}&pageSize=${PageSz}`);
    // console.log(data);
    return {
      //here we are using only data from object
      props: {
        users: {
          articles: data.articles,
          articlesCnt: data.totalResults,
        },
      },
    };
  } catch (error) {}
}
