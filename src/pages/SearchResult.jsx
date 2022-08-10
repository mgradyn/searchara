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

import Navbar from "../containers/navbar/navbar";
import Header from "../containers/header/Header";
import CardList from "../containers/cardList/cardList";

import { MoviesContext } from "../utils/moviesContext";
import { CharactersContext } from "../utils/charactersContext";
import { FetchHandler } from "../utils/fetchHandler";
import { TopLoadingContext } from "../utils/topLoadingContext";
import { useNavigate } from "react-router-dom";

function SearchResult() {
  const { results, setResults } = useContext(ResultContext);
  const { imageURL, setImageURL } = useContext(ImageContext);
  const { isTopLoading, setIsTopLoading } = useContext(TopLoadingContext);
  const { movies, setMovies } = useContext(MoviesContext);

  const navigate = useNavigate();

  const { characters, setCharacters } = useContext(CharactersContext);

  const { getMovies } = FetchHandler();

  const prevSelectedIdRef = useRef();
  useEffect(() => {
    if (results.length !== 0) {
      prevSelectedIdRef.current = results[results.selected].id;
    }
  });

  const prevSelectedId = prevSelectedIdRef.current;

  useEffect(() => {
    if (imageURL == null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (results.length !== 0) {
      if (prevSelectedId !== results[results.selected].id) {
        // console.log("gotcha", prevSelectedId, results[results.selected].id);
        // prevSelectedIdRef.current = results[results.selected].id;
        getMovies({ id: results[results.selected].id });
      }
    }

    if (isTopLoading === true) {
      setIsTopLoading(false);
    }
  }, [results, characters]);

  return (
    <div className='search__result'>
      <div className='search__result-container__navbar'>
        <div className='search__result-container__navbar-navbar'>
          <div className='search__result-container__navbar-navbar-background'>
            <div
              className='search__result-container__navbar-navbar-background-img'
              style={{
                backgroundImage:
                  movies.length !== 0 && movies[0].node.bannerImage !== null
                    ? `url(${movies[0].node.bannerImage})`
                    : `url(${background_img})`,
              }}
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
