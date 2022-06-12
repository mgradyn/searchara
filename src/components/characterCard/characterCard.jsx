import { useState, useEffect, useRef, useContext, memo } from "react";
import { Icon } from "@iconify/react";

import "./characterCard.css";

function CharacterCard(props) {
  return (
    <div className='char__card__container'>
      <div className='char__card__container-img'>
        <div
          className='char__img '
          style={{ backgroundImage: `url(${props.imageUrl})` }}
        />
      </div>
      <div className='char__card__details'>
        <h1>{props.class}</h1>
        <h2 className='title__highlight'>
          {Number.parseFloat(props.probability).toFixed(2) + "% confident"}
        </h2>
        <button>
          <Icon icon='bi:arrow-right' />
        </button>
      </div>
    </div>
  );
}

export default memo(CharacterCard);
