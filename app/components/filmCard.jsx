import { useState } from "react";

function FilmCard({ data }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="pointer-events-none select-none">
      <div className="grid grid-cols-4">
        {data.map((item) => {
          return (
            <div className="flex flex-col p-4 rounded gap-1" key={item.id}>
              <div>{item.title}</div>
              <div>
                <img
                  className=" h-56 "
                  src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                  alt=""
                />
              </div>
              <div className="flex justify-between">
                {/* <div className="text-gray-400">{item.genres[0].name}</div> */}
                <div> MC Rating: {item.vote_average}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FilmCard;
