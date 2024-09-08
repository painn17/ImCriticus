import axios from "axios";
import qs from "qs";
export async function getAnime() {
  let data = await axios.get(`http://localhost:1337/api/getanime`, {
    params: {
      populate: {
        image: {
          fields: ["url"],
        },
      },
    },
  });
  console.log(data);
  return data.data;
}

export async function getSingleAnime(id) {
  const token = localStorage.getItem("JWTtoken");
  const params = {
    populate: {
      image: {
        fields: ["url"],
      },
      image_landscape: {
        fields: ["url"],
      },
      reviews: {
        populate: "*", // Популировать все поля внутри reviews
      },
      illustrations: {
        populate: "*",
      },
    },
  };
  const queryString = qs.stringify(params, { encode: false });
  const data = await axios.get(
    `http://localhost:1337/api/getanime/${id}?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
}

export async function pagination(
  sortValue, // Поле для сортировки
  side, // Направление сортировки (:asc или :desc)
  page, // Текущая страница
  pageSize,
  search, // search querry
  genre
) {
  const token = localStorage.getItem("JWTtoken");

  // Формируем параметры для запроса
  const params = {
    populate: {
      image: {
        fields: ["url"],
      },
      image_landscape: {
        fields: ["url"],
      },
      reviews: {
        populate: "*",
      },
    },
    pagination: {
      page: page,
      pageSize: pageSize,
    },
    sort: [`${sortValue}:${side}`], // Сортировка в формате field:direction
  };

  // Если передан критерий поиска, добавляем фильтр
  if (search) {
    params.filters = {
      name: {
        $containsi: search, // Искать по имени аниме
      },
    };
  }
  console.log(genre);

  if (genre && genre.length > 0) {
    console.log(genre);
    params.filters = {
      ...params.filters,
      $and: genre.map((genre) => ({
        genre: {
          $contains: genre.value, // Найти аниме, которое содержит данный жанр
        },
      })),
    };
  }

  // Преобразуем параметры в строку запроса
  const queryString = qs.stringify(params, { encode: false });

  // Формируем полный URL с учетом параметров сортировки и пагинации
  const url = `http://localhost:1337/api/getanime?${queryString}`;

  // Выполняем запрос к API
  const data = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getHomePageData() {
  const params = {
    populate: {
      sliders: {
        fields: ["type", "label"],
      },
    },
  };
  const queryString = qs.stringify(params, { encode: false });
  const data = await axios.get(
    `http://localhost:1337/api/homepage?${queryString}`
  );
  return data;
}
