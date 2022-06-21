import { useState, useEffect, useRef, useContext, memo } from "react";
import { v4 as uuid } from "uuid";

import "./cardList.css";

import { useDraggable } from "react-use-draggable-scroll";

import CharacterCard from "../../components/characterCard/characterCard";
import MovieCard from "../../components/movieCard/movieCard";

import { CharactersContext } from "../../utils/charactersContext";

import { ResultContext } from "../../utils/resultContext";

import char_1 from "../../assets/char_1.png";
import char_2 from "../../assets/char_2.png";
import char_3 from "../../assets/char_3.png";
import char_4 from "../../assets/char_4.jpg";
import char_5 from "../../assets/char_5.png";

import movie_1 from "../../assets/movie_1.jpg";
import movie_2 from "../../assets/movie_2.jpg";
import movie_3 from "../../assets/movie_3.jpg";
import movie_4 from "../../assets/movie_4.jpg";
import movie_5 from "../../assets/movie_5.jpg";
import movie_6 from "../../assets/movie_6.jpg";

//characters

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

//movies

const movieList = [
  {
    title: "Sekiranun Grafitti",
    imageUrl: movie_1,
  },
  {
    title: "Redial",
    imageUrl: movie_2,
  },
  {
    title: "Yumeyume",
    imageUrl: movie_3,
  },
  {
    title: "Tell Your World",
    imageUrl: movie_4,
  },
  {
    title: "EDEN",
    imageUrl: movie_5,
  },
  {
    title: "Downloader",
    imageUrl: movie_6,
  },
];

function CardList(props) {
  const scrollRef = useRef();
  const { events } = useDraggable(scrollRef, {
    applyRubberBandEffect: true,
    decayRate: 0.85,
    safeDisplacement: 12,
  });

  const { mode } = props;

  const { characters, setCharacters } = useContext(CharactersContext);
  const { results, setResults } = useContext(ResultContext);

  return (
    <div className='list overall__max__width '>
      <div className='list-title-container'>
        <h1 className='list-title sub__title'>
          {mode === "characters" ? "Similar Characters" : "Movies and Shows"}
        </h1>
      </div>
      <div className='list-cards-container' {...events} ref={scrollRef}>
        {mode === "characters" && characters.length !== 0
          ? characters.flatMap((character, i) =>
              character.id === results[results.selected].id ? null : (
                <CharacterCard
                  key={uuid()}
                  imageUrl={character.image.large}
                  class={character.name.full}
                  probability={results[i].probability}
                />
              )
            )
          : mode === "characters" && characters.length === 0
          ? characterList.flatMap((character) => (
              <CharacterCard
                key={uuid()}
                imageUrl={character.imageUrl}
                class={character.className}
                probability={character.probability}
              />
            ))
          : movieList.map((movie) => (
              <MovieCard
                key={uuid()}
                imageUrl={movie.imageUrl}
                title={movie.title}
              />
            ))}
      </div>
    </div>
  );
}

export default memo(CardList);
