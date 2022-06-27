import { memo } from "react";
import { Link } from "react-router-dom";
import "./movieCard.css";

function MovieCard(props) {
  return (
    <a
      className='movieRef'
      href={`${props.siteUrl}`}
      target='_blank'
      rel='noreferrer'
    >
      <div className='movie__card__container'>
        <div className='movie__card__container-img'>
          {props.imageUrl == null ? (
            <div className='movie__img skeleton' />
          ) : (
            <div
              className='movie__img'
              style={{ backgroundImage: `url(${props.imageUrl})` }}
            />
          )}
        </div>
        <div className='movie__card__details'>
          {props.title == null ? (
            <div className='skeleton skeleton-text' />
          ) : (
            <h1>{props.title}</h1>
          )}
        </div>
      </div>
    </a>
  );
}

export default memo(MovieCard);
