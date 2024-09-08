import { Oval } from "react-loader-spinner";
function Loader({ loading }) {
  return (
    <Oval
      visible={loading}
      height="40"
      width="40"
      color="#5A4AF4"
      secondaryColor="#B66DFF"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}

export default Loader;
