import { useRef, useContext, memo } from "react";
import { v4 as uuid } from "uuid";

import "./cardList.css";

import { useDraggable } from "react-use-draggable-scroll";

import CharacterCard from "../../components/characterCard/characterCard";
import MovieCard from "../../components/movieCard/movieCard";

import { CharactersContext } from "../../utils/charactersContext";
import { MoviesContext } from "../../utils/moviesContext";
import { ResultContext } from "../../utils/resultContext";

//placeholders

const characterList = [{}, {}, {}, {}, {}];
const movieList = [{}, {}, {}, {}, {}, {}];

function CardList(props) {
  const scrollRef = useRef();
  const { events } = useDraggable(scrollRef, {
    applyRubberBandEffect: true,
    decayRate: 0.85,
    safeDisplacement: 12,
  });

  const { mode } = props;

  const { characters } = useContext(CharactersContext);
  const { results } = useContext(ResultContext);
  const { movies } = useContext(MoviesContext);

  return (
    <div className='list overall__max__width '>
      <div className='list-title-container'>
        <h1 className='list-title sub__title'>
          {mode === "characters" ? "Similar Characters" : "Movies and Shows"}
        </h1>
      </div>
      <div className='list-cards-container' {...events} ref={scrollRef}>
        {mode === "characters" &&
        characters.length !== 0 &&
        results.length !== 0
          ? characters.flatMap((character, i) =>
              character.id === results[results.selected].id ? null : (
                <CharacterCard
                  key={uuid()}
                  idx={i}
                  imageUrl={character.image.large}
                  class={character.name.full}
                  probability={results[i].probability}
                />
              )
            )
          : mode === "characters" && characters.length === 0
          ? characterList.flatMap(() => (
              <CharacterCard
                key={uuid()}
                imageUrl={null}
                class={null}
                probability={null}
              />
            ))
          : mode === "movies" && movies.length !== 0 && results.length !== 0
          ? movies.map((movie) => (
              <MovieCard
                key={uuid()}
                imageUrl={movie.node.coverImage.extraLarge}
                title={movie.node.title.romaji}
                siteUrl={movie.node.siteUrl}
              />
            ))
          : movieList.map(() => (
              <MovieCard key={uuid()} imageUrl={null} title={null} />
            ))}
      </div>
    </div>
  );
}

export default memo(CardList);
