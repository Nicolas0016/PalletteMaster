import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
import AppProvider from "./context/AppContext";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <AppProvider>
      <NavBar />
      <div className="p-5 flex flex-col bg-white dark:bg-gray-900 mt-[68px] min-h-screen">
        <AppRoutes />

        <Footer></Footer>
      </div>
    </AppProvider>
  );
}

export default App;
