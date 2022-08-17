import { useRef, memo } from "react";

import "./uploaderBox.css";

import SearchBar from "../../components/searchBar/SearchBar";
import OptionBox from "../../components/optionBox/optionBox";
import ImageBox from "../../components/imageBox/imageBox";

import { UploadHandler } from "../../utils/uploadHandler";

function UploaderBox() {
  const fileInputRef = useRef();
  const { uploadImage } = UploadHandler();

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  // console.log("render box");
  return (
    <div className='search-container'>
      <h1 className='sub__title'>Upload Image</h1>
      <div className='search-container-header'>
        <ImageBox triggerUpload={triggerUpload} />
        <OptionBox triggerUpload={triggerUpload} />
      </div>
      <input
        type='file'
        accept='image/*'
        className='uploadInput'
        value=''
        onChange={uploadImage}
        ref={fileInputRef}
      />
      <div className='search-container-footer'>
        <h1 className='sub__title'>Or upload from URL</h1>
        <SearchBar navbar={false} />
      </div>
    </div>
  );
}

export default memo(UploaderBox);
