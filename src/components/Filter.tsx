import { ReactElement, useState } from "react";
import "./Filter.scss";
import Dropdown from "./Dropdown";

const Filter = (): ReactElement => {
  return (
    <div className="task-container">
      <p className="task-text">Tasks</p>
      <Dropdown />
    </div>
  );
};

export default Filter;
