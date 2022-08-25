import { useContext, memo, useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { ResultContext } from "../../utils/resultContext";
import { MoviesContext } from "../../utils/moviesContext";
import { TopLoadingContext } from "../../utils/topLoadingContext";

import "./characterCard.css";

function CharacterCard(props) {
  const navigate = useNavigate();
  const { results, setResults } = useContext(ResultContext);
  const { setMovies } = useContext(MoviesContext);
  const { setIsTopLoading } = useContext(TopLoadingContext);
  const [imgLoad, setImgLoad] = useState(false);
  const ref = useRef();

  const navigateNewCharacter = () => {
    setIsTopLoading(true);
    const newRes = Object.assign([], results, { selected: props.idx });
    setMovies([]);
    setResults(newRes);
    navigate(`${results[props.idx].className.split(" ").join("_")}`, {
      replace: true,
    });
  };

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
    <div className='char__card__container'>
      <div className='char__card__container-img'>
        {!imgLoad ? (
          <div className='char__img skeleton' ref={ref} />
        ) : (
          <div
            className='char__img'
            // style={{ backgroundImage: `url(${props.imageUrl})` }}
            ref={ref}
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
