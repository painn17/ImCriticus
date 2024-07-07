import FetchData from "../fetch";
export async function getFilms() {
  let data = await FetchData(
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
  );
  console.log(data, typeof data);
  return data;
}
