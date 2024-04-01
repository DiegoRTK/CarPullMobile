import {PersistGate} from 'redux-persist/integration/react';
import Navigation from './src/navigation/Navigation';
import {Provider} from 'react-redux';
import React from 'react';
import configureStore from './src/state/store/configureStore';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';

const {store, persistor} = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AutocompleteDropdownContextProvider>
          <Navigation />
        </AutocompleteDropdownContextProvider>
      </PersistGate>
    </Provider>
  );
};

export {store}; // Exporta el store

export default App;
