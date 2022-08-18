import { memo, useState, useRef } from "react";
import "./exploreCharactersButton.css";
import CharacterListModal from "../../containers/characterListModal/characterListModal";

function ExploreCharactersButton() {
  const exploreButtonRef = useRef();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const triggerModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className='content__button white__button'
        onClick={triggerModal}
        ref={exploreButtonRef}
      >
        <div className='explore'>Explore</div>
        <div className='supported__characters'>Supported Characters</div>
      </button>
      <CharacterListModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default memo(ExploreCharactersButton);
