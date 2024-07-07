import { useState } from "react";

function GameCard({ data }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="pointer-events-none select-none">
      <div>Games Tier List</div>
      <div className="grid grid-cols-4">
        {data.map((item) => {
          return (
            <div className="flex flex-col p-4 rounded gap-1" key={item.id}>
              <div>{item.name}</div>
              <div>
                <img className=" h-56 " src={item.background_image} alt="" />
              </div>
              <div className="flex justify-between">
                <div className="text-gray-400">{item.genres[0].name}</div>
                <div> MC Rating: {item.metacritic}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GameCard;
