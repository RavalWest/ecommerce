import "styles/global.css";
import { Provider } from "react-redux";
import store from "redux/store";

import Home from "pages";
import Header from "components/header";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Header />
      <div className="pt-5 bg-gray-100">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
