import { ArrowRightIcon } from "./icons/icons";
import Carousel from "react-multi-carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function CustomSlider({ children, slidesToShow, infinite = false }) {
  const NextArrow = ({ onClick }) => {
    return (
      <div
        onClick={onClick}
        className="absolute -right-11 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-[var(--primary)] rounded-full p-2 transition ease-linear duration-200 hover:scale-105"
      >
        <ArrowRightIcon strokeColor="white" />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div
        onClick={onClick}
        className="absolute -left-11 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-[var(--primary)] rounded-full p-2 transition ease-linear duration-200 hover:scale-105 rotate-180"
      >
        <ArrowRightIcon strokeColor="white" />
      </div>
    );
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 4, // По умолчанию показывать 4 слайда
    slidesToScroll: 1,
    // lazyLoad: "ondemand",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Для экранов шириной меньше 1024px
        settings: {
          slidesToShow: 3, // Показывать 3 слайда
        },
      },
      {
        breakpoint: 768, // Для экранов шириной меньше 768px
        settings: {
          slidesToShow: 2, // Показывать 2 слайда
        },
      },
      {
        breakpoint: 480, // Для экранов шириной меньше 480px
        settings: {
          slidesToShow: 1, // Показывать 1 слайд
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="">
      {children}
    </Slider>
  );
}

export default CustomSlider;
