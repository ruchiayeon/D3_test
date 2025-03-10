import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import LineChart from "./HistogramWithByteEntropy";

import { Provider } from "react-redux";
import store from "./Redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
      <LineChart />
    </StrictMode>
  </Provider>
);
