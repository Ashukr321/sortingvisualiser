"use client";

import React, { useEffect, useState } from "react";
import { sortingAlgorithms } from "@/utils/sortingAlgorithms";

interface VisualiserProps {
  array: number[];
  algorithm: keyof typeof sortingAlgorithms;
}

const Visualiser: React.FC<VisualiserProps> = ({ array, algorithm }) => {
  const [sortedArray, setSortedArray] = useState<number[]>(array);

  useEffect(() => {
    setSortedArray(array);
    setTimeout(() => {
      sortArray();
    }, 2000);
    const sortArray = async () => {
      const newArr = await sortingAlgorithms[algorithm](array, updatedArray => {
        setSortedArray(updatedArray);
      });
      setSortedArray(newArr);
    };
  }, [array]);

  const generateBlueShade = (value: number, max: number) => {
    const hue = 240;
    const saturation = 100;
    const lightness = 100 - Math.floor((value / max) * 70);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const maxValue = Math.max(...sortedArray);
  const barWidth = 20; // adjust this value to change the width of the bars
  const barHeightScale = 300 / maxValue; // adjust this value to change the height of the bars

  // Sort the last 10 elements of the array
  const last10Elements = sortedArray.slice(-10);

  return (
    <div className="histogram-container">
      <div className="histogram-row">
        {last10Elements.map((value, index) => (
          <div
            key={index}
            className="histogram-bar"
            style={{
              display: "inline-block", // Add this line
              width: barWidth + "px", // set a fixed width for each bar
              height: value * barHeightScale + "px", // scale the height based on the value
              backgroundColor: generateBlueShade(value, maxValue),
              marginRight: 2, // add some margin between bars
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Visualiser;
