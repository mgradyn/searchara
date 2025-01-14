import { useContext } from "react";
import { CharactersContext } from "./charactersContext";
import { MoviesContext } from "./moviesContext";

export const FetchHandler = () => {
  const { setCharacters } = useContext(CharactersContext);
  const { setMovies } = useContext(MoviesContext);

  const characterQuery = `
query ($id: Int, $id2: Int, $id3: Int, $id4: Int, $id5: Int){
  character0: Character (id: $id) {
      id
      name{
          full
      }
      siteUrl
      image{
          large
      }
      description(asHtml:true)
  }
  character1: Character (id: $id2) {
      id
      name{
          full
      }
      siteUrl
      image{
          large
      }
      description(asHtml:true)
  }
  character2: Character (id: $id3) {
      id
      name{
          full
      }
      siteUrl
      image{
          large
      }
      description(asHtml:true)
  }
  character3: Character (id: $id4) {
      id
      name{
          full
      }
      siteUrl
      image{
          large
      }
      description(asHtml:true)
  }
  character4: Character (id: $id5) {
      id
      name{
          full
      }
      siteUrl
      image{
          large
      }
      description(asHtml:true)
  }
}
`;

  const movieQuery = `
query ($id: Int){
    character0: Character (id: $id) {
        media(type:ANIME, page: 1, perPage: 10){
            edges {
                node{
                 id
                 siteUrl
                 title {
                 romaji
                 english
                 native
                }
                coverImage{
                    extraLarge
                }
                bannerImage
                }
            }
        }
    }
}
`;

  const handleResponse = (response) => {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  };

  const handleMoviesData = (data) => {
    // console.log(data);
    // let temp = results;
    // console.log(results);

    setMovies(data.data.character0.media.edges);
    // console.log(data.data.character0.media.edges);
  };

  const handleCharacters = (data) => {
    // console.log(data);
    // let temp = results;
    // console.log(results);

    data = data.data;
    data = Object.keys(data).map(function (_) {
      return data[_];
    });
    // console.log(results);
    // console.log(data);
    setCharacters(data);
  };

  const handleError = (error) => {
    alert("Error, check console");
    console.error(error);
  };

  const getCharacters = (variables) => {
    fetchRequest(variables, characterQuery, handleCharacters);
  };

  const getMovies = (variables) => {
    setMovies([]);
    fetchRequest(variables, movieQuery, handleMoviesData);
  };

  const fetchRequest = (variables, query, handleData) => {
    var url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };

    fetch(url, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError);
  };

  return { getCharacters: getCharacters, getMovies: getMovies };
};
