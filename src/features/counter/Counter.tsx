import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
  multiplyAsync,
  decrementAsync,
} from "./counterSlice";
import styles from "./Counter.module.css";
import { useAppDispatch } from "../../app/store";

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(multiplyAsync(Number(incrementAmount) || 0))}
        >
          Multiply by Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(decrementAsync(Number(incrementAmount) || 0))}
        >
          Decrement by Amount
        </button>
      </div>
    </div>
  );
}
