import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App.jsx";
import AppProvider from "./context/AppContext.jsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <App />

      <Toaster richColors />
    </AppProvider>
  </BrowserRouter>
);
