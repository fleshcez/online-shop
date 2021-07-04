import React, { useContext, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useParams } from "react-router";
import { appServiceContext } from "../intrastructure/AppServices/AppServices";
import { ProductDetailed } from "../intrastructure/models/productDetailed.model";
import { Product as ProductModel } from "../intrastructure/models/product.model";
import { ApiService } from "../intrastructure/services/api.service";
import { AppState } from "../intrastructure/store/app-state";
import { MediaCard } from "../components/MediaCard/MediaCard";
import { loadProductThunk } from "./state/loadProduct.thunk";
import { Typography } from "@material-ui/core";
import { addEntryThunk } from "../Cart/state/cart.addEntry.thunk";
import { updateProduct } from "./state/product.actions";

interface ProductInputs {
    product: ProductDetailed | undefined;
}

interface ProductOutputs {
    onLoadProduct: (apiService: ApiService, id: string) => void;
}

export type ProductProps = ProductInputs & ProductOutputs;

function useProduct({ product, onLoadProduct }: ProductProps) {
    const { id } = useParams<{ id: string }>();
    const { apiService } = useContext(appServiceContext);

    const dispatch = useDispatch();
    const onAction = (product: ProductModel | undefined) => {
        dispatch(addEntryThunk(product as any));
    };

    useEffect(() => {
        onLoadProduct(apiService, id);
    }, [id]);

    useEffect(() => {
        return () => {
            dispatch(updateProduct(undefined));
        };
    }, []);
    return {
        product,
        onAction,
    };
}

export function ProductComponent(props: ProductProps) {
    const { product, onAction } = useProduct(props);
    return product ? (
        <MediaCard
            actionLabel="add to cart"
            product={product}
            onAction={onAction}
        >
            <Typography variant="body2" color="textSecondary" component="p">
                {product.detailedDescription}
            </Typography>
        </MediaCard>
    ) : (
        <div>Loading Product</div>
    );
}

function mapInputs({ product }: AppState): ProductInputs {
    return {
        product: product.product,
    };
}

function mapOutputs(dispatch: Dispatch): ProductOutputs {
    return {
        onLoadProduct: (apiService, id) =>
            dispatch<any>(loadProductThunk(apiService, id)),
    };
}

export const Product = connect(mapInputs, mapOutputs)(ProductComponent);
