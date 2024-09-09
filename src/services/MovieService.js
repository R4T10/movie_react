import apiClient from "./AxiosClient"

export const getMovieListNewest = () => {
    return apiClient.get('movies/api/v1/movie_newest');
  };
  export const getMovieList = () => {
    return apiClient.get('movies/api/v1/movie');
  };

  export const getRandomMovieList = () => {
    return apiClient.get('movies/api/v1/movie/random-movies');
  };

  export const getMovieById = (id) => {
    return apiClient.get('movies/api/v1/movie/'+id);
  };  

  export const getMoviePagination = (page, limit, genre) =>{
    return apiClient.get('movies/api/v1/movie/pagination?page='+page+'&limit='+limit+'&genre='+genre);
  }

  export const searchMovie = (page,limit,search) =>{
    return apiClient.get('movies/api/v1/movie/search?page='+page+'&limit='+limit+'&input='+search)
  }

  export const sortMovie = (page,limit,sort) =>{
    return apiClient.get('movies/api/v1/movie/sorted_movies?page='+page+'&limit='+limit+'&input_number='+sort)
  }