import React, { useState } from "react";
import styles from "./RangeSelector.module.css";
import Item from "./Item";
import closeIcon from "./assets/close-sharp.svg";
import checkMarkIcon from "./assets/checkmark-sharp.svg";

function RangeSelector() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [dataSet, setDataSet] = useState([
    {
      id: 1,
      data: "09:00 AM - 10:00 AM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 2,
      data: "10:00 AM - 11:00 AM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 3,
      data: "11:00 AM - 12:00 PM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 4,
      data: "12:00 PM - 01:00 PM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 5,
      data: "01:00 PM - 02:00 PM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 6,
      data: "02:00 PM - 03:00 PM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 7,
      data: "03:00 AM - 04:00 PM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 8,
      data: "04:00 PM - 05:00 PM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 9,
      data: "05:00 PM - 06:00 PM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 10,
      data: "06:00 PM - 07:00 PM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 11,
      data: "07:00 PM - 08:00 PM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 12,
      data: "08:00 PM - 09:00 PM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 13,
      data: "09:00 PM - 10:00 PM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 14,
      data: "11:00 PM - 12:00 AM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 15,
      data: "12:00 AM - 01:00 AM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 16,
      data: "01:00 AM - 02:00 AM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 17,
      data: "02:00 AM - 03:00 AM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 18,
      data: "03:00 AM - 04:00 AM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 19,
      data: "04:00 AM - 05:00 AM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 20,
      data: "05:00 AM - 06:00 AM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 21,
      data: "06:00 AM - 07:00 AM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 22,
      data: "07:00 AM - 08:00 AM",
      isAvailable: true,
      isSelected: false,
    },
    {
      id: 23,
      data: "08:00 AM - 09:00 AM",
      isAvailable: true,
      isSelected: false,
    },
  ]);

  function getNearestIndexOfDate(selectedDates, itemIndex) {
    let nearIndex = Number.MAX_SAFE_INTEGER;
    selectedDates.forEach((element) => {
      const dist = Math.abs(element.id - 1 - itemIndex);
      const prevDist = Math.abs(nearIndex - itemIndex);
      if (dist !== 0 && dist < prevDist) {
        nearIndex = element.id - 1;
      }
    });
    return nearIndex;
  }

  function selectDatesBetween(nearIndex, itemIndex, set) {
    //Check start date and end date indexes
    let min = 0;
    let max = 0;
    if (nearIndex > itemIndex) {
      max = nearIndex;
      min = itemIndex + 1;
    } else {
      max = itemIndex;
      min = nearIndex + 1;
    }
    //Select all dates (not selected)  between prev selected date and current selected date
    for (let index = min; index < max; index++) {
      const element = set[index];
      if (!element.isSelected) {
        element.isSelected = true;
        setSelectedDates((prev) => [...prev, element]);
      }
    }
  }

  const trySelect = (itemIndex, set) => {
    if (!selectedDates.length) return true;

    // get near selected item and see if have not available date
    let nearIndex = getNearestIndexOfDate(selectedDates, itemIndex);

    //check if (not available date ) between prev selected date and current selected date
    for (
      let index = Math.min(nearIndex, itemIndex);
      index < Math.max(nearIndex, itemIndex);
      index++
    ) {
      const element = set[index];
      if (!element.isAvailable) {
        setErrorMessage("لا يمكن اختيار هذا الوقت ");
        setTimeout(() => {
          setErrorMessage(null);
        }, 1000);
        return false;
      }
    }
    setErrorMessage(null);

    selectDatesBetween(nearIndex, itemIndex, set);

    return true;
  };

  const unSelectDownItems = (itemIndex, set) => {
    for (let index = itemIndex; index < set.length; index++) {
      const element = set[index];
      if (element.isSelected) {
        element.isSelected = false;
      }
    }
    setSelectedDates((prev) => prev.filter((item) => item.id - 1 < itemIndex));
  };

  const onSelectHandler = (index) => {
    if (!dataSet[index].isAvailable) return;
    const newSet = [...dataSet];
    const selectedItem = newSet[index];

    if (!selectedItem.isSelected) {
      if (!trySelect(index, newSet)) return;
      selectedItem.isSelected = true;
      setSelectedDates((prev) => [...prev, selectedItem]);
    } else {
      unSelectDownItems(index, newSet);
    }

    setDataSet(newSet);
  };
  const handleClearSelected = () => {
    setSelectedDates([]);
    setDataSet((prev) =>
      prev.map((dateItem) => {
        return { ...dateItem, isSelected: false };
      })
    );
  };

  const handleAddSelected = () => {
    console.log(selectedDates);
  };
  return (
    <div className={`${styles.rangeSelector}`}>
      <h3>{`عدد الساعات ${selectedDates.length}`}</h3>
      <div className="actions">
        <button className="btn clear-btn" onClick={handleClearSelected}>
          <img src={closeIcon} />
        </button>

        <button className="btn add-btn" onClick={handleAddSelected}>
          <img src={checkMarkIcon} />
        </button>
      </div>
      <div className={`${styles.itemsContainer}`}>
        {dataSet.map((itemData, index) => (
          <Item
            key={itemData.id}
            {...itemData}
            onSelectHandler={() => onSelectHandler(index)}
          />
        ))}
      </div>

      <div>{errorMessage}</div>
    </div>
  );
}

export default RangeSelector;
