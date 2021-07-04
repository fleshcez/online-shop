import { Dispatch } from "redux";
import { updateProducts } from "./home.actions";
import { ApiService } from "../../intrastructure/services/api.service";

export function loadProductsThunk(apiService: ApiService) {
    return (dispatch: Dispatch) => {
        apiService.getProducts().then((result) => {
            const res = result || [];
            dispatch(updateProducts(res));
        })
    };
}