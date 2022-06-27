import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
  memo,
} from "react";
import { ResultContext } from "../utils/resultContext";
import { ImageContext } from "../utils/imageContext";
import "./searchResult.css";
import background_img from "../assets/background.jpg";

import Navbar from "../components/navbar/navbar";
import Header from "../containers/header/Header";
import CardList from "../containers/cardList/cardList";

import { MoviesContext } from "../utils/moviesContext";
import { CharactersContext } from "../utils/charactersContext";
import { FetchHandler } from "../utils/fetchHandler";
import { TopLoadingContext } from "../utils/topLoadingContext";

function SearchResult() {
  const { results, setResults } = useContext(ResultContext);
  const { imageURL, setImageURL } = useContext(ImageContext);
  const { isTopLoading, setIsTopLoading } = useContext(TopLoadingContext);

  const { characters, setCharacters } = useContext(CharactersContext);

  const { getMovies } = FetchHandler();

  const prevSelectedIdRef = useRef();
  useEffect(() => {
    prevSelectedIdRef.current = results[results.selected].id;
  });

  const prevSelectedId = prevSelectedIdRef.current;

  useEffect(() => {
    if (prevSelectedId !== results[results.selected].id) {
      // console.log("gotcha", prevSelectedId, results[results.selected].id);
      // prevSelectedIdRef.current = results[results.selected].id;
      getMovies({ id: results[results.selected].id });
    }
    if (isTopLoading === true) {
      setIsTopLoading(false);
    }
  }, [results[results.selected].id, results, characters]);

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
          <CardList mode='characters' />
          <CardList mode='movies' />
        </div>
      </div>
    </div>
  );
}

export default memo(SearchResult);
