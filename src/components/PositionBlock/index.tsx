import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectItemById } from "../../redux/cartSlice";
import { TCartItem } from "../../models";

type PositionBlockProps = {
  id: string;
  title: string;
  price: number;
  imageSource: string;
  types: number[];
  numberVars: number[];
};

const PositionBlock: React.FC<PositionBlockProps> = ({
  id,
  title,
  price,
  imageSource,
  types,
  numberVars,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectItemById(id));
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const typeNames = ["стандартный", "острый"];
  function addCount() {
    const item: TCartItem = {
      id,
      title,
      price,
      imageSource,
      type: typeNames[activeType],
      size: numberVars ? numberVars[activeSize] : 1,
      count: 1,
    };
    dispatch(addItem(item));
  }
  return (
    <div className="dish-block-wrapper">
      <div className="dish-block">
        <Link to={`/item/${id}`}>
          <img className="dish-block__image" src={imageSource} alt="dish" />
          <h4 className="dish-block__title">{title}</h4>
        </Link>
        <div className="dish-block__selector">
          <ul>
            {types.map((type) => (
              <li
                className={activeType === type ? "active" : ""}
                key={type}
                onClick={() => setActiveType(type)}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          {numberVars && (
            <ul>
              {numberVars.map((elem, i) => (
                <li
                  className={activeSize === i ? "active" : ""}
                  key={i}
                  onClick={() => setActiveSize(i)}
                >
                  {elem} шт.
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="dish-block__bottom">
          <div className="dish-block__price">от {price} ₽</div>
          <button
            className="button button--outline button--add"
            onClick={addCount}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {cartItem && <i>{cartItem.count}</i>}
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default PositionBlock;