import { memo, useState, useRef } from "react";
import "./optionBox.css";

import CharacterListModal from "../../containers/characterListModal/characterListModal";

function OptionBox({ triggerUpload }) {
  const exploreButtonRef = useRef();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const triggerModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='optionBox'>
      <div className='optionBox-supported'>
        <h1 className='sub__title'>Supported Characters</h1>
        <button
          className='content__button white__button'
          onClick={triggerModal}
          ref={exploreButtonRef}
        >
          Explore
        </button>
        <CharacterListModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
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
