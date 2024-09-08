import { ThankYouIcon, CloseIcon } from "./icons/icons";
function Popup({ children, visible, setVisible }) {
  return (
    <div
      onClick={() => setVisible(false)}
      className={
        visible
          ? "fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
          : "hidden"
      }
    >
      <div
        className="p-6 bg-gray-900 flex flex-col items-center rounded-3xl relative backdrop-blur-xl bg-opacity-55"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div
          className="absolute right-6 top-6 rounded bg-gray-950 p-2 cursor-pointer"
          onClick={() => setVisible(false)}
        >
          <CloseIcon />
        </div>
        <div className="p-20 gap-6 text-center items-center flex flex-col">
          <ThankYouIcon />
          <div className="heading-four text-gray-50">
            Thank you for your suggestion
          </div>
          <div className="body-regular text-gray-400 max-w-80">
            Your suggestion has been succesfully added to my watchlist, I will
            manage sometime to watch your suggestion.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
