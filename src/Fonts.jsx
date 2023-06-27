import React, { useState, useEffect } from "react";
import Arrow from "./assets/arrow.png";

const Fonts = ({ darkMode }) => {
  const [selectedFont, setSelectedFont] = useState("sans-serif");
  const [appliedFont, setAppliedFont] = useState("sans-serif");
  const [isOptionsVisible, setOptionsVisible] = useState(false);

  useEffect(() => {
    setAppliedFont(getAppliedFont());
  }, []);

  const getAppliedFont = () => {
    const bodyStyle = document.defaultView.getComputedStyle(document.body);
    return bodyStyle.fontFamily;
  };

  const handleFontChange = (font) => {
    setSelectedFont(font);
    document.body.style.fontFamily = font;
    setAppliedFont(getAppliedFont());
  };

  const handleOptionsVisibility = (isVisible) => {
    setOptionsVisible(isVisible);
  };

  return (
    <section className={`fonts-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="relative w-38">
        <div
          className={
            "selected-font w-full px-4 py-2 rounded bg-white text-gray-700 leading-tight focus:outline-none cursor-pointer flex"
          }
          onClick={() => handleOptionsVisibility(!isOptionsVisible)}
        >
          <span className="capitalize font-bold">{selectedFont}</span>
          <img src={Arrow} alt="Dropdown Arrow" className="h-2 w-3 ml-2" />
        </div>
        <div
          className={`absolute top-full left-0 mt-1 bg-white shadow-md dropdown pr-12 pt-2 pb-2 font-bold ${
            isOptionsVisible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <div
            className="px-4 py-2 cursor-pointer hover:text-purple-600"
            onClick={() => handleFontChange("sans-serif")}
          >
            Sans-serif
          </div>
          <div
            className="px-4 py-2 cursor-pointer hover:text-purple-600"
            onClick={() => handleFontChange("serif")}
          >
            Serif
          </div>
          <div
            className="px-4 py-2 cursor-pointer hover:text-purple-600"
            onClick={() => handleFontChange("monospace")}
          >
            Monospace
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fonts;
