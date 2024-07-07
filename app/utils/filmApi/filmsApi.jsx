import FetchData from "../fetch";
export async function getFilms() {
  const key = "0e5effbbd122e84dc338ff233e609d69";
  let data = await FetchData(
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
  );
  console.log(data, typeof data);
  return data;
}
