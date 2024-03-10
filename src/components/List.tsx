import { useEffect, useState, useRef, ReactElement } from "react";
import "./List.scss";

const menuList = ["Edit", "Delete"];

interface List {
  isNew?: boolean;
  isComplete: boolean;
  listDetail: string | number;
}

const List = ({ isNew, isComplete, listDetail }: List): ReactElement => {
  const [inputText, setInputText] = useState<string | number>(listDetail);
  const [isCheck, setIsCheck] = useState<boolean>(isComplete);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const menu = useRef<HTMLDivElement | null>(null);

  const togglingCheck = () => setIsCheck(!isCheck);
  const togglingDropdown = () => setIsDropdown(!isDropdown);
  const togglingEdit = () => setIsEdit(!isEdit);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === " Enter" && isNew) {
      // handleAdd
    }
  };

  const handleMenu = (type: string) => {
    if (type === menuList[0]) {
      togglingEdit();
    } else if (type === menuList[1]) {
      // handleDelete
    }
    setIsDropdown(false);
  };

  useEffect(() => {
    if (isNew) {
      setIsEdit(isNew);
    }
  }, [isNew]);

  useEffect(() => {
    function handleClickOutside(event: TouchEvent | MouseEvent) {
      if (menu.current && !menu.current.contains(event.target as Node)) {
        setIsDropdown(false);
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
    <div className="list-container">
      <div className={`input-section ${isCheck && "checked"}`}>
        {!isEdit && (
          <div className="custom-checkbox" onClick={togglingCheck}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="9"
              viewBox="0 0 11 9"
              fill="none"
              className="icon"
            >
              <path
                d="M4.08339 6.04014L1.75085 3.7076L0.749268 4.70918L4.08339 8.04331L10.9592 1.16751L9.9576 0.165932L4.08339 6.04014Z"
                fill="white"
              />
            </svg>
          </div>
        )}
        {isEdit ? (
          <input
            type="text"
            placeholder="Add your todo..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="input-todo"
            onKeyDown={handleKeyPress}
          />
        ) : (
          <p className="list-text">{inputText}</p>
        )}
      </div>
      {!isNew && (
        <div className="menu-section" ref={menu}>
          {isEdit ? (
            <p className="save-edit" onClick={togglingEdit}>
              Save
            </p>
          ) : (
            <div className="menu-container">
              <div className="icon-container" onClick={togglingDropdown}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="6"
                  viewBox="0 0 20 6"
                  fill="none"
                >
                  <path
                    d="M5.19941 2.99986C5.19941 3.63638 4.94656 4.24683 4.49647 4.69692C4.04638 5.147 3.43593 5.39986 2.79941 5.39986C2.16289 5.39986 1.55245 5.147 1.10236 4.69692C0.65227 4.24683 0.399414 3.63638 0.399414 2.99986C0.399414 2.36334 0.65227 1.75289 1.10236 1.30281C1.55245 0.852718 2.16289 0.599861 2.79941 0.599861C3.43593 0.599861 4.04638 0.852718 4.49647 1.30281C4.94656 1.75289 5.19941 2.36334 5.19941 2.99986ZM12.3994 2.99986C12.3994 3.63638 12.1466 4.24683 11.6965 4.69692C11.2464 5.147 10.6359 5.39986 9.99941 5.39986C9.3629 5.39986 8.75245 5.147 8.30236 4.69692C7.85227 4.24683 7.59941 3.63638 7.59941 2.99986C7.59941 2.36334 7.85227 1.75289 8.30236 1.30281C8.75245 0.852718 9.3629 0.599861 9.99941 0.599861C10.6359 0.599861 11.2464 0.852718 11.6965 1.30281C12.1466 1.75289 12.3994 2.36334 12.3994 2.99986ZM17.1994 5.39986C17.8359 5.39986 18.4464 5.147 18.8965 4.69692C19.3466 4.24683 19.5994 3.63638 19.5994 2.99986C19.5994 2.36334 19.3466 1.75289 18.8965 1.30281C18.4464 0.852718 17.8359 0.599861 17.1994 0.599861C16.5629 0.599861 15.9524 0.852718 15.5024 1.30281C15.0523 1.75289 14.7994 2.36334 14.7994 2.99986C14.7994 3.63638 15.0523 4.24683 15.5024 4.69692C15.9524 5.147 16.5629 5.39986 17.1994 5.39986Z"
                    fill="#9796A8"
                  />
                </svg>
              </div>
              {isDropdown && (
                <div className="dropdown-container">
                  <ul className="dropdown-list">
                    {menuList.map((item) => (
                      <li
                        key={item}
                        className={`list-item ${item === menuList[1] && "red"}`}
                        onClick={() => handleMenu(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default List;
