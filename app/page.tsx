"use client";
import React, { useState } from "react";
import Visualiser from "../components/visualiser";
import { sortingAlgorithms } from "../utils/sortingAlgorithms";

const Home: React.FC = () => {
  const [algorithm, setAlgorithm] =
    useState<keyof typeof sortingAlgorithms>("bubbleSort");
  const [condition, setCondition] = useState("Random");
  const [n, setN] = useState(4);
  const [array, setArray] = useState<number[]>([]);

  const generateScrambledArray = (size: number, condition: string) => {
    if (size < 3 || size > 10) {
      throw new Error("Invalid array size");
    }
    const newArray = Array.from({ length: size }, (_, i) => i + 1);

    if (condition === "Random") {
      return newArray.sort(() => Math.random() - 0.5);
    }
    return newArray.reverse();
  };

  const handleStart = () => {
    setArray(generateScrambledArray(n, condition));
  };

  const handleClear = () => {
    window.location.reload();
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center my-4 font-bold mt-6 lg:mt-20">
        Sorting Algorithm Visualiser
      </h1>

      <div className="flex justify-center my-4 flex-col lg:flex-row">
        <label className="m-4">Algorithm</label>
        <select
          className="border border-gray-300 p-4 py-2 mx-4 rounded-md bg-white text-black"
          value={algorithm}
          onChange={e =>
            setAlgorithm(e.target.value as keyof typeof sortingAlgorithms)
          }
        >
          {Object.keys(sortingAlgorithms).map(alg => (
            <option key={alg} value={alg}>
              {alg}
            </option>
          ))}
        </select>

        <label className="m-4">Condition</label>

        <select
          className="border border-gray-300 p-4 py-2 mx-4 rounded-md bg-white text-black"
          onChange={e => setCondition(e.target.value)}
        >
          <option value="Random">Random</option>
          <option value="Reverse">Reverse</option>
        </select>

        <label className="m-4">{"Array size (3-10)"}</label>
        <input
          className="border border-gray-300 p-4 py-2 mx-4 rounded-md text-black"
          type="number"
          min="3"
          max="10"
          value={n}
          onChange={e => setN(parseInt(e.target.value))}
        />
      </div>
      <div className="flex justify-center my-4 w-full">
        <button
          className="bg-green-500 hover:bg-green-400 text-white rounded-md px-4 py-2 mx-2 w-1/2 lg:w-1/3"
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className="bg-red-500 hover:bg-red-400 text-white rounded-md px-4 py-2 mx-2 w-1/2 lg:w-1/3"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      <Visualiser array={array} algorithm={algorithm} />
    </div>
  );
};

export default Home;
