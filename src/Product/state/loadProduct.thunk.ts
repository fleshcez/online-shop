import { Dispatch } from "redux";
import { ProductDetailed } from "../../intrastructure/models/productDetailed.model";
import { ApiService } from "../../intrastructure/services/api.service";
import { updateProduct } from "./product.actions";


export function loadProductThunk(apiService: ApiService, id: string) {
    return (dispatch: Dispatch) => {
        apiService.getProduct(id).then((result: ProductDetailed | undefined) => {
            dispatch(updateProduct(result));
        })
    };
}