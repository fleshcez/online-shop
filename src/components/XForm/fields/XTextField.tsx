import { makeStyles, TextField } from "@material-ui/core";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import { XFieldProps } from "./fieldProps";
import { useValidation, validate, Validation } from "./validation";

export interface XTextFieldProps extends XFieldProps<string> {
    validation?: Validation;
}

function useXTextField(props: XTextFieldProps) {
    const {
        value,
        onUpdate,
        validation,
        errorMessage,
        label,
        onUpdateErrorState,
        fieldName,
    } = props;
    const [fieldValue, setFieldValue] = useState(value || "");
    const {
        isValid,
        onValidation,
        helperText
    } = useValidation({errorMessage, onUpdateErrorState, fieldName});

    const onBlur = (event: { target: { value: any } }) => {
        const value = event.target.value;
        if (onUpdateErrorState) {
            const validationResult = validate({validation, value});
            onValidation(validationResult);
        }

        onUpdate({ value, fieldName });
    };

    const onChange = ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(value);
        if (onUpdateErrorState) {
            const validationResult = validate({validation, value});
            onValidation(validationResult);
        }
    };

    return {
        fieldValue,
        onChange,
        onBlur,
        isValid,
        errorMessage,
        label,
        helperText,
    };
}

const useStyles = makeStyles({
    field: {
        width: "100%",
    },
});

export function XTextField(props: XTextFieldProps) {
    const { fieldValue, onChange, onBlur, isValid, label, helperText } =
        useXTextField(props);
    const classes = useStyles();

    return (
        <TextField
            className={classes.field}
            error={!isValid}
            id="filled-error-helper-text"
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            value={fieldValue}
            helperText={helperText}
            variant="filled"
        />
    );
}
