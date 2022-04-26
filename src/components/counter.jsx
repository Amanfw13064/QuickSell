import { useState, useEffect } from "react";
import axios from "axios";
import "dotenv";

import {Counter2} from './counter2'
export const Counter = () => {
  const [count, setCount] = useState(1);
  const [loading, setloading] = useState(false);
  let max =1000;

  useEffect(() => {
    MakeRequest();
  }, []);
  const MakeRequest = () => {
    axios
      .get(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json"
      )
      .then(({ data }) => {
        setCount(data || 1);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const MakePut = () => {
    setloading(true);
    axios
      .put(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",
        {
          counter1:count
        }
      )
      .then(() => {
        setloading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleCount = (val) => {
    setCount(count + val);
    
  };
  return (
    <div>
      {" "}
      <div
        style={loading ? { visibility: "visible" } : { visibility: "hidden" }}
        id="save"
      >
        <div id="div-su"></div>Saving counter value
      </div>
      <div id="count">
        <div
          onClick={() => {
            handleCount(-1);
            MakePut();
          }}
        >
          -
        </div>
        <div>
          <input
            onChange={(e) => {
              setCount(+e.target.value);
              MakePut()
            }}
            type="number"
            value={count}
          />
        </div>
        <div
          onClick={() => {
            handleCount(1);
            MakePut();
          }}
        >
          +
        </div>
      </div>
      <Counter2 Count={count} />
    </div>
  );
};
