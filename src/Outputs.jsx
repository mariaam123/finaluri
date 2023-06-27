import React from "react";

function Outputs({ partOfSpeech, definitions, synonyms, word }) {
  return (
    <>
      <div className="p-4">
        <div className="my-3">
          <div className="flex flex-row items-center text-lg font-bold font-serif">
            <h4 className="italic mb-4">{partOfSpeech}</h4>
            <hr className="w-full ml-20"></hr>
          </div>
          <p className="text-[#757575] mt-3 font-semibold mb-4">Meaning</p>
          {definitions.map((definition, index) => (
            <div key={index}>
              <p>{definition.definition}</p>
              {definition.example && (
                <p className="text-[#757575] mt-2">"{definition.example}"</p>
              )}
            </div>
          ))}
          {synonyms.length > 0 && (
            <p className="text-[#757575] text-sm mt-6">
              Synonyms{" "}
              {synonyms.map((synonym, index) => (
                <span key={index} className="text-[#A445ED] mx-1 font-bold">
                  {synonym}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Outputs;
