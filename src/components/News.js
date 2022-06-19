import React, { useEffect, useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

const News = (props) => {
  // const [countrynews, setCountrynews] = useState();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - International News`;
    updateNews();
    // eslint-disable-next-line
  }, []);
  const onSelectChange = (selectedOption) => {
    // console.log("Testing---");
    console.log("Testing---", selectedOption);
  };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  // const countries = [
  //   { Country: "United Arab Emirates", ISO: "ae" },
  //   { Country: "India", ISO: "in" },
  //   { countrynews: "Netflix", value: 3 },
  //   { country: "Tesla", value: 4 },
  //   { country: "Amazon", value: 5 },
  //   { country: "Alphabet", value: 6 },
  // ];

  return (
    <>
      <h1 className="text-center news-heading mx-auto mb-5">
        International News - Top {capitalizeFirstLetter(props.category)}{" "}
        Headlines
      </h1>
      {/* <Select options={countries} onChange={(value)=>{setCountrynews(value.ISO)}} /> */}
      {/* <select
        class="custom-select custom-select-lg mb-3"
        onChange={() => {
          console.log("Testing---");
        }}
      >
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select> */}

      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row justify-content-center">
            {articles.map((element) => {
              return (
                <>
                  {element.urlToImage ? (
                    <div
                      className="col-md-4 card-parent my-3 "
                      key={element.url}
                    >
                      <NewsItem
                        title={element.title ? element.title : ""}
                        description={
                          element.description ? element.description : ""
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  ) : null}
                </>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

// News.defaultProps = {
//   country: "ae",
//   pageSize: 8,
//   category: "general",
// };

// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
// };

export default News;
