import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import { Product } from "../../intrastructure/models/product.model";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../intrastructure/store/app-state";

interface MediaCardProps {
    product: Product | undefined;
    actionLabel: string;
    children?: ReactNode;
    onAction: (product: Product | undefined) => void;
}

const useStyles = makeStyles({
    root: {
        width: 400,
    },
    media: {
        height: 250,
    },
});

function useMediaCard({ product, onAction, actionLabel }: MediaCardProps) {
    const p = product || ({} as Product);
    const isInCart = useSelector((state: AppState) =>
        state.cart.entries.some((e) => e.productId === product?.id)
    );
    return {
        isInStock: p.availableAmount > 0,
        isInCart,
        title: p.title,
        description: p.description,
        price: p.price,
        imageSrc: p.imageSrc,
        id: p.id,
        actionLabel,
        onAction,
    };
}

export function MediaCard(props: MediaCardProps) {
    const classes = useStyles();
    const {
        title,
        isInStock,
        description,
        price,
        imageSrc,
        id,
        actionLabel,
        onAction,
        isInCart,
    } = useMediaCard(props);

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => onAction(props.product)}>
                <CardMedia className={classes.media} image={imageSrc} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textPrimary"
                        component="p"
                    >
                        {description} - ${price}
                    </Typography>
                    {props.children}
                </CardContent>
            </CardActionArea>
            <CardActions>
                {isInStock && !isInCart && (
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => onAction(props.product)}
                    >
                        {actionLabel}
                    </Button>
                )}
                {isInCart ? (
                    <Chip
                        label="Already in cart"
                        color="secondary"
                        variant="default"
                    />
                ) : isInStock ? (
                    <Chip
                        label="In Stock"
                        color="secondary"
                        variant="default"
                    />
                ) : (
                    <Chip
                        label="Out of Stock"
                        color="primary"
                        variant="default"
                    />
                )}
            </CardActions>
        </Card>
    );
}
