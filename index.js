import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./src/components/Applayout";


const App=()=>{
  return(
    <>
      <AppLayout/>
    </>
  );
}

const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);