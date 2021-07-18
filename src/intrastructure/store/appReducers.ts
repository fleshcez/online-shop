import {combineReducers} from "redux";
import { productReducer } from "../../Product/state/product.reducer";
import { homeReducer } from "../../Home/state/home.reducer";
import { AppState } from "./app-state";
import { cartReducer } from "../../Cart/state/cart.reducer";
import { buyReducer } from "../../components/Buy/state/buy.reducer";

export const appReducer = combineReducers<AppState>({
    home: homeReducer,
    product: productReducer,
    cart: cartReducer,
    buy: buyReducer
});