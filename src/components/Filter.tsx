import { ReactElement, useState } from "react";
import "./Filter.scss";
import Dropdown from "./Dropdown";

const filterType = ["All", "Done", "Undown"];

const Filter = (): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterSelect, setFilterSelect] = useState<string>(filterType[0]);

  const toggling = () => setIsOpen(!isOpen);

  const selectOption = (value: string) => {
    setFilterSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="task-container">
      <p className="task-text">Tasks</p>
      <Dropdown itemList={filterType} />
    </div>
  );
};

export default Filter;
