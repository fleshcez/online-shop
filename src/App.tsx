import React from "react";
import Header from "./components/Header/Header";
import { Home } from "./Home/Home";

import styles from "./App.module.scss";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Cart } from "./Cart/Cart";
import { Product } from "./Product/Product";
import { Buy } from "./components/Buy/Buy";
const { header: headerClass } = styles;

function App() {
    return (
        // <MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <header>
                <Header className={headerClass} />
            </header>
            <main>
                <Switch>
                    <Route path="/cart">
                        <Cart />
                    </Route>
                    <Route path="/product/:id">
                        <Product />
                    </Route>
                    <Route path="/buy">
                        <Buy />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </main>
        </BrowserRouter>
        // </MuiThemeProvider>
    );
}

export default App;
