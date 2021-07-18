import {
    List,
    ListItem,
    Typography,
    ListItemText,
    makeStyles,
    Grid,
    Button,
} from "@material-ui/core";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Address, Payment } from "../../intrastructure/models/buy.model";
import { AppState } from "../../intrastructure/store/app-state";

export interface SummaryProps {
    address: Address;
    payment: Payment;
    onSecondary: () => void;
    secondaryLabel: string;
}

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
    action: {
        marginTop: theme.spacing(1),
    },
}));

function useSummary() {
    const products = useSelector((state: AppState) => state.cart.entries);

    const total = useMemo(() => {
        return products.reduce(
            (acc, cur) => acc + cur.unitPrice * cur.amount,
            0
        );
    }, [products]);

    return {
        total,
        products,
    };
}

export function Summary({
    address,
    payment,
    onSecondary,
    secondaryLabel,
}: SummaryProps) {
    const classes = useStyles();
    const { total, products } = useSummary();

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem
                        className={classes.listItem}
                        key={product.productId}
                    >
                        <ListItemText
                            primary={product.title}
                            secondary={product.description}
                        />
                        <Typography variant="body2">
                            {product.unitPrice}
                        </Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {total}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.title}
                    >
                        Shipping
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography
                        gutterBottom
                    >{`${address.address1}, ${address.address2}`}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.title}
                    >
                        Payment details
                    </Typography>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography gutterBottom>Card Holder</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                gutterBottom
                            >{`${payment.nameOnCard}`}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom>Card Number</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                gutterBottom
                            >{`${payment.cardNumber}`}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom>Expiry date</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                gutterBottom
                            >{`${payment.expiryMonth}`}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Button
                className={classes.action}
                size="medium"
                color="secondary"
                variant="contained"
                onClick={onSecondary}
            >
                {secondaryLabel}
            </Button>
        </>
    );
}
