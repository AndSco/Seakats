import React from "react";
import { FlatList } from "react-native";
import LogbookEntry from "./LogbookEntry";
import ToggleLine from "../UIComponents/ToggleLine";
import Colors from "../../constants/colors";
import months from "../../assets/monthNames";

const createLine = (date, trips, selectionHandler, selectedValue) => {
  const dateFormatted = `${months[date.slice(0, 2) - 1]} ${date.slice(3)}`;

  return (
    <ToggleLine
      heading={dateFormatted}
      underlineColor={Colors.darkest}
      setAsSelected={selectionHandler}
      whatIsSelected={selectedValue}
    >
      <FlatList
        data={trips.sort((a, b) => a.date < b.date)}
        keyExtractor={(trip, index) => index.toString()}
        renderItem={({ item, index }) => {
          // To make last item without border
          if (index === trips.length - 1) {
            return <LogbookEntry entry={item} noBorder />;
          } else {
            return <LogbookEntry entry={item} />;
          }
        }}
      />
    </ToggleLine>
  );
};

const DayGroupedPaddles = props => {
  return (
    <FlatList
      onRefresh={props.fetchTrips}
      refreshing={props.isLoading}
      data={
        props.days
          ? props.days.sort((a, b) => {
              const currDate = new Date(+a.date.slice(3), +a.date.slice(0, 2));
              const nextDate = new Date(+b.date.slice(3), +b.date.slice(0, 2));
              return currDate < nextDate;
            })
          : null
      }
      keyExtractor={(day, index) => index.toString()}
      renderItem={day =>
        createLine(
          day.item.date,
          day.item.trips,
          props.setAsSelected,
          props.whatIsSelected
        )
      }
    />
  );
};

export default DayGroupedPaddles;
