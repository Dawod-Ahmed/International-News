import "./App.css";
import { ScrollTopImg } from "./images/assets";
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import HideHeaderOnScroll from "react-headroom";
import Select from "react-select";
const App = () => {
  const pageSize = 5;
  const apiKey = "a4fc60c5601c4a11bde67e542e7cfa63";
  const [progress, setProgress] = useState(0);
  const [countrynews, setCountrynews] = useState("in");

  const scrolltotop = () => {
    window.scrollTo(0, 0);
  };
  window.addEventListener("scroll", function () {
    var scroll = document.querySelector(".scrollBar-Top");
    scroll.classList.toggle("active-scrollToTop", window.scrollY > 300);
  });

  const countries = [
    { label: "United Arab Emirates", iso: "ae" },
    { label: "United States", iso: "us" },
    { label: "Germany", iso: "de" },
    { label: "Russia", iso: "ru" },
    { label: "India", iso: "in" },
    { label: "Australia", iso: "au" },
    { label: "Canada", iso: "ca" },
    { label: "China", iso: "cn" },
    { label: "Switzerland", iso: "ch" },
    { label: "Brazil", iso: "br" },
    { label: "Austria", iso: "at" },
    { label: "Colombia", iso: "co" },
    { label: "Venezuela", iso: "ve" },
    { label: "Belgium", iso: "be" },
    { label: "Bulgaria", iso: "bg" },
    { label: "Cuba", iso: "cu" },
    { label: "Czech", iso: "cz" },
  ];

  const changeCountryNews = (value) => {
    setCountrynews(value.iso);
    //   console.log("Renderd again")
    // window.location.reload(true);
  };

  return (
    <div>
      <img
        src={ScrollTopImg}
        alt="img"
        className="scrollBar-Top"
        onClick={scrolltotop}
      />

      <Router>
        <HideHeaderOnScroll>
          <NavBar />
        </HideHeaderOnScroll>
        <div className="countrychange-div-parent d-flex ms-auto align-items-center">
          <p className="fw-bold mb-0">Country News &nbsp;&nbsp;</p>
          <Select
            options={countries}
            className=""
            onChange={(value) => {
              changeCountryNews(value);
            }}
          />{" "}
        </div>
        <LoadingBar
          height={3}
          color="#f11946"
          progress={progress}
          className="progressBarLoading"
        />
        <Switch>
          <Route exact path="/">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="general"
              pageSize={pageSize}
              country={countrynews}
              category="general"
            />
          </Route>
          <Route exact path="/business">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="business"
              pageSize={pageSize}
              country={countrynews}
              category="business"
            />
          </Route>
          <Route exact path="/entertainment">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="entertainment"
              pageSize={pageSize}
              country={countrynews}
              category="entertainment"
            />
          </Route>
          <Route exact path="/general">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="general"
              pageSize={pageSize}
              country={countrynews}
              category="general"
            />
          </Route>
          <Route exact path="/health">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="health"
              pageSize={pageSize}
              country={countrynews}
              category="health"
            />
          </Route>
          <Route exact path="/science">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="science"
              pageSize={pageSize}
              country={countrynews}
              category="science"
            />
          </Route>
          <Route exact path="/sports">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="sports"
              pageSize={pageSize}
              country={countrynews}
              category="sports"
            />
          </Route>
          <Route exact path="/technology">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="technology"
              pageSize={pageSize}
              country={countrynews}
              category="technology"
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
