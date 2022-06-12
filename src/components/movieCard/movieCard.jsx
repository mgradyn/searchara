import { memo } from "react";
import "./movieCard.css";

function MovieCard(props) {
  return (
    <div className='movie__card__container'>
      <div className='movie__card__container-img'>
        <div
          className='movie__img '
          style={{ backgroundImage: `url(${props.imageUrl})` }}
        />
      </div>
      <div className='movie__card__details'>
        <h1>{props.title}</h1>
      </div>
    </div>
  );
}

export default memo(MovieCard);
