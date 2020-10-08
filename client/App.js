import React, {useState, useEffect, useRef} from 'react';
import { AppLoading } from "expo"; // Prolongs splashscreen untill all app assets are ready;
import { enableScreens } from "react-native-screens";
import fetchFonts from "./functions/loadFonts";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import AuthReducer from "./store/reducers/auth";
import SessionReducer from "./store/reducers/session";
import NavigationContainer from "./navigation/NavigationContainer";


export default App = () => {
  const rootReducer = combineReducers({
    auth: AuthReducer, 
    session: SessionReducer
  })

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  // OPTIMISATION - uses native screen components
  enableScreens();
  const [assettsDidLoad, setAssetsDidLoad] = useState(false);

  if (!assettsDidLoad) {
    return <AppLoading 
      startAsync={fetchFonts}
      onFinish={() => setAssetsDidLoad(true)}
      onError={(err) => console.log(err)}
    />
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>  
    );
}



 
 