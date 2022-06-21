import { useContext } from "react";
import { ImageContext } from "./imageContext";
import { ResultContext } from "./resultContext";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import { TARGET_CLASSES } from "./constant";
import { ModelContext } from "./modelContext";
import { useNavigate } from "react-router-dom";
import { FetchHandler } from "./fetchHandler";

export const ModelHandler = () => {
  const { results, setResults } = useContext(ResultContext);
  const { imageURL, setImageURL } = useContext(ImageContext);
  const { model, setModel } = useContext(ModelContext);
  const navigate = useNavigate();

  const { getCharacters, getMovies } = FetchHandler();

  const identify = (callback) => {
    if (imageURL != null) {
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
              id: TARGET_CLASSES[i].id,
              index: i,
            };
          })
          .sort((a, b) => b.probability - a.probability)
          .slice(0, 5);

        const idArr = {
          id: top5[0].id,
          id2: top5[1].id,
          id3: top5[2].id,
          id4: top5[3].id,
          id5: top5[4].id,
        };

        top5.selected = 0;
        getCharacters(idArr);
        setResults(top5, navigate("/result"));

        console.log(top5);
      };
    }
  };

  return { identify };
};
