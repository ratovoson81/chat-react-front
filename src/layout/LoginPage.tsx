import { useLocation } from "react-router-dom";
import "../css/loginPage.css";
import { gradient } from "../css/gradient";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings, Slides } from "./SlideLogin";

type props = {
  children: React.ReactNode;
};

const LoginPage: React.FC<props> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="h-screen flex overflow-hidden ">
      <div className="w-1/2 login">
        <Slider {...settings}>
          {Slides.map((slide, i) => (
            <img key={i} src={slide.url} alt="" />
          ))}
        </Slider>
      </div>
      <div className="flex-1 self-center">
        <div className="font-sans">
          <div className="relative min-h-screen flex flex-col sm:justify-center items-center">
            <div className="relative sm:max-w-sm w-full">
              <div
                className={`card shadow-lg w-full h-full rounded-3xl absolute transform ${gradient(
                  location.pathname
                )}`}
              ></div>
              <div className="relative">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
