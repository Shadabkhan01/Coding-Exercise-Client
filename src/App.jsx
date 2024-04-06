import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
const App = () => {
  const [data, setData] = useState([]);
  const [num, setNum] = useState("");
  const [combData, setCombData] = useState([]);

  const handleAdd = () => {
    if (num) {
      setData([...data, num]);
      setNum("");
    }
  };

  const handleGet = async () => {
    const url = "https://exercise.cyclic.app/fizzbuzz";
    try {
      const receivedData = await axios.post(url, {
        data: data,
      });
      const d = Object.entries(receivedData.data);
      const temp = [];
      for (let i = 0; i < d.length; i++) {
        temp.push({ name: d[i][0], value: d[i][1] });
      }
      setCombData(temp);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="main-container">
      <div>
        <h1 className="head-main">FizzBuzz</h1>
      </div>
      <div className="inner-container">
        <input
          className="inputbox"
          value={num}
          type="number"
          onChange={(e) => {
            setNum(e.target.valueAsNumber);
          }}
        />
        <button onClick={handleAdd}>Add</button>
        <div>
          [
          {data.map((item, index) => (
            <span key={index}>{`${item} `}</span>
          ))}
          ]
        </div>
      </div>
      <div className="inner-container-2">
        <button onClick={handleGet}>Get Data</button>
      </div>
      <div className="inner-container-3">
        <div>
          {combData.length ? (
            combData.map((obj) => (
              <div className="nam-val-wrap">
                <div className="lab-name">{obj.name}</div>
                <div className="arr-val-b">
                  {Array.isArray(obj.value) ? (
                    <div className="arr-val">
                      <span>{obj.value[0]}</span>
                      <span>{obj.value[1]}</span>
                    </div>
                  ) : (
                    <>{obj.value}</>
                  )}
                </div>
              </div>
            ))
          ) : (
            <span>No data found !!!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
