import { useRef, memo, useState, useContext } from "react";
import "./searchBar.css";
import { Icon } from "@iconify/react";
import { UploadHandler } from "../../utils/uploadHandler";
import { ModelHandler } from "../../utils/modelHandler";
import { ImageContext } from "../../utils/imageContext";

function SearchBar(props) {
  const { navbar } = props;

  const fileInputRef = useRef();
  const textInputRef = useRef();

  const { uploadImage, handleOnChange } = UploadHandler();
  const { identify } = ModelHandler();

  const { imageURL, setImageURL } = useContext(ImageContext);

  //navbar only
  const [isUploadBoxOpen, setIsUploadBoxOpen] = useState(false);
  const uploadBoxRef = useRef(null);

  const openUploadBox = () => {
    if (navbar && !isUploadBoxOpen) {
      setIsUploadBoxOpen(true);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  const toggleExit = () => {
    uploadBoxRef.current.className = "disappear uploadBox";
    setTimeout(() => setIsUploadBoxOpen(false), 160);
  };

  const toggleImageUpload = (e) => {
    openUploadBox();
    uploadImage(e);
  };

  const toggleUrlUpload = (e) => {
    if (e.target.value.length > 0) {
      openUploadBox();
    }

    handleOnChange(e);
  };

  const identifyImage = () => {
    if (isUploadBoxOpen && navbar) {
      toggleExit();
    }
    identify();
  };

  console.log("render search bar");

  return (
    <div
      className={`${
        navbar ? "search__bar search__bar-navbar__prop" : "search__bar"
      }`}
    >
      {navbar && (
        <input
          type='file'
          accept='image/*'
          capture='camera'
          className='uploadInput'
          onChange={toggleImageUpload}
          ref={fileInputRef}
        />
      )}
      {navbar && (
        <button
          className='content__button upload__button'
          onClick={triggerUpload}
        >
          <Icon className='upload__button-icon' icon='ic:round-upload' />
          Upload
          <Icon className='line-icon' icon='ci:line-xl' />
        </button>
      )}
      <Icon className='search__icon' icon='akar-icons:search' />
      <input
        type='text'
        placeholder='Paste or enter image URL'
        ref={textInputRef}
        onChange={toggleUrlUpload}
      />
      <button
        className='content__button search__button'
        onClick={identifyImage}
      >
        Search
        <Icon className='search__icon__inside' icon='akar-icons:search' />
      </button>
      {navbar && isUploadBoxOpen && (
        <div className='uploadBox appear' ref={uploadBoxRef}>
          <div className='uploadBox-header'>
            <h1 className='sub__title'>Image Preview</h1>
            <Icon icon='bi:x' className='exit__icon' onClick={toggleExit} />
          </div>
          <div className='uploadBox-image__preview'>
            {imageURL && (
              <img
                src={imageURL}
                alt='Upload Preview'
                crossOrigin='anonymous'
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(SearchBar);
