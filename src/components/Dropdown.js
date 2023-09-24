import { useEffect, useState, useRef } from "react";

import { TeamChip } from "./team-chip";

export function Dropdown({
  placeHolder,
  options,
  isMulti,
  isSearchable,
  onChange,
  currentValue,
  setOkrOwnerValue,
  createOkrDropdown,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(
    isMulti ? currentValue : null
  );
  const searchRef = useRef();

  useEffect(() => {
    if (createOkrDropdown) {
      setOkrOwnerValue(selectedValue);
    }
  }, [selectedValue]);

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }
    return options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  useEffect(() => {
    const handler = () => setShowMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      return (
        <div className="dropdown-tags">
          {selectedValue.map((option) => (
            <TeamChip
              key={option.value}
              title={option.label}
              type={option.type}
              removeOption={(e) => onTagRemove(e, option)}
              renderLocation={"dropdownInputField"}
            ></TeamChip>
          ))}
        </div>
      );
    }
    return (
      <div className="dropdown-tags">
        <TeamChip
          title={selectedValue.label}
          type={selectedValue.type}
          renderLocation={"dropdownInputField"}
        ></TeamChip>
      </div>
    );
  };

  const removeOption = (option) => {
    return selectedValue.filter((o) => o.value !== option.value);
  };

  const onTagRemove = (e, option) => {
    e.stopPropagation();
    setSelectedValue(removeOption(option));
  };

  const onItemClick = (option) => {
    let newValue;
    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option) => {
    if (isMulti) {
      return selectedValue.filter((o) => o.value === option.value).length > 0;
    }
    if (!selectedValue) {
      return false;
    }
    return selectedValue.value === option.value;
  };

  onChange(selectedValue);

  return (
    <div className="dropdown-container">
      <div onClick={handleInputClick} className="dropdown-input">
        {getDisplay()}
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          {isSearchable && (
            <div className="search-box">
              <input onChange={onSearch} value={searchValue} ref={searchRef} />
            </div>
          )}
          <ul>
            {getOptions().map((option) => (
              <div
                onClick={() => onItemClick(option)}
                key={option.value}
                className={`dropdown-item ${isSelected(option) && "selected"}`}
              >
                <TeamChip
                  title={option.label}
                  type={option.type}
                  renderLocation={"dropdown"}
                />
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
