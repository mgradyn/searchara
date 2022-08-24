import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadGraphModel } from "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";

import { ImageContext } from "./utils/imageContext";
import { ResultContext } from "./utils/resultContext";
import { ModelContext } from "./utils/modelContext";
import { DetectionModelContext } from "./utils/detectionModelContext";
import { CharactersContext } from "./utils/charactersContext";
import { MoviesContext } from "./utils/moviesContext";
import { TopLoadingContext } from "./utils/topLoadingContext";

import "./global.css";

import Progress from "./components/progressBar/progress";

import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import Loading from "./pages/Loading";

function App() {
  const [results, setResults] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [model, setModel] = useState(null);
  const [detectionModel, setDetectionModel] = useState(null);

  const [isTopLoading, setIsTopLoading] = useState(false);
  // const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [characters, setCharacters] = useState([]);

  const [isModelLoading, setIsModelLoading] = useState(false);

  const providerResults = useMemo(
    () => ({ results, setResults }),
    [results, setResults]
  );

  const providerImage = useMemo(
    () => ({ imageURL, setImageURL }),
    [imageURL, setImageURL]
  );

  const providerMovies = useMemo(
    () => ({ movies, setMovies }),
    [movies, setMovies]
  );

  const providerCharacters = useMemo(
    () => ({ characters, setCharacters }),
    [characters, setCharacters]
  );

  const providerTopLoading = useMemo(
    () => ({ isTopLoading, setIsTopLoading }),
    [isTopLoading, setIsTopLoading]
  );

  const providerModel = useMemo(() => ({ model, setModel }), [model, setModel]);

  const providerDetectionModel = useMemo(
    () => ({ detectionModel, setDetectionModel }),
    [detectionModel, setDetectionModel]
  );

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await loadGraphModel("./model/classifier/model.json");
      //   "https://raw.githubusercontent.com/mgradyn/ani_i2/main/model.json"
      setModel(model);

      const detectionModel = await loadGraphModel(
        "./model/detector/model.json"
      );
      //   "https://raw.githubusercontent.com/mgradyn/an_i/main/model.json"
      setDetectionModel(detectionModel);

      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  if (isModelLoading) {
    return <Loading />;
  }
  return (
    <>
      <Progress isAnimating={isTopLoading} />
      <Router>
        <TopLoadingContext.Provider value={providerTopLoading}>
          <DetectionModelContext.Provider value={providerDetectionModel}>
            <ModelContext.Provider value={providerModel}>
              <ImageContext.Provider value={providerImage}>
                <ResultContext.Provider value={providerResults}>
                  <CharactersContext.Provider value={providerCharacters}>
                    <MoviesContext.Provider value={providerMovies}>
                      <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/result/' element={<SearchResult />}>
                          <Route path=':classname' element={<SearchResult />} />
                        </Route>
                        <Route path='*' element={<Home />} />
                      </Routes>
                    </MoviesContext.Provider>
                  </CharactersContext.Provider>
                </ResultContext.Provider>
              </ImageContext.Provider>
            </ModelContext.Provider>
          </DetectionModelContext.Provider>
        </TopLoadingContext.Provider>
      </Router>
    </>
  );
}

export default App;
