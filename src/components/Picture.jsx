/* eslint-disable react/jsx-no-target-blank */
import React from "react";

const Picture = ({ data }) => {
  return (
    <div className="picture">
      <p>{data.photographer}</p>
      <div className="imageContainer">
        <img src={data.src.large} alt="無法載入" />
      </div>
      <p>
        下載圖片:{" "}
        <a target="_blank" href={data.src.large}>
          Download
        </a>
      </p>
    </div>
  );
};

export default Picture;
