import { useState, useRef, useContext, memo, useEffect } from "react";

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
  const uploadRef = useRef(null);

  const { uploadImage, uploadDropImage } = UploadHandler();

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  const triggerModal = () => {
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    uploadRef.current.addEventListener("dragover", handleDragOver);
    uploadRef.current.addEventListener("drop", handleDrop);

    // return () => {
    //   uploadRef.current.removeEventListener("dragover", handleDragOver);
    //   uploadRef.current.removeEventListener("drop", handleDrop);
    // };
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadRef.current.classList.add("dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadRef.current.classList.remove("dragover");
    uploadDropImage(e);
  };

  const onDragLeave = () => uploadRef.current.classList.remove("dragover");

  console.log("render box");
  return (
    <div className='search-container'>
      <h1 className='sub__title'>Upload Image</h1>
      <div className='search-container-header'>
        <div
          ref={uploadRef}
          className='search-container-header-upload'
          onDragLeave={onDragLeave}
          onClick={triggerUpload}
        >
          <input
            type='file'
            accept='image/*'
            className='uploadInput'
            value=''
            onChange={uploadImage}
            ref={fileInputRef}
          />

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
            />
          </div>
          <div className='search-container-header-option-change'>
            <button
              className='content__button red__button'
              onClick={triggerUpload}
            >
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
