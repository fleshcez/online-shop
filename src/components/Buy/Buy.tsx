import {
    Grid,
    makeStyles,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../intrastructure/store/app-state";
import { AddressForm } from "./AddressForm";
import { PaymentDetailsForm } from "./PaymentDetails";

const useStyles = makeStyles((theme) => ({
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
        [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
}));

function useBuy() {
    const entries = useSelector((state: AppState) => state.cart.entries);
    const [addressDetails, setAddressDetails] = useState({});
    const [paymentDetails, setPaymentDetails] = useState({});

    const [activeStep, setActiveStep] = useState(0);
    const total = useMemo(
        () => entries.reduce((acc, cur) => acc + cur.unitPrice, 0),
        [entries]
    );
    const summary = `Total to pay: ${total}`;
    const onBack = () => {
        setActiveStep(activeStep - 1);
    };
    const onForward = () => {
        setActiveStep(activeStep + 1);
    };

    useEffect(() => {
        console.log("Address:", addressDetails);
    }, [addressDetails]);
    useEffect(() => {
        console.log("Payment:", paymentDetails);
    }, [paymentDetails]);

    return {
        summary,
        onBack,
        onForward,
        activeStep,
        addressDetails,
        paymentDetails,
        setAddressDetails,
        setPaymentDetails
    };
}

const steps = ["Shipping address", "Payment details", "Review your order"];

interface ContentProps {
    activeStep: number;
    onForward: () => void;
    onBack: () => void;
    setAddressDetails: (details: any) => void;
    setPaymentDetails: (details: any) => void;
    addressDetails: any;
    paymentDetails: any;
}
function Content({
    activeStep,
    onBack,
    onForward,
    setAddressDetails,
    setPaymentDetails,
    addressDetails,
    paymentDetails,
}: ContentProps) {
    switch (activeStep) {
        case 0:
            return (
                <AddressForm
                    title="Address details"
                    model={addressDetails}
                    onPrimary={(model) => {
                        setAddressDetails(model);
                        onForward();
                    }}
                    primaryLabel="next"
                />
            );
        case 1:
            return (
                <PaymentDetailsForm
                    title="Payment details"
                    onPrimary={(model) => {
                        setPaymentDetails(model);
                        onForward();
                    }}
                    primaryLabel="next"
                    secondaryLabel="back"
                    onSecondary={onBack}
                />
            );
        default:
            return <div></div>;
    }
}

export function Buy() {
    const {
        summary,
        activeStep,
        onForward,
        onBack,
        setAddressDetails,
        setPaymentDetails,
        addressDetails,
        paymentDetails
    } = useBuy();
    const classes = useStyles();

    return (
        <div className={classes.layout}>
            <Grid item xs={12} md={12}>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Paper className={classes.paper} elevation={2}>
                    <Typography>{summary}</Typography>
                    <Content
                        activeStep={activeStep}
                        onForward={onForward}
                        onBack={onBack}
                        setAddressDetails={setAddressDetails}
                        setPaymentDetails={setPaymentDetails}
                        addressDetails={addressDetails}
                        paymentDetails={paymentDetails}
                    />
                </Paper>
            </Grid>
        </div>
    );
}
