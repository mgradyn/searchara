import { useState, useEffect, useRef, useContext, memo } from "react";
import character_img from "../../assets/miku.png";
import { ResultContext } from "../../utils/resultContext";
import { ImageContext } from "../../utils/imageContext";
import { CharactersContext } from "../../utils/charactersContext";

import "./header.css";

function Header() {
  const { results, setResults } = useContext(ResultContext);
  const { imageURL, setImageURL } = useContext(ImageContext);

  const { characters, setCharacters } = useContext(CharactersContext);

  const charName = "Hatsune Miku";
  const confidence = "87%";
  const charDescription =
    'Hatsune Miku is the second Vocaloid2 after Sweet Ann and the first installment in the Vocaloid2 Character Vocal Series by Crypton Future Media released on August 31, 2007. The name of the title and the character of the software was chosen by combining "hatsu" (初, first), "ne" (音, sound), and miku (未来, future). The data for the voice was created by actually sampling the voice of Saki Fujita, a Japanese voice actress. Unlike general purpose speech synthesizers, the software is tuned to create J-pop songs commonly heard in anime, but it is possible to create songs from other genres.';

  console.log("Header render");

  return (
    <div className='header overall__max__width section__space'>
      <div className='header-character__img'>
        <div
          className='character__img'
          style={{ backgroundImage: `url(${imageURL})` }}
        />
      </div>
      <div className='header-character__details'>
        <div className='character__details-name'>
          <h1 className='title'>{results[results.selected].className}</h1>

          <h2 className='title__highlight'>
            {Number.parseFloat(results[results.selected].probability).toFixed(
              2
            ) + "% confident"}
          </h2>
        </div>
        {characters.length === 0 && (
          <>
            <div className='skeleton skeleton-text' />
            <div className='skeleton skeleton-text' />
            <div className='skeleton skeleton-text' />
            <div className='skeleton skeleton-text' />
          </>
        )}
        {characters.length !== 0 && (
          <p className='description'>
            {JSON.stringify(characters[results.selected].description)
              .split("\\n\\n~!")
              .pop()
              .replaceAll("\\n", "")}
          </p>
        )}
        <button className='content__button yellow__button' onClick={() => {}}>
          Explore
        </button>
      </div>
    </div>
  );
}

export default memo(Header);
