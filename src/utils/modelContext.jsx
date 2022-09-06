import { createContext, useEffect, useState, useMemo } from "react";
import "@tensorflow/tfjs-backend-webgl";
import { loadGraphModel } from "@tensorflow/tfjs-converter";
import { InitInference } from "../utils/iniInference";
import Loading from "../pages/Loading";

export const ModelContext = createContext(null);
export const DetectionModelContext = createContext(null);

export const ModelProvider = ({ children }) => {
  const [model, setModel] = useState(null);

  const [detectionModel, setDetectionModel] = useState(null);

  const [isModelLoading, setIsModelLoading] = useState(false);

  const { initClassificationInference, initDetectionInference } =
    InitInference();

  const providerModel = useMemo(() => ({ model, setModel }), [model, setModel]);

  const providerDetectionModel = useMemo(
    () => ({ detectionModel, setDetectionModel }),
    [detectionModel, setDetectionModel]
  );

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      await loadGraphModel("./model/classifier/model.json")
        .then((model) => {
          //   "https://raw.githubusercontent.com/mgradyn/ani_i2/main/model.json"
          initClassificationInference(model);
          setModel(model);
        })
        .then(async () => {
          await loadGraphModel("./model/detector/model.json").then((model) => {
            //   "https://raw.githubusercontent.com/mgradyn/an_i/main/model.json"
            initDetectionInference(model).then(() => {
              setDetectionModel(model);
              setIsModelLoading(false);
            });
          });
        });
    } catch (error) {
      console.log(error);
      // setIsModelLoading(true);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  if (isModelLoading) {
    return <Loading />;
  }
  return (
    <ModelContext.Provider value={providerModel}>
      <DetectionModelContext.Provider value={providerDetectionModel}>
        {children}
      </DetectionModelContext.Provider>
    </ModelContext.Provider>
  );
};
