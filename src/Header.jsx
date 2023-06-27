import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useRef } from "react";
function Header({ audioUrl, word, phonetic }) {
  const ref = useRef();

  const displayAudio = () => {
    ref.current.play();
  };
  return (
    <>
      <div className="flex flex-row justify-between my-5 mt-10">
        <h3 className="font-bold text-3xl font-serif ">
          {word}
          <span className="block font-normal text-sm text-purple-600 mt-4">
            {phonetic}
          </span>
        </h3>
        <div className="group cursor-pointer">
          <div
            onClick={displayAudio}
            className=" bg-purple-300 h-12 w-12 rounded-full flex items-center justify-center hover:bg-[#A445ED]"
          >
            <PlayArrowIcon className="w- h-4 text-[#A445ED] group-hover:text-white" />
          </div>
        </div>
      </div>

      <audio className="hidden" ref={ref} src={audioUrl}></audio>
    </>
  );
}

export default Header;
