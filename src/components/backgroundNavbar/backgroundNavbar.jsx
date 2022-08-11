import { memo, useContext } from "react";

import { MoviesContext } from "../../utils/moviesContext";

import background_img from "../../assets/background.jpg";
import "./backgroundNavbar.css";

function BackgroundNavbar() {
  const { movies } = useContext(MoviesContext);

  return (
    <div className='backgroundNavbar'>
      <div className='backgroundNavbar-background'>
        <div
          className='backgroundNavbar-background-img'
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
  );
}

export default memo(BackgroundNavbar);
