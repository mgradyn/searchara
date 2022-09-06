import { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ImageContext } from "./utils/imageContext";
import { ResultContext } from "./utils/resultContext";
import { ModelProvider } from "./utils/modelContext";
import { CharactersContext } from "./utils/charactersContext";
import { MoviesContext } from "./utils/moviesContext";
import { TopLoadingContext } from "./utils/topLoadingContext";

import "./global.css";

import Progress from "./components/progressBar/progress";

import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";

function App() {
  const [results, setResults] = useState([]);
  const [imageURL, setImageURL] = useState(null);

  const [isTopLoading, setIsTopLoading] = useState(false);
  // const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [characters, setCharacters] = useState([]);

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

  return (
    <>
      <Progress isAnimating={isTopLoading} />
      <Router>
        <ModelProvider>
          <TopLoadingContext.Provider value={providerTopLoading}>
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
          </TopLoadingContext.Provider>
        </ModelProvider>
      </Router>
    </>
  );
}

export default App;
