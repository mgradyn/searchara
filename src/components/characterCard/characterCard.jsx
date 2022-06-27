import { useState, useEffect, useRef, useContext, memo } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { ResultContext } from "../../utils/resultContext";
import { MoviesContext } from "../../utils/moviesContext";
import { CharactersContext } from "../../utils/charactersContext";
import { TopLoadingContext } from "../../utils/topLoadingContext";

import "./characterCard.css";

function CharacterCard(props) {
  const navigate = useNavigate();
  const { results, setResults } = useContext(ResultContext);
  const { movies, setMovies } = useContext(MoviesContext);
  const { characters, setCharacters } = useContext(CharactersContext);
  const { isTopLoading, setIsTopLoading } = useContext(TopLoadingContext);

  const navigateNewCharacter = () => {
    setIsTopLoading(true);
    const newRes = Object.assign([], results, { selected: props.idx });
    setMovies([]);
    setResults(newRes);
    navigate(`${results[props.idx].className.split(" ").join("_")}`, {
      replace: true,
    });
  };
  return (
    <div className='char__card__container'>
      <div className='char__card__container-img'>
        {props.imageUrl == null ? (
          <div className='char__img skeleton' />
        ) : (
          <div
            className='char__img'
            style={{ backgroundImage: `url(${props.imageUrl})` }}
          />
        )}
      </div>
      <div className='char__card__details'>
        {props.class == null ? (
          <>
            <div className='skeleton skeleton-text' />
            <div className='skeleton-darker skeleton-text' />
          </>
        ) : (
          <>
            <h1>{props.class}</h1>
            <h2 className='title__highlight'>
              {Number.parseFloat(props.probability).toFixed(2) + "% confident"}
            </h2>
            <button onClick={navigateNewCharacter}>
              <Icon icon='bi:arrow-right' />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(CharacterCard);
