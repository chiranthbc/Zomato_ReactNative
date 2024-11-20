import Navigation from "@navigation/Navigation";
import { persistor, store } from "@states/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};
export default App;
