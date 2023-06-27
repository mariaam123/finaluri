import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Outputs from "./Outputs";
import Book from "./assets/book.png";
import Search from "./assets/search.png";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Fonts from "./Fonts";
import SadEmoji from "./assets/sad.png";
import Link from "./assets/export.png";

function App() {
  const [word, setWord] = useState("");
  const [results, setResults] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const searchWord = async () => {
    if (word.trim() === "") {
      setIsEmpty(true);
      setIsNotFound(false);
      return;
    }

    setIsEmpty(false);

    const response = await fetch(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
    );

    if (response.ok) {
      const data = await response.json();
      setResults(data[0]);
      setIsNotFound(false);
    } else {
      setResults(null);
      setIsNotFound(true);
    }
  };

  const header = () => {
    if (!results) {
      return {
        audioUrl: null,
        word: null,
        phonetic: null,
      };
    }

    const audio = results.phonetics.find((phone) => phone.audio !== "")?.audio;

    return {
      audioUrl: audio,
      word: results.word,
      phonetic: results.phonetic,
    };
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchWord();
    }
  };
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };
  console.log(results);
  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="my-2 h-14 flex flex-row items-center space justify-between">
        <img src={Book} alt="Book" />
        <div className="my-2 h-14 flex flex-row items-center header-right">
          <Fonts darkMode={darkMode} />
          <div className="h-6 border border-gray-300"></div>
          <label className="relative inline-flex items-center cursor-pointer switch">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={handleDarkModeToggle}
            />
            <div className="w-14 h-8 bg-gray-400 rounded-full relative py-1 px-1">
              <div
                className={`absolute h-6 w-6 rounded-full bg-white transition-transform duration-300 ease-in-out transform ${
                  darkMode ? "translate-x-full" : ""
                }`}
              ></div>
            </div>
          </label>
          <DarkModeOutlinedIcon className="moon color-gray" />
        </div>
      </div>
      <input
        type="text"
        value={word}
        placeholder="Search for any word..."
        onChange={(e) => setWord(e.target.value)}
        onKeyPress={handleKeyPress}
        className={`font-bold w-full bg-gray-100 border ${
          isEmpty ? "border-red-500" : "border-none"
        } outline-none rounded-lg px-3 py-4 shadow-sm`}
      />
      <button className="-mx-14 px-3 py-4 rounded-lg" onClick={searchWord}>
        <img src={Search} width={16} />
      </button>
      {isEmpty && (
        <h5 className="text-[#FF5252] mt-2">Whoops, can't be empty...</h5>
      )}
      {isNotFound && (
        <div className="flex flex-col items-center justify-center mt-28">
          <img src={SadEmoji}></img>
          <h2 className="font-bold mt-4 mb-4">No Definitions Found</h2>
          <p className="text-[#757575] text-center">
            Sorry pal, we couldn't find definitions for the word you were
            looking for. You can try the <br />
            search again at later time or head to the web instead.
          </p>
        </div>
      )}
      {results?.meanings?.length > 0 && (
        <>
          <Header {...header()} />

          {results.meanings.map((meaning, index) => (
            <Outputs
              key={index}
              partOfSpeech={meaning.partOfSpeech}
              definitions={meaning.definitions}
              synonyms={meaning.synonyms}
              word={word}
            />
          ))}
          <hr className="mt-6 mb-4" />
          <div className="flex items-center">
            <p className="text-[#757575] mr-4">Source </p>
            <a
              href={`https://en.wiktionary.org/wiki/${word}`}
              className="flex text-[#2D2D2D] underline"
            >
              {`https://en.wiktionary.org/wiki/${word}`}{" "}
              <img src={Link} className="w-3 h-3 ml-2 mt-1.5"></img>
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
