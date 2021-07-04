import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { appServiceContext } from "../intrastructure/AppServices/AppServices";
import { Product } from "../intrastructure/models/product.model";
import { ApiService } from "../intrastructure/services/api.service";
import { loadProductsThunk } from "./state/home.loadProducts.thunk";
import { AppState } from "../intrastructure/store/app-state";
import { MediaCard } from "../components/MediaCard/MediaCard";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
        header: {
            marginBottom: 50,
        },
    })
);

interface HomeInputs {
    products: Product[];
}

interface HomeOutputs {
    onLoadProducts: (apiService: ApiService) => void;
}

export type HomeProps = HomeInputs & HomeOutputs;

function useHome({ products, onLoadProducts }: HomeProps) {
    const { apiService } = useContext(appServiceContext);
    const history = useHistory();

    useEffect(() => {
        onLoadProducts(apiService);
    }, []);

    return {
        products,
        navigateToProduct: (id: string) => history.push(`/product/${id}`),
    };
}

export function HomeComponent(props: HomeProps) {
    const { products, navigateToProduct } = useHome(props);
    const classes = useStyles();
    const spacing = 2;

    return (
        <div>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={spacing}>
                        {products.map((p) => (
                            <Grid key={p.id} item>
                                <MediaCard
                                    product={p}
                                    actionLabel="Go to product"
                                    onAction={(product) =>
                                        navigateToProduct(
                                            (product || {} as Product).id
                                        )
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

function mapInputs({ home }: AppState): HomeInputs {
    return {
        products: home.products,
    };
}

function mapOutputs(dispatch: Dispatch): HomeOutputs {
    return {
        onLoadProducts: (apiService) =>
            dispatch<any>(loadProductsThunk(apiService)),
    };
}

export const Home = connect(mapInputs, mapOutputs)(HomeComponent);
