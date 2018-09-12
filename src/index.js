import React from "react";
import {render} from "react-dom";
const App = () => {
  return (
    <div>
      Hello React and Webpack 很好
    </div>
    );
};
render(<App/>, document.getElementById("root"));