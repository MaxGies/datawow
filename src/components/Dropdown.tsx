import { ReactElement, ReactNode, useState, useEffect, useRef } from "react";
import "./Dropdown.scss";

interface Dropdown {
  itemList: string[];
  children?: ReactNode;
}

const Dropdown = ({ itemList, children }: Dropdown): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterSelect, setFilterSelect] = useState<string>(itemList[0]);
  const menu = useRef<HTMLDivElement | null>(null);

  const toggling = () => setIsOpen(!isOpen);

  const selectOption = (value: string) => {
    setFilterSelect(value);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: TouchEvent | MouseEvent) {
      if (menu.current && !menu.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menu]);

  return (
    <div className="filter-container" ref={menu}>
      <div className="header-box" onClick={toggling}>
        {children ? children : filterSelect}
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
          >
            <path
              d="M6.50423 0.420898L3.99998 2.92515L1.49573 0.420898L0.670898 1.24573L3.99998 4.57482L7.32907 1.24573L6.50423 0.420898Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown-container">
          <ul className="dropdown-list">
            {itemList.map((item) => (
              <li
                key={item}
                className={`list-item ${filterSelect === item && "selected"}`}
                onClick={() => selectOption(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
