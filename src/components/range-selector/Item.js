import React, { useState, useEffect } from "react";
import styles from "./Item.module.css";

function Item({
  id,
  data,
  isAvailable,
  isAvailableTemp,
  isSelected,
  onSelectHandler,
}) {
  const style = `${styles.item} ${
    isAvailable
      ? isSelected
        ? styles.selected
        : styles.notSelected
      : styles.notAvailable
  }`;
  return (
    <button className={style} onClick={onSelectHandler}>
      {data}
      <input
        type={"checkbox"}
        disabled={!isAvailable}
        checked={isSelected}
        readOnly
      />
    </button>
  );
}

export default Item;
