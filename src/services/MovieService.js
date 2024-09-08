import apiClient from "./AxiosClient"

export const getMovieList = () => {
    return apiClient.get('movies/api/v1/movie');
  };

  export const getMovieById = (id) => {
    return apiClient.get('movies/api/v1/movie/'+id);
  };  

  export const getMoviePagination = (page, limit, genre) =>{
    return apiClient.get('movies/api/v1/movie/pagination?page='+page+'&limit='+limit+'&genre='+genre);
  }

  export const searchMovie = (search) =>{
    return apiClient.get('movies/api/v1/movie/select?input='+search)
  }