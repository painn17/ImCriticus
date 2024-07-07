import axios from "axios";

export default async function FetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Пробрасываем ошибку
  }
}
