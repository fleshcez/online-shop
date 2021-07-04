import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import HomeIcon from '@material-ui/icons/Home';
import Badge from '@material-ui/core/Badge';
import SearchIcon from "@material-ui/icons/Search";

import {
    createStyles,
    fade,
    Theme,
    makeStyles,
} from "@material-ui/core/styles";
import { AppState } from "../../intrastructure/store/app-state";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginLeft: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: "none",
            [theme.breakpoints.up("sm")]: {
                display: "block",
            },
        },
        search: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            "&:hover": {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(1),
                width: "auto",
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        inputRoot: {
            color: "inherit",
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                width: "12ch",
                "&:focus": {
                    width: "20ch",
                },
            },
        },
    })
);

function useHeader() {
    const history = useHistory();
    const onNavigateToCart = () => history.push("/cart");
    const onNavigateToHome = () => history.push("/");

    const cartEntriesNumber = useSelector((state: AppState) => state.cart.entries.length);

    return { onNavigateToCart, onNavigateToHome, cartEntriesNumber};
}

export default function Header({ className }: { className: string }) {
    const classes = useStyles();
    const { onNavigateToCart, onNavigateToHome, cartEntriesNumber } = useHeader();

    return (
        <div className={`${className}`}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="home"
                        onClick={onNavigateToHome}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Market
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            onChange={() => {}}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ "aria-label": "search" }}
                        />
                    </div>
                    <IconButton
                        edge="end"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open cart"
                        onClick={onNavigateToCart}
                    >
                        <Badge badgeContent={cartEntriesNumber} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
