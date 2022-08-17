import { useContext } from "react";
import { ImageContext } from "./imageContext";

export const UploadHandler = () => {
  const { setImageURL } = useContext(ImageContext);

  const upload = ({ files }) => {
    if (files.length > 0) {
      // console.log(files[0]);
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
  };

  const uploadImage = (e) => {
    upload(e.target);
  };

  const uploadDropImage = (e) => {
    upload(e.dataTransfer);
  };

  const handleOnChange = (e) => {
    setImageURL(e.target.value);
    // setResults([]);
  };

  return {
    uploadImage: uploadImage,
    handleOnChange: handleOnChange,
    uploadDropImage: uploadDropImage,
  };
};
