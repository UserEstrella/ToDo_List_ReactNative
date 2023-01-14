import { Provider } from 'react-redux';
import {store, persistor} from './redux/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Navigate} from './navigation/navigate';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Navigate />
        </SafeAreaProvider>
      </PersistGate>
    </ Provider>
  );
}

