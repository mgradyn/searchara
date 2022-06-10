import { useState, useEffect, useRef, useContext, memo } from "react";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import { TARGET_CLASSES } from "../../utils/constant";
import { ResultContext } from "../../utils/resultContext";
import { ImageContext } from "../../utils/imageContext";
import { ModelContext } from "../../utils/modelContext";
import "./searchBar.css";
import { Icon } from "@iconify/react";

function SearchBar(props) {
  const { results, setResults } = useContext(ResultContext);
  const { imageURL, setImageURL } = useContext(ImageContext);
  const { model, setModel } = useContext(ModelContext);

  const { navbar } = props;

  const textInputRef = useRef();

  const identify = () => {
    if (imageURL != null) {
      textInputRef.current.value = "";

      let img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageURL;

      img.onload = async () => {
        let tensor = tf.browser.fromPixels(img, 3);
        tensor = tf.image.resizeNearestNeighbor(tensor, [96, 96]);
        tensor = tf.expandDims(tensor, 0);
        tensor = tf.div(tensor, tf.scalar(255.0));
        const predictions = await model.predict(tensor).data();
        const top5 = Array.from(predictions)
          .map(function (p, i) {
            return {
              probability: p * 10,
              className: TARGET_CLASSES[i].name,
              index: i,
            };
          })
          .sort((a, b) => b.probability - a.probability)
          .slice(0, 5);
        setResults(top5);

        console.log(top5);
      };
    }
  };

  const handleOnChange = (e) => {
    setImageURL(e.target.value);
    setResults([]);
  };

  //navbar only

  const fileInputRef = useRef();

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
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
