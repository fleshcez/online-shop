import {
    Grid,
    makeStyles,
    Paper,
    Step,
    StepLabel,
    Stepper,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Address, Payment } from "../../intrastructure/models/buy.model";
import { AppState } from "../../intrastructure/store/app-state";
import { AddressForm } from "./AddressForm";
import { PaymentDetailsForm } from "./PaymentDetailsForm";
import { updateAddress, updatePayment } from "./state/buy.actions";
import { Summary } from "./Summary";

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
    const dispatch = useDispatch();

    const addressDetails = useSelector((state: AppState) => state.buy.address);
    const paymentDetails = useSelector((state: AppState) => state.buy.payment);
    const setAddressDetails = (model: Address) =>
        dispatch(updateAddress(model));
    const setPaymentDetails = (model: Payment) =>
        dispatch(updatePayment(model));

    const [activeStep, setActiveStep] = useState(0);
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
        onBack,
        onForward,
        activeStep,
        addressDetails,
        paymentDetails,
        setAddressDetails,
        setPaymentDetails,
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
                    model={paymentDetails}
                    title="Payment details"
                    onPrimary={(model) => {
                        setPaymentDetails(model);
                        onForward();
                    }}
                    primaryLabel="next"
                    secondaryLabel="back"
                    onSecondary={(model) => {
                        setPaymentDetails(model);
                        onBack();
                    }}
                />
            );
        case 2:
            return (
                <Summary
                    address={addressDetails}
                    payment={paymentDetails}
                    onSecondary={onBack}
                    secondaryLabel="Back"
                />
            );
        default:
            return <div></div>;
    }
}

export function Buy() {
    const {
        activeStep,
        onForward,
        onBack,
        setAddressDetails,
        setPaymentDetails,
        addressDetails,
        paymentDetails,
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
