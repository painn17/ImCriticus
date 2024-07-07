import FetchData from "../fetch";
export async function getGames() {
  let data = await FetchData(
    `https://api.rawg.io/api/games?key=${key}&?page_size=200`
  );
  console.log(data, typeof data);
  return data;
}
