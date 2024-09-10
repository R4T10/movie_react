import apiClient from "./AxiosClient"
export const addFavoriteMovie = (username, movieId) => {
    return apiClient.post('users/api/v1/add-favorite', {
        username: username,
        movieId: movieId
    })
}
export const checkFavorite = (username, movieId) => {
    return apiClient.get('users/api/v1/check-favorite/'+username+'/'+movieId);
};

export const removeFavoriteMovie = (username, movieId) => {
    return apiClient.delete('users/api/v1/remove-favorite/'+username+'/'+movieId);
  };

  export const getFavorite = (username) => {
    return apiClient.get('users/api/v1/favorites/'+username);
  };