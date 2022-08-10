import { memo, useRef, useContext } from "react";
import { Icon } from "@iconify/react";
import "./imageBox.css";

import { ImageContext } from "../../utils/imageContext";
import { UploadHandler } from "../../utils/uploadHandler";
import { useEffectOnce } from "../../utils/useEffectOnce";
import { preventDefault } from "../../utils/preventDefault";

function ImageBox({ triggerUpload }) {
  useEffectOnce(() => {
    uploadRef.current.addEventListener("dragover", handleDragOver);
    uploadRef.current.addEventListener("drop", handleDrop);
  });

  const { imageURL } = useContext(ImageContext);
  const uploadRef = useRef(null);
  const imageRef = useRef();

  const { uploadDropImage } = UploadHandler();
  const { preventDefaultAction } = preventDefault();

  const handleDragOver = (e) => {
    preventDefaultAction(e);
    uploadRef.current.classList.add("dragover");
  };

  const removeDragOver = () => uploadRef.current.classList.remove("dragover");

  const handleDrop = (e) => {
    preventDefaultAction(e);
    removeDragOver();
    uploadDropImage(e);
  };

  return (
    <div
      ref={uploadRef}
      className='imageBox'
      onDragLeave={removeDragOver}
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
      {!imageURL && <Icon className='big__icon' icon='icon-park:add-picture' />}
    </div>
  );
}

export default memo(ImageBox);
