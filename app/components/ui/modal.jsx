import CustomButton from "./button";
import { CloseIcon } from "./icons/icons";
function Modal({ children, visible, setVisible }) {
  return (
    <div
      onClick={() => setVisible(false)}
      className={
        visible
          ? "fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 px-4 flex justify-center items-center z-40"
          : "hidden"
      }
    >
      <div
        className="p-6 bg-gray-800 rounded-xl min-w-64 relative"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="absolute right-4 top-4 w-10 h-10 rounded bg-gray-950 p-2 cursor-pointer z-50 hover:bg-[var(--primary)] transition duration-200 ease-linear">
          <CustomButton
            buttonstyle={false}
            callback={() => {
              setVisible(false);
            }}
          >
            <CloseIcon strokeColor="#ffffff" />
          </CustomButton>
        </div>
        <div className="m-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
