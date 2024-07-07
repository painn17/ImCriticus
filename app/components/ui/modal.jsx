function Modal({ children, visible, setVisible }) {
  return (
    <div
      className={
        visible
          ? "fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
          : "hidden"
      }
    >
      <div className="p-6 bg-white rounded min-w-64">{children}</div>
    </div>
  );
}

export default Modal;
