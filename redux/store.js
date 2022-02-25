import { createStore, combineReducers } from 'redux'
import login_reducer from './reducers/login_reducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'


const persistConfig = {
    key: 'root',
    storage:AsyncStorage
  }
  const rootReducer=combineReducers({

    login_reducer:login_reducer

})
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

  


const configureStore=()=>store


export default configureStore