import { memo, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./movieCard.css";

function MovieCard(props) {
  const [imgLoad, setImgLoad] = useState(false);
  const ref = useRef();

  useEffect(() => {
    setImgLoad(false);
    var img = new Image();
    img.onload = async () => {
      if (ref.current != null) {
        setImgLoad(true);
        ref.current.style.backgroundImage = "url(" + img.src + ")";
      }
      // console.log(imgLoad);
      // console.log(ref.current);
    };
    img.src = props.imageUrl;
  }, [props.imageUrl]);

  return (
    <a
      className='movieRef'
      href={`${props.siteUrl}`}
      target='_blank'
      rel='noreferrer'
    >
      <div className='movie__card__container'>
        <div className='movie__card__container-img'>
          {!imgLoad ? (
            <div className='movie__img skeleton' ref={ref} />
          ) : (
            <div
              className='movie__img'
              // style={{ backgroundImage: `url(${props.imageUrl})` }}
              ref={ref}
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
