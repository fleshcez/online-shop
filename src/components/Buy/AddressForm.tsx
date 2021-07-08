import {
    Typography,
    Grid,
    Button,
    makeStyles,
    createStyles,
    Theme,
} from "@material-ui/core";
import { useContext } from "react";
import { ValidationType } from "../XForm/fields/validation";
import { XTextField } from "../XForm/fields/XTextField";
import {
    xFormServiceContext,
    FieldUpdate,
    FieldError,
    XFormService,
} from "../XForm/xForm.service";

export interface AddressFormProps {
    title: string;
    primaryLabel: string;
    model: any;
    onPrimary: (model: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        action: {
            marginTop: theme.spacing(1),
        },
    })
);

function Form({
    title,
    primaryLabel,
    onPrimary,
    model
}: AddressFormProps) {
    const formService = useContext(xFormServiceContext);
    const classes = useStyles();

    const {
        addError,
        updateField,
        isFormValid,
        formErrors,
        formModel,
        isFormDirty,
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
                        fieldName="firstName"
                        value={model.firstName}
                        errorMessage="This field is required"
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="First Name"
                        onUpdateErrorState={(err: FieldError) => addError(err)}
                        validation={{ type: ValidationType.required }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <XTextField
                        fieldName="lastName"
                        value={model.lastName}
                        errorMessage="last name is required"
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="Last Name*"
                        onUpdateErrorState={(err: FieldError) => addError(err)}
                        validation={{ type: ValidationType.required }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextField
                        fieldName="address1"
                        value={model.address}
                        errorMessage="address is required"
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="Address1*"
                        onUpdateErrorState={(err: FieldError) => addError(err)}
                        validation={{ type: ValidationType.required }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <XTextField
                        value={model.address2}
                        fieldName="address2"
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="address2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <XTextField
                        fieldName="city"
                        value={model.city}
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="City*"
                        validation={{ type: ValidationType.required }}
                        onUpdateErrorState={(err: FieldError) => addError(err)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <XTextField
                        fieldName="region"
                        value={model.region}
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="State/Province/Region"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <XTextField
                        fieldName="zip"
                        value={model.zip}
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="zip/postal code*"
                        errorMessage="invalid zip code"
                        validation={{ type: ValidationType.zip }}
                        onUpdateErrorState={(err: FieldError) => addError(err)}
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
        </>
    );
}

export function AddressForm(props: AddressFormProps) {
    return (
        <XFormService>
            <Form {...props} />
        </XFormService>
    );
}
