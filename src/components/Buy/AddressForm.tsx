import { Typography, Grid, Button } from "@material-ui/core";
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
    secondaryLabel: string;
    onPrimary: (model: any) => void;
    onSecondary: () => void;
}

function Form({
    title,
    primaryLabel,
    onPrimary,
    onSecondary,
    secondaryLabel,
}: AddressFormProps) {
    const formService = useContext(xFormServiceContext);

    const { addError, updateField, isFormValid, formErrors, formModel } =
        formService;
    return (
        <>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <XTextField
                        fieldName="firstName"
                        errorMessage="This field is required"
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="first name"
                        onUpdateErrorState={(err: FieldError) => addError(err)}
                        validation={{ type: ValidationType.required }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <XTextField
                        fieldName="lastName"
                        errorMessage="last name is required"
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="last name"
                        onUpdateErrorState={(err: FieldError) => addError(err)}
                        validation={{ type: ValidationType.required }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextField
                        fieldName="address1"
                        errorMessage="address is required"
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="address1"
                        onUpdateErrorState={(err: FieldError) => addError(err)}
                        validation={{ type: ValidationType.required }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <XTextField
                        fieldName="address2"
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="address2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <XTextField
                        fieldName="city"
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="City"
                        validation={{ type: ValidationType.required }}
                        onUpdateErrorState={(err: FieldError) => addError(err)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <XTextField
                        fieldName="region"
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="State/Province/Region"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <XTextField
                        fieldName="zip"
                        onUpdate={(field: FieldUpdate) => updateField(field)}
                        label="zip/postal code"
                        errorMessage="invalid zip code"
                        validation={{ type: ValidationType.zip }}
                        onUpdateErrorState={(err: FieldError) => addError(err)}
                    />
                </Grid>
            </Grid>
            <Button
                size="small"
                color="primary"
                disabled={!isFormValid}
                onClick={() => {
                    onPrimary(formModel);
                }}
            >
                {primaryLabel}
            </Button>
            <Button
                size="small"
                color="secondary"
                onClick={() => {
                    onSecondary();
                }}
            ></Button>
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
