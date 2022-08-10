import { useState, useEffect, useRef, useContext, memo } from "react";
import character_img from "../../assets/miku.png";
import { ResultContext } from "../../utils/resultContext";
import { ImageContext } from "../../utils/imageContext";
import { CharactersContext } from "../../utils/charactersContext";

import "./header.css";

function Header() {
  const { results, setResults } = useContext(ResultContext);
  const { imageURL, setImageURL } = useContext(ImageContext);
  const [currentImage, setCurrentImage] = useState(null);

  const { characters, setCharacters } = useContext(CharactersContext);

  console.log("Header render");

  useEffect(() => {
    setCurrentImage(imageURL);
  }, [results]);

  return (
    <div className='header overall__max__width section__space'>
      <div className='header-character__img'>
        {characters.length === 0 ||
        results.length === 0 ||
        currentImage == null ? (
          <div className='character__img skeleton' />
        ) : (
          <div
            className='character__img'
            style={{
              backgroundImage: `url(${
                results.selected === 0 && currentImage != null
                  ? currentImage
                  : characters[results.selected].image.large
              })`,
            }}
          />
        )}
      </div>
      <div className='header-character__details'>
        <div className='character__details-name'>
          {characters.length === 0 || results.length === 0 ? (
            <>
              <div className='skeleton skeleton-text' />
            </>
          ) : (
            <>
              <h1 className='title'>{results[results.selected].className}</h1>

              <h2 className='title__highlight'>
                {Number.parseFloat(
                  results[results.selected].probability
                ).toFixed(2) + "% confident"}
              </h2>
            </>
          )}
        </div>
        {characters.length === 0 || results.length === 0 ? (
          <>
            <div className='skeleton-darker skeleton-text' />
            <div className='skeleton-darker skeleton-text' />
            <div className='skeleton-darker skeleton-text' />
            <div className='skeleton-darker skeleton-text' />
          </>
        ) : (
          <div className='description'>
            <div
              dangerouslySetInnerHTML={{
                __html: characters[results.selected].description,
              }}
            ></div>
          </div>
        )}
        {characters.length === 0 || results.length === 0 ? null : (
          <a
            className='content__button explore__button'
            href={`${characters[results.selected].siteUrl}`}
            target='_blank'
            rel='noreferrer'
          >
            Explore
          </a>
        )}
      </div>
    </div>
  );
}

export default memo(Header);
