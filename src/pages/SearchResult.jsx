import { useState, useEffect, useRef, useContext } from "react";
import { ResultContext } from "../utils/resultContext";
import { ImageContext } from "../utils/imageContext";
import "./searchResult.css";
import background_img from "../assets/background.jpg";
import character_img from "../assets/miku.png";

import Navbar from "../components/navbar/navbar";

function SearchResult() {
  const { results, setResults } = useContext(ResultContext);
  const { imageURL, setImageURL } = useContext(ImageContext);

  const charName = "Hatsune Miku";
  const confidence = "87%";
  const charDescription =
    'Hatsune Miku is the second Vocaloid2 after Sweet Ann and the first installment in the Vocaloid2 Character Vocal Series by Crypton Future Media released on August 31, 2007. The name of the title and the character of the software was chosen by combining "hatsu" (初, first), "ne" (音, sound), and miku (未来, future). The data for the voice was created by actually sampling the voice of Saki Fujita, a Japanese voice actress. Unlike general purpose speech synthesizers, the software is tuned to create J-pop songs commonly heard in anime, but it is possible to create songs from other genres.';

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
        <div className='search__result-content-container section__padding'>
          <div className='search__result-content-container-header'>
            <div className='search__result-content-container-header-character__img'>
              <div
                className='character__img'
                style={{ backgroundImage: `url(${character_img})` }}
              />
            </div>
            <div className='search__result-content-container-header-character__details'>
              <div className='character__details-name'>
                <h1 className='title'>{charName}</h1>
                <h2 className='title__highlight'>
                  {confidence + " confident"}
                </h2>
              </div>
              <p className='description'>{charDescription}</p>
              <button
                className='content__button yellow__button'
                onClick={() => {}}
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
