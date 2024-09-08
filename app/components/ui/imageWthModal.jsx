import { useModal } from "@/app/context/ModalContext";
import CustomButton from "./button";

function ImageWithModal({ url }) {
  const { showModal } = useModal();

  return (
    <>
      {url ? (
        <div className="flex justify-center items-center h-[400px]">
          <CustomButton
            buttonstyle={false}
            callback={() => {
              showModal(
                <img
                  src={`http://localhost:1337${url}`}
                  alt="Modal Image"
                  className="h-auto max-h-[640px] w-auto"
                />
              );
            }}
          >
            <img
              src={`http://localhost:1337${url}`}
              alt="Thumbnail"
              className="h-auto w-auto max-h-[350px] mx-auto"
            />
          </CustomButton>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[400px]">
          <img
            src={`http://localhost:1337/uploads/Image_Placeholder_2444e47cd2.png`}
            alt="Placeholder"
            className="h-auto w-auto max-h-[350px] mx-auto"
          />
        </div>
      )}
    </>
  );
}

export default ImageWithModal;
