import { useContext } from "react";
import { ImageContext } from "./imageContext";
import { ResultContext } from "./resultContext";

export const UploadHandler = () => {
  const { imageURL, setImageURL } = useContext(ImageContext);
  const { results, setResults } = useContext(ResultContext);

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
  };

  const handleOnChange = (e) => {
    setImageURL(e.target.value);
    setResults([]);
  };

  return { uploadImage: uploadImage, handleOnChange: handleOnChange };
};
