import CustomButton from "./ui/button";

function CustomAlert({ children, callback, setVisible }) {
  const handleAbort = () => {
    console.log("abort");

    setVisible(false);
  };
  const handleContinue = () => {
    console.log("continue");
    setVisible(false);
  };
  return (
    <div className="p-4 flex flex-col gap-8">
      <div className="warning-text heading-two">
        Are you sure you want to do this?
      </div>
      <div className="flex gap-8 justify-evenly">
        <CustomButton
          callback={() => {
            handleAbort();
          }}
        >
          <div className="error-text heading-three">No</div>
        </CustomButton>
        <CustomButton
          callback={() => {
            handleContinue();
          }}
        >
          <div className="success-text heading-three">Yes</div>
        </CustomButton>
      </div>
    </div>
  );
}

export default CustomAlert;
