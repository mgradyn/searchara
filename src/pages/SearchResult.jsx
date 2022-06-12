import { useState, useEffect, useRef, useContext } from "react";
import { ResultContext } from "../utils/resultContext";
import { ImageContext } from "../utils/imageContext";
import "./searchResult.css";
import background_img from "../assets/background.jpg";
import { Icon } from "@iconify/react";

import char_1 from "../assets/char_1.png";
import char_2 from "../assets/char_2.png";
import char_3 from "../assets/char_3.png";
import char_4 from "../assets/char_4.jpg";
import char_5 from "../assets/char_5.png";

import Navbar from "../components/navbar/navbar";
import Header from "../containers/header/Header";

const characterList = [
  {
    probability: 32.33332395553589,
    className: "Hatsune Miku",
    imageUrl: char_5,
  },
  {
    probability: 23.244707584381104,
    className: "Ayanami Rei",
    imageUrl: char_1,
  },
  {
    probability: 23.198423385620117,
    className: "Aqua (Konosuba)",
    imageUrl: char_2,
  },
  {
    probability: 18.819395303726196,
    className: "Shino Asada",
    imageUrl: char_3,
  },
  {
    probability: 18.286945819854736,
    className: "Nefertari Titi",
    imageUrl: char_4,
  },
];

function CharacterCard(props) {
  return (
    <div className='char__card__container'>
      <div className='char__card__container-img'>
        <div
          className='char__img '
          style={{ backgroundImage: `url(${props.imageUrl})` }}
        />
      </div>
      <div className='char__card__details'>
        <h1>{props.class}</h1>
        <h2 className='title__highlight'>
          {Number.parseFloat(props.probability).toFixed(2) + "% confident"}
        </h2>
        <button>
          <Icon icon='bi:arrow-right' />
        </button>
      </div>
    </div>
  );
}

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
        <div className='search__result-content-container section__padding'>
          <Header />
          <div className='search__list overall__max__width '>
            <div className='search__list-title-container'>
              <h1 className='search__list-title sub__title'>
                Similar Characters
              </h1>
            </div>
            <div className='search__list-cards-container'>
              {characterList.map((character) => (
                <CharacterCard
                  key={character.className}
                  imageUrl={character.imageUrl}
                  class={character.className}
                  probability={character.probability}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
