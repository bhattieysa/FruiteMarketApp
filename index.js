import { Navigation } from 'react-native-navigation';
import {registerScreens} from './redux/routes'
import setup from "./redux/store";
import CustomDrawer from "./components/CustomDrawer"
import { RNNDrawer } from "react-native-navigation-drawer-extension";
import { persistStore, persistReducer } from 'redux-persist'

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.registerComponent("CustomDrawer", () => RNNDrawer.create(CustomDrawer));
  const store = setup();
  const persistor=persistStore(store)
  registerScreens(store,persistor);
  Navigation.setRoot({
    root: {
      stack: {
        id: 'MyStack',
        children: [
          {
            component: {
              name: 'OnBoarding'




            }
          }
        ]
      }
    }
  });
});



