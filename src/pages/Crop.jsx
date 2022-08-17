import { memo, useState, useContext, useEffect } from "react";
import * as tf from "@tensorflow/tfjs-core";
import image_one from "../assets/1.jpg";
import image_two from "../assets/2.jpg";
import image_three from "../assets/3.jpg";
import { DetectionModelContext } from "../utils/detectionModelContext";

import "./crop.css";

function Crop() {
  const [image, setImage] = useState(image_one);
  const [imagecrop, setImagecrop] = useState(image_two);

  const { detectionModel } = useContext(DetectionModelContext);

  useEffect(() => {
    if (detectionModel !== null && image !== null) {
      Promise.all([detectionModel])
        .then((values) => {
          detectFrame(image, values[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [detectionModel, image]);

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

          setImagecrop(canvas.toDataURL("image/jpeg", 1));
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

  const renderPredictions = (predictions, img) => {
    const boxes = predictions[6].arraySync();
    const bbox = buildDetectedObjects(boxes, img);

    const x = bbox[0];
    const y = bbox[1];
    const width = bbox[2];
    const height = bbox[3];

    cropImage(image, x, y, width, height);
  };

  const process_input = (img) => {
    const tfimg = tf.browser.fromPixels(img);
    const expandedimg = tf.expandDims(tfimg, 0);
    return expandedimg;
  };

  const detectFrame = (imageURL, model) => {
    let img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageURL;

    img.onload = async () => {
      tf.engine().startScope();
      model.executeAsync(process_input(img)).then((predictions) => {
        renderPredictions(predictions, img);
        tf.engine().endScope();
      });
    };
  };

  return (
    <>
      <div>
        <img
          id='frame'
          src={image}
          alt='Upload Preview'
          crossOrigin='anonymous'
          className='image'
        />
      </div>
      <div>
        <img src={imagecrop} alt='indo' className='dmc' />
      </div>
    </>
  );
}

export default memo(Crop);
