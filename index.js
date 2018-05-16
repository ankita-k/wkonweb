import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./src/App";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./src/redux/reducers/rootreducer";
import io from 'socket.io-client';
let store = createStore(rootReducer, applyMiddleware(thunk))

const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <head>
        <title>Universal Reacl</title>
        <link rel="stylesheet" href="/css/main.css">
        <script src="/bundle.js" defer></script>
      </head>

      <body>
        <div id="root">${renderToString(<Provider store={store}><App /></Provider>)}</div>
      </body>
    </html>
  `);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening");
});
