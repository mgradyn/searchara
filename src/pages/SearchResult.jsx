import { useEffect, useRef, useContext, memo } from "react";
import { ResultContext } from "../utils/resultContext";
import { ImageContext } from "../utils/imageContext";
import "./searchResult.css";

import Navbar from "../containers/navbar/navbar";
import Header from "../containers/header/Header";
import CardList from "../containers/cardList/cardList";
import BackgroundNavbar from "../components/backgroundNavbar/backgroundNavbar";

import { CharactersContext } from "../utils/charactersContext";
import { FetchHandler } from "../utils/fetchHandler";
import { TopLoadingContext } from "../utils/topLoadingContext";
import { useEffectOnce } from "../utils/useEffectOnce";
import { useNavigate } from "react-router-dom";

function SearchResult() {
  const { results } = useContext(ResultContext);
  const { imageURL } = useContext(ImageContext);
  const { isTopLoading, setIsTopLoading } = useContext(TopLoadingContext);
  const { characters } = useContext(CharactersContext);

  const navigate = useNavigate();
  const prevSelectedIdRef = useRef();

  const { getMovies } = FetchHandler();

  const prevSelectedId = prevSelectedIdRef.current;

  useEffect(() => {
    if (results.length !== 0) {
      prevSelectedIdRef.current = results[results.selected].id;
    }
  });

  useEffectOnce(() => {
    if (imageURL == null) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (results.length !== 0) {
      if (prevSelectedId !== results[results.selected].id) {
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
        <BackgroundNavbar />
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
