import { useState, useEffect, useRef, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadGraphModel } from "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import { ImageContext } from "./utils/imageContext";
import { ResultContext } from "./utils/resultContext";
import { ModelContext } from "./utils/modelContext";
import { CharactersContext } from "./utils/charactersContext";
import { MoviesContext } from "./utils/moviesContext";
import "./global.css";

function App() {
  const [results, setResults] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [model, setModel] = useState(null);

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

  const providerModel = useMemo(() => ({ model, setModel }), [model, setModel]);

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await loadGraphModel("./model/model.json");
      setModel(model);
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
    return <h2>Model Loading....</h2>;
  }
  return (
    <Router>
      <ModelContext.Provider value={providerModel}>
        <ImageContext.Provider value={providerImage}>
          <ResultContext.Provider value={providerResults}>
            <CharactersContext.Provider value={providerCharacters}>
              <MoviesContext.Provider value={providerMovies}>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/result' element={<SearchResult />} />
                  <Route path='*' element={<SearchResult />} />
                </Routes>
              </MoviesContext.Provider>
            </CharactersContext.Provider>
          </ResultContext.Provider>
        </ImageContext.Provider>
      </ModelContext.Provider>
    </Router>
  );
}

export default App;
