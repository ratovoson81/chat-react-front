import { FireFilled, FireOutlined } from "@ant-design/icons";
import React from "react";
import { ThemeContext } from "./ThemeContext";
//import { FaSun, FaMoon} from "react-icons/fa";

const Toggle = () => {
  const { theme, setTheme }: any = React.useContext(ThemeContext);

  return (
    <div className="transition duration-500 ease-in-out rounded-full p-2">
      {theme === "dark" ? (
        <FireOutlined
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      ) : (
        <FireFilled
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      )}
    </div>
  );
};

export default Toggle;
