import {
    Typography,
    Grid,
    Button,
    makeStyles,
    Theme,
    createStyles,
} from "@material-ui/core";
import { useContext, useMemo } from "react";
import { ValidationType } from "../XForm/fields/validation";
import { XSelectField } from "../XForm/fields/XSelectField";
import { XTextField } from "../XForm/fields/XTextField";
import {
    xFormServiceContext,
    FieldUpdate,
    FieldError,
    XFormService,
} from "../XForm/xForm.service";

export interface PaymentDetailsProps {
    title: string;
    primaryLabel: string;
    secondaryLabel: string;
    onPrimary: (model: any) => void;
    onSecondary: () => void;
}

function useDetailsForm() {
    const selectMonths = useMemo(
        () => [
            {
                label: "January",
                value: 1,
            },
            {
                label: "February",
                value: 2,
            },
            {
                label: "March",
                value: 3,
            },
            {
                label: "April",
                value: 4,
            },
            {
                label: "May",
                value: 5,
            },
            {
                label: "June",
                value: 6,
            },
            {
                label: "July",
                value: 7,
            },
            {
                label: "August",
                value: 8,
            },
            {
                label: "September",
                value: 9,
            },
            {
                label: "October",
                value: 10,
            },
            {
                label: "November",
                value: 11,
            },
            {
                label: "December",
                value: 12,
            },
        ],
        []
    );

    const selectYears = useMemo(
        () =>
            Array(20)
                .fill(new Date().getFullYear())
                .map((year, index) => {
                    const calcYear = year + index;
                    return { label: `${calcYear}`, value: calcYear };
                }),
        []
    );

    return {
        selectMonths,
        selectYears,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        action: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    })
);

function Form({
    title,
    primaryLabel,
    onPrimary,
    onSecondary,
    secondaryLabel,
}: PaymentDetailsProps) {
    const formService = useContext(xFormServiceContext);
    const { selectYears, selectMonths } = useDetailsForm();
    const classes = useStyles();

    const {
        addError,
        updateField,
        isFormValid,
        isFormDirty,
        formModel,
        onFormPrimary,
    } = formService;
    return (
        <>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <XTextField
                        fieldName="nameOnCard"
                        errorMessage="required"
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="name on card*"
                        onUpdateErrorState={(err: FieldError) => addError(err)}
                        validation={{ type: ValidationType.required }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <XTextField
                        fieldName="cardNumber"
                        errorMessage="invalid card number"
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="card number"
                        onUpdateErrorState={(err: FieldError) => addError(err)}
                        validation={{ type: ValidationType.creditCardNumber }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <XSelectField
                        fieldName="expiryMonth"
                        errorMessage="required"
                        onUpdate={updateField}
                        label="expiry month"
                        onUpdateErrorState={addError}
                        validation={{ type: ValidationType.required }}
                        values={selectMonths}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <XSelectField
                        fieldName="expiryYear"
                        errorMessage="required"
                        onUpdate={updateField}
                        label="expiry year"
                        onUpdateErrorState={addError}
                        validation={{ type: ValidationType.required }}
                        values={selectYears}
                    />
                </Grid>
            </Grid>
            <Button
                size="medium"
                color="primary"
                variant="contained"
                className={classes.action}
                disabled={!isFormValid && isFormDirty}
                onClick={() => {
                    if (isFormValid) {
                        onPrimary(formModel);
                    } else {
                        onFormPrimary();
                    }
                }}
            >
                {primaryLabel}
            </Button>
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

export function PaymentDetailsForm(props: PaymentDetailsProps) {
    return (
        <XFormService>
            <Form {...props} />
        </XFormService>
    );
}
