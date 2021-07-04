import {
    Button,
    IconButton,
    ListItemText,
    makeStyles,
    Paper,
} from "@material-ui/core";
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    Grid,
    List,
    Theme,
    createStyles,
    Divider,
    Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

import { useSelector } from "react-redux";
import { AppState } from "../intrastructure/store/app-state";
import { CartEntry } from "../intrastructure/models/cart.model";
import { removeEntry } from "./state/cart.actions";
import { useMemo, useState } from "react";
import AlertDialog from "../components/AlertDialog/AlertDialog";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cartRoot: {
            padding: theme.spacing(1),
            minHeight: "500px",
        },
        price: {
            display: "inline-block",
            marginRight: theme.spacing(2)
        },
        list: {
            height: "400px"
        }
    })
);

function useCart() {
    const entries = useSelector((state: AppState) => state.cart.entries);
    const dispatch = useDispatch();
    const history = useHistory();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const onDialogPrimary = useRef(() => {});

    const onDialogSecondary = () => {
        setDialogOpen(false);
    };

    const onDelete = (entry: CartEntry) => {
        setDialogOpen(true);

        onDialogPrimary.current = () => {
            dispatch(removeEntry(entry));
            setDialogOpen(false);
        };
    };

    const onBuy = () => {
        history.push('/buy')
    };

    const total = useMemo(
        () =>
            entries.reduce((acc, cur) => {
                return acc + cur.unitPrice;
            }, 0),
        [entries]
    );

    const classes = useStyles();
    return {
        entries,
        onDelete,
        classes,
        onDialogPrimary,
        onDialogSecondary,
        isDialogOpen,
        total,
        onBuy
    };
}

export function Cart() {
    const {
        entries,
        onDelete,
        classes,
        onDialogPrimary,
        onDialogSecondary,
        isDialogOpen,
        total,
        onBuy
    } = useCart();
    return (
        <Grid item xs={12} md={6}>
            <Paper elevation={2} className={classes.cartRoot}>
                {entries.length ? (
                    <>
                        <AlertDialog
                            onPrimary={onDialogPrimary.current}
                            onSecondary={onDialogSecondary}
                            primaryLabel="Yes"
                            secondaryLabel="Cancel"
                            title="Remove item from cart?"
                            text="By clicking yes, this item will be removed from the cart"
                            open={isDialogOpen}
                        />
                        <Typography>Your Products</Typography>
                        <Grid item xs={12}>
                            <List className={classes.list} dense={false}>
                                {entries.map((e, i) => (
                                    <div key={e.productId}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar src={e.imageSrc}>
                                                    {/* <FolderIcon /> */}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={e.title}
                                                secondary={`Price: $${e.unitPrice}.00`}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => onDelete(e)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider
                                            variant="inset"
                                            component="li"
                                        />
                                    </div>
                                ))}
                            </List>
                        </Grid>
                        <Typography className={classes.price}>Total: ${total}.00</Typography>
                        <Button variant="contained" color="primary" onClick={onBuy}>
                            Buy!
                        </Button>
                    </>
                ) : (
                    <Typography>No products added to cart</Typography>
                )}
            </Paper>
        </Grid>
    );
}
