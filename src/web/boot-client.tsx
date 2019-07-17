import * as React from "react";
import * as ReactDom from "react-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { createRootReducer } from "./reducers/reducer";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Routes } from "./routes";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import "bootstrap/dist/css/bootstrap.css";


//polyfills for IE
import "./util/polyfills";
import 'es6-promise/auto';


const history = createBrowserHistory();

const store = createStore(
    createRootReducer(history),
    compose(
        applyMiddleware(
            routerMiddleware(history)
        ),
        (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f
    )  
);

const message: string = "this is the client";
console.log(message);

/** function render(rootContainer: JSX.Element) {
    ReactDom.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {rootContainer}
            </ConnectedRouter>
        </Provider>, 
        document.getElementById('root')
    );

}*/

ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Routes />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")

);

/** 
ReactDom.render(<Routes />)
if(module.hot) {
    module.hot.accept("./routes", () => {
        const NewRoutes = require("./routes").Routes;
        render(<NewRoutes />);
    });
}
*/