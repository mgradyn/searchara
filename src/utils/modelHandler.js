import { useContext } from "react";
import * as tf from "@tensorflow/tfjs-core";
import { TARGET_CLASSES } from "./constant";

import { ImageContext } from "./imageContext";
import { ResultContext } from "./resultContext";
import { TopLoadingContext } from "./topLoadingContext";

import { ModelContext } from "./modelContext";
import { DetectionModelContext } from "./detectionModelContext";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FetchHandler } from "./fetchHandler";

export const ModelHandler = () => {
  const { setResults } = useContext(ResultContext);
  const { imageURL } = useContext(ImageContext);
  const { setIsTopLoading } = useContext(TopLoadingContext);

  const { model } = useContext(ModelContext);
  const { detectionModel } = useContext(DetectionModelContext);

  const navigate = useNavigate();
  const location = useLocation();

  const { getCharacters } = FetchHandler();

  const getResult = (newImageURL) => {
    let img = new Image();
    img.crossOrigin = "anonymous";
    img.src = newImageURL;

    // setImageURL(newImageURL);
    tf.engine().startScope();
    img.onload = async () => {
      let tensor = tf.browser.fromPixels(img, 3);
      tensor = tf.image.resizeNearestNeighbor(tensor, [96, 96]);
      tensor = tf.expandDims(tensor, 0);
      tensor = tf.div(tensor, tf.scalar(255.0));
      const predictions = await model.predict(tensor).data();
      tf.engine().endScope();

      // console.log(tf.softmax(predictions).dataSync());

      const top5 = Array.from(tf.softmax(predictions).dataSync())
        .map(function (p, i) {
          return {
            probability: p * 100,
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

      let navigateUrl =
        location.pathname !== "/"
          ? `${top5[0].className.split(" ").join("_")}`
          : `result/${top5[0].className.split(" ").join("_")}`;

      setResults(top5, navigate(navigateUrl));

      // console.log(top5);
    };
  };

  const cropImage = (image, newX, newY, newWidth, newHeight) => {
    let img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image;

    img.onload = async () => {
      createImageBitmap(img, newX, newY, newWidth, newHeight).then(
        (imageData) => {
          const canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");
          canvas.width = imageData.width;
          canvas.height = imageData.height;
          ctx.drawImage(imageData, 0, 0);

          const newImageURL = canvas.toDataURL("image/jpeg", 1);

          getResult(newImageURL);
        }
      );
    };
  };

  const buildDetectedObjects = (boxes, img) => {
    const bbox = [];
    const minY = boxes[0][0][0] * img.naturalHeight;
    const minX = boxes[0][0][1] * img.naturalWidth;
    const maxY = boxes[0][0][2] * img.naturalHeight;
    const maxX = boxes[0][0][3] * img.naturalWidth;
    bbox[0] = minX;
    bbox[1] = minY;
    bbox[2] = maxX - minX;
    bbox[3] = maxY - minY;

    return bbox;
  };

  const getDetectResult = (predictions, img) => {
    const boxes = predictions[6].arraySync();
    const scores = predictions[7].arraySync();

    if (scores[0][0] < 0.4) {
      getResult(imageURL);
    } else {
      const bbox = buildDetectedObjects(boxes, img);

      const x = bbox[0];
      const y = bbox[1];
      const width = bbox[2];
      const height = bbox[3];

      cropImage(imageURL, x, y, width, height);
    }
  };

  const process_input = (img) => {
    const tfimg = tf.browser.fromPixels(img);
    const expandedimg = tf.expandDims(tfimg, 0);
    return expandedimg;
  };

  const detectImage = (imgeURL, model) => {
    let img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageURL;

    img.onload = async () => {
      tf.engine().startScope();
      model.executeAsync(process_input(img)).then((predictions) => {
        getDetectResult(predictions, img);
        tf.engine().endScope();
      });
    };
  };

  const identify = (callback) => {
    setIsTopLoading(true);
    if (imageURL != null) {
      if (detectionModel !== null && model !== null) {
        Promise.all([detectionModel])
          .then((values) => {
            detectImage(imageURL, values[0]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  return { identify };
};
