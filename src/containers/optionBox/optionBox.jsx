import { memo } from "react";
import "./optionBox.css";

import ExploreCharactersButton from "../../components/exploreCharactersButton/exploreCharactersButton";

function OptionBox({ triggerUpload }) {
  return (
    <div className='optionBox'>
      <div className='optionBox-supported'>
        <h1 className='sub__title'>Supported Characters</h1>
        <ExploreCharactersButton />
      </div>
      <div className='optionBox-change'>
        <button className='content__button red__button' onClick={triggerUpload}>
          Change
        </button>
      </div>
    </div>
  );
}

export default memo(OptionBox);
