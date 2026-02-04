import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const result = calculate(previousValue, inputValue, operator);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (prev, current, op) => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "*":
        return prev * current;
      case "/":
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operator) {
      const result = calculate(previousValue, inputValue, operator);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <h1>Calculadora</h1>
        <div className="display">{display}</div>
        <div className="buttons">
          <button className="btn btn-clear" onClick={handleClear}>C</button>
          <button className="btn btn-operator" onClick={() => handleOperator("/")}>/</button>
          <button className="btn btn-operator" onClick={() => handleOperator("*")}>*</button>
          <button className="btn btn-operator" onClick={() => handleOperator("-")}>-</button>

          <button className="btn" onClick={() => handleNumber(7)}>7</button>
          <button className="btn" onClick={() => handleNumber(8)}>8</button>
          <button className="btn" onClick={() => handleNumber(9)}>9</button>
          <button className="btn btn-operator" onClick={() => handleOperator("+")}>+</button>

          <button className="btn" onClick={() => handleNumber(4)}>4</button>
          <button className="btn" onClick={() => handleNumber(5)}>5</button>
          <button className="btn" onClick={() => handleNumber(6)}>6</button>
          <button className="btn btn-equals" onClick={handleEquals}>=</button>

          <button className="btn" onClick={() => handleNumber(1)}>1</button>
          <button className="btn" onClick={() => handleNumber(2)}>2</button>
          <button className="btn" onClick={() => handleNumber(3)}>3</button>
          <button className="btn" onClick={() => handleNumber(0)}>0</button>

          <button className="btn" onClick={handleDecimal}>.</button>
        </div>
      </div>
    </div>
  );
}
