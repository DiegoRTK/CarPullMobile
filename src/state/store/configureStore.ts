import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducers/rootReducer';
import {thunk} from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return {store, persistor};
};

export default configureStore;
