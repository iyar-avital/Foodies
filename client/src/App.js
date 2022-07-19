import axios from "axios";
import React, { useEffect } from "react";
import "./App.css";
import AppRouts from "./AppRouts";
import { useFetchFavsMutation } from "./redux/appApi";

function App() {
  const [fetchFavs, { isLoading, error }] = useFetchFavsMutation();
  useEffect(() => {
    fetchFavs();
  }, []);
  return (
    <div className="App">
      <AppRouts />
    </div>
  );
}

export default App;
