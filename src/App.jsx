import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
import AppRoutes from "./routes/Routes";
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="p-5 flex flex-col bg-white dark:bg-gray-900 mt-[68px] min-h-screen">
        <AppRoutes />

        <Footer></Footer>
      </div>
    </React.Fragment>
  );
}

export default App;
