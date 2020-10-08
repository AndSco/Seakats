import React, { useEffect, useRef, useState } from "react";
import SwitchNavigator from "./SwitchNavigator";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";
import { Notifications } from "expo";

const NavigationContainer = props => {
  const [thereisNotification, setThereIsNotification] = useState(false);
  const isAuth = useSelector(state => !!state.auth.token);
  const navRef = useRef();

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({
          routeName: "Login"
        })
      );
    }
  }, [isAuth]);

  Notifications.addListener(notification => {
    let { toScreen } = notification.data;
    console.log("NOTIICATION RECEIVED!", toScreen);
    setThereIsNotification(true);
    navRef.current.dispatch(
      NavigationActions.navigate({
        routeName: toScreen
      })
    );
  });

  useEffect(() => console.log("thereisNotification", thereisNotification), [
    thereisNotification
  ]);

  return <SwitchNavigator ref={navRef} />;
};

export default NavigationContainer;
