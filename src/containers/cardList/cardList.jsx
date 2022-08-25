import { useContext, memo } from "react";
import { v4 as uuid } from "uuid";

import "./cardList.css";

import ScrollContainer from "react-indiana-drag-scroll";

import CharacterCard from "../../components/characterCard/characterCard";
import MovieCard from "../../components/movieCard/movieCard";

import { CharactersContext } from "../../utils/charactersContext";
import { MoviesContext } from "../../utils/moviesContext";
import { ResultContext } from "../../utils/resultContext";

//placeholders

const characterList = [{}, {}, {}, {}, {}];
const movieList = [{}, {}, {}, {}, {}, {}];

function CardList(props) {
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
      <ScrollContainer className='list-cards-container' horizontal='false'>
        {mode === "characters" &&
        characters.length !== 0 &&
        results.length !== 0
          ? characters.flatMap((character, index) =>
              character.id === results[results.selected].id ? null : (
                <CharacterCard
                  key={uuid()}
                  idx={index}
                  imageUrl={character.image.large}
                  class={character.name.full}
                  probability={results[index].probability}
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
          ? movies.map((movie, index) => (
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
      </ScrollContainer>
    </div>
  );
}

export default memo(CardList);
