import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  // Determines li class to apply
  let dayClass = classNames(
    "day-list__item",
  {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  // Provides text for communicating spots remaining
  const formatSpots = () => {
    let spotsText = '';
    if (props.spots === 0) {
      spotsText = 'no spots remaining';
    } else if (props.spots === 1) {
      spotsText = `${props.spots} spot remaining`;
    } else {
      spotsText = `${props.spots} spots remaining`;
    }
    return spotsText;
  };

  return (
    <li className={dayClass} selected={props.selected} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light" >{formatSpots()}</h3>
    </li>
  )

}