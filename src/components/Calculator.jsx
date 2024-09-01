import React, { Component } from "react";
import Display from "./Display";
import Button from "./Button";
import BUTTONS from "../data/buttons";

class Calculator extends Component {
  state = {
    displayValue: "",
    operator: "",
    previousValue: "",
  };

  handleButtonClick = (value) => {
    if (["+", "-", "*", "/"].includes(value)) {
      if (this.state.displayValue === "" && value !== "-") return; // Ignore if operator is first or duplicate
      this.setState((prevState) => ({
        operator: value,
        previousValue: prevState.displayValue,
        displayValue: prevState.displayValue + value,
      }));
    } else if (value === "=") {
      try {
        const result = eval(this.state.displayValue);
        this.setState({ displayValue: result.toString() });
      } catch (error) {
        this.setState({ displayValue: "Error" });
      }
    } else if (value === "C") {
      this.setState({ displayValue: "", operator: "", previousValue: "" });
    } else {
      this.setState((prevState) => ({
        displayValue: prevState.displayValue + value,
      }));
    }
  };

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <div className="buttons">
          {BUTTONS.map((button, index) => (
            <Button
              key={index}
              onClick={() => this.handleButtonClick(button.value)}
              value={button.value}
              className={button.className}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Calculator;
