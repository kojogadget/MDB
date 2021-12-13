import React from "react";
import ReactDOM from "react-dom";
import "./sass/main.scss";
import Footer from "./components/Footer";

const App = function () {
  return (
    <>
      <main>
        <h1>Hello World</h1>
      </main>
      <Footer />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
