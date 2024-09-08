import FriendHandleCard from "./friendHandleCard";

function FriendsList({ type = "friends", list, children }) {
  return (
    <div className="flex flex-col gap-3 col-span-1">
      <div className="text-gray-50 heading-four max-md:text-center">
        {children}
      </div>
      <div className="max-h-56 gap-2 flex flex-col bg-gray-700 p-3 rounded-lg bg-opacity-30 overflow-x-hidden overflow-y-visible ">
        {list?.length <= 0 ? (
          <div className="primary-text heading-five ">
            <div>Nobody here</div>
          </div>
        ) : (
          list?.map((item) => {
            return (
              <div key={item.id}>
                <FriendHandleCard type={type} item={item}></FriendHandleCard>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default FriendsList;
