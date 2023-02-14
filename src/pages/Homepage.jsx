/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";
import axios from "axios";

const Homepage = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");

  const apiKey = "";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${input}&page=1&per_page=15`;

  const search = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: apiKey },
    });
    // console.log(result);
    setData(result.data.photos);
    setCurrentSearch(input);
  };

  const morePicture = async () => {
    let newURL;
    setPage(page + 1);
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${
        page + 1
      }&per_page=15`;
    }

    let result = await axios.get(newURL, {
      headers: { Authorization: apiKey },
    });
    setData(data.concat(result.data.photos));
  };

  useEffect(() => {
    search(initialURL);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d, index) => {
            return <Picture data={d} key={index} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>更多圖片</button>
      </div>
    </div>
  );
};

export default Homepage;
