import { useState, useRef, useContext, memo } from "react";

import { ImageContext } from "../../utils/imageContext";
import "./uploaderBox.css";
import { Icon } from "@iconify/react";
import SearchBar from "../../components/searchBar/SearchBar";
import CharacterListModal from "../../components/characterListModal/characterListModal";

import { UploadHandler } from "../../utils/uploadHandler";

function UploaderBox() {
  const { imageURL, setImageURL } = useContext(ImageContext);

  const imageRef = useRef();
  const fileInputRef = useRef();
  const exploreButtonRef = useRef();

  const { uploadImage } = UploadHandler();

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  const [modalPosition, setModalPosition] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const triggerModal = () => {
    const elem = exploreButtonRef.current;
    let rect = elem.getBoundingClientRect();

    setModalPosition({
      top: rect.top,
      left: rect.left,
    });
    console.log(modalPosition);
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("render box");
  return (
    <div className='search-container'>
      <h1 className='sub__title'>Upload Image</h1>
      <div className='search-container-header'>
        <div className='search-container-header-upload'>
          <input
            type='file'
            accept='image/*'
            capture='camera'
            className='uploadInput'
            onChange={uploadImage}
            ref={fileInputRef}
          />
          <button
            className='content__button white__button'
            onClick={triggerUpload}
          >
            {imageURL && (
              <img
                src={imageURL}
                alt='Upload Preview'
                crossOrigin='anonymous'
                ref={imageRef}
              />
            )}
            {!imageURL && (
              <Icon className='big__icon' icon='icon-park:add-picture' />
            )}
          </button>
        </div>

        <div className='search-container-header-option'>
          <div className='search-container-header-option-supported'>
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
              position={modalPosition}
            />
          </div>
          <div className='search-container-header-option-change'>
            <button className='content__button red__button' onClick={() => {}}>
              Change
            </button>
          </div>
        </div>
      </div>
      <div className='search-container-footer'>
        <h1 className='sub__title'>Or upload from URL</h1>
        <SearchBar navbar={false} />
      </div>
    </div>
  );
}

export default memo(UploaderBox);
