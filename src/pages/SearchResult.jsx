import { useState, useEffect, useRef, useContext } from "react";
import { ResultContext } from "../utils/resultContext";
import { ImageContext } from "../utils/imageContext";
import "./searchResult.css";
import background_img from "../assets/background.jpg";

import Navbar from "../components/navbar/navbar";

function SearchResult() {
  const { results, setResults } = useContext(ResultContext);
  const { imageURL, setImageURL } = useContext(ImageContext);

  return (
    <div className='search__result'>
      <div className='search__result-container__navbar'>
        <div className='search__result-container__navbar-navbar'>
          <div className='search__result-container__navbar-navbar-background'>
            <div
              className='search__result-container__navbar-navbar-background-img'
              style={{ backgroundImage: `url(${background_img})` }}
            />
            <div className='black__overlay' />
          </div>
        </div>
        <div className='search__result-container__navbar-overlay'>
          <Navbar />
        </div>
      </div>
      <div className='search__result-content'>
        <div className='search__result-content-background'></div>
      </div>
    </div>
  );
}

export default SearchResult;
