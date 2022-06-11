import { useRef, memo } from "react";
import "./searchBar.css";
import { Icon } from "@iconify/react";
import { UploadHandler } from "../../utils/uploadHandler";
import { ModelHandler } from "../../utils/modelHandler";

function SearchBar(props) {
  const { navbar } = props;

  const fileInputRef = useRef();
  const textInputRef = useRef();

  const { uploadImage, handleOnChange } = UploadHandler();
  const { identify } = ModelHandler();

  //navbar only

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  console.log("render search bar");

  return (
    <div
      className={`banner ${
        navbar ? "search__bar search__bar-navbar__prop" : "search__bar"
      }`}
    >
      {navbar && (
        <input
          type='file'
          accept='image/*'
          capture='camera'
          className='uploadInput'
          onChange={uploadImage}
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
        onChange={handleOnChange}
      />
      <button className='content__button search__button' onClick={identify}>
        Search
        <Icon className='search__icon__inside' icon='akar-icons:search' />
      </button>
    </div>
  );
}

export default memo(SearchBar);
