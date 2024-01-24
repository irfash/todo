import React, { useEffect, useState } from "react";
import "./New.css";
const Searchbar = () => {
  const initialState = {
    title: "",
    description: "",
  };

  const [inputValue, setInputValue] = useState(() => {
    const localInput = localStorage.getItem("localInput");
    return localInput ? JSON.parse(localInput) : initialState;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((p) => ({ ...p, [name]: value }));
  };

  useEffect(() => {
    localStorage.setItem("localInput", JSON.stringify(inputValue));
  }, [inputValue]);

  return (
    <div className="task-component">
      <div className="title-group">
        <input
          type="text"
          name="title"
          className={`input-field ${inputValue.title ? "triggered" : ""}`}
          placeholder="Things to do"
          value={inputValue.title}
          onChange={(e) => handleInputChange(e)}
        />
        <button
          className={`btn-clear ${inputValue.title ? "" : "hidden"}`}
          onClick={() => {
            setInputValue(initialState);
          }}
        >
          X
        </button>
      </div>
      {inputValue.title && (
        <div className="text-area-group">
          <textarea
            name="description"
            value={inputValue.description}
            className="text-area"
            placeholder="Tell about your task"
            onChange={(e) => handleInputChange(e)}
          />
          <button
            className={`btn-add ${inputValue ? "" : "hidden"}`}
            onClick={() => {
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
