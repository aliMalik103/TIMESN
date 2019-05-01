import React from "react";
import ReactDOM from "react-dom";

import { Route, BrowserRouter as Router } from 'react-router-dom'
import Example from "./example";


const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Example} />
      {/* <Route path="/details" component={Details} /> */}
  
    </div>
  </Router>
)


const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";




document.head.appendChild(styleLink);
ReactDOM.render(routing, document.getElementById('root'))
