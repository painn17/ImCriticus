import FetchData from "../fetch";
export async function getGames() {
  const key = "0bc76dcac2314ee99b453f779f7a5bb6";
  let data = await FetchData(
    `https://api.rawg.io/api/games?key=${key}&?page_size=200`
  );
  console.log(data, typeof data);
  return data;
}
