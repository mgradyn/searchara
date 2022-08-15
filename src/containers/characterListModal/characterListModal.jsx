import { memo, useRef, useState } from "react";
import ReactDom from "react-dom";
import { Icon } from "@iconify/react";
import { TARGET_CLASSES } from "../../utils/constant";

import "./characterListModal.css";

function CharacterListModal({ open, onClose }) {
  const ref = useRef(null);

  const toggleExit = () => {
    ref.current.className = "disappear characterListModal";
    setTimeout(() => onClose(), 150);
  };

  const [scale, setScale] = useState({
    minWidth: `200px`,
    width: `250px`,
    maxHeight: `350px`,
    height: `350px`,
    marginLeft: `calc(125px + 24%)`,
    // top: 0,
    // left: 0,
    large: false,
  });

  const toggleScale = () => {
    if (!scale.large) {
      setScale({
        minWidth: `90%`,
        maxHeight: `90%`,
        height: `90%`,
        marginLeft: `0`,
        large: true,
      });
    } else {
      setScale({
        minWidth: `200px`,
        width: `250px`,
        maxHeight: `350px`,
        height: `350px`,
        marginLeft: `calc(125px + 24%)`,
        large: false,
      });
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  if (!open) return null;
  return ReactDom.createPortal(
    <div className='container section__padding'>
      <div className='sub__container overall__max__width'>
        <div
          className='characterListModal appear'
          ref={ref}
          style={{
            marginLeft: scale.marginLeft,
            width: scale.width,
            minWidth: scale.minWidth,
            maxHeight: scale.maxHeight,
            height: scale.height,
          }}
        >
          <div className='characterListModal-bar'>
            <div className='characterListModal-bar-icon icon__button'>
              <Icon icon='bi:file-earmark' />
            </div>
            <h3 className='title'>Character List</h3>
            <div className='characterListModal-bar-buttons'>
              <button
                className='characterListModal-bar-buttons-scale icon__button'
                onClick={toggleScale}
              >
                <Icon icon='fluent:window-48-regular' />
              </button>
              <button
                className='characterListModal-bar-buttons-exit icon__button'
                onClick={toggleExit}
              >
                <Icon icon='bi:x-lg' />
              </button>
            </div>
          </div>
          <div className='characterListModal-content'>
            <div className='characterListModal-content-input__container'>
              <input
                type='text'
                placeholder='Search...'
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
            {Object.keys(TARGET_CLASSES)
              .filter((key) => {
                if (searchTerm === "") {
                  return key;
                } else if (
                  TARGET_CLASSES[key].name
                    .toLowerCase()
                    .includes(searchTerm.toLocaleLowerCase())
                ) {
                  return key;
                }
              })
              .map((key) => (
                <div key={key}>
                  <p>{TARGET_CLASSES[key].name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default memo(CharacterListModal);
