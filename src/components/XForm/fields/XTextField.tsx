import { makeStyles, TextField } from "@material-ui/core";
import { useEffect, useRef } from "react";
import { useState, useContext } from "react";
import { Nullable } from "../../../intrastructure/types";
import { xFormServiceContext } from "../xForm.service";
import { XFieldProps } from "./fieldProps";
import { useValidation, validate, Validation } from "./validation";

export interface XTextFieldProps extends XFieldProps<string> {
    validation?: Validation;
}

function useXTextField(props: XTextFieldProps) {
    const {
        value,
        validation,
        errorMessage,
        label,
        onUpdate,
        onUpdateErrorState,
        fieldName,
    } = props;
    const formService = useContext(xFormServiceContext);
    const { subscribe, updateField, addError } = formService;

    // Can use component without service. Externat update function takes precedence
    const updateFn = onUpdate || updateField;
    const updateErrorFn = onUpdateErrorState || addError;

    const [fieldValue, setFieldValue] = useState<Nullable<string>>(value || "");
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const { isValid, onValidation, helperText } = useValidation({
        errorMessage,
        updateErrorFn,
        fieldName,
    });

    const tryValidate = (value: Nullable<string>) => {
        if (validation) {
            const validationResult = validate({ validation, value });
            onValidation(validationResult);
        }
    };

    const valueRef = useRef<Nullable<string>>('');
    const validRef = useRef<boolean>(true);
    validRef.current = isValid;
    valueRef.current = fieldValue;

    useEffect(() => {
        subscribe({
            value: valueRef,
            isDirty: () => isDirty,
            setDirty: (dirt) => setIsDirty(dirt),
            isValid: validRef,
            name: fieldName
        });

        tryValidate(valueRef.current);
        updateFn({ value: valueRef.current, fieldName });
    }, []);

    const onBlur = (event: { target: { value: string } }) => {
        const value = event.target.value;
        tryValidate(value);

        updateFn({ value, fieldName });
    };

    const onFocus = () => setIsDirty(true);

    const onChange = (event: { target: { value: string } }) => {
        setFieldValue(event.target.value);
        tryValidate(event.target.value);
    };

    return {
        fieldValue,
        onChange,
        onBlur,
        onFocus,
        isValid,
        label,
        errorMessage: isDirty && helperText,
        isDirty,
        showError: !isValid && isDirty
    };
}

const useStyles = makeStyles({
    field: {
        width: "100%",
    },
});

export function XTextField(props: XTextFieldProps) {
    const {
        fieldValue,
        onChange,
        onBlur,
        label,
        errorMessage,
        onFocus,
        showError
    } = useXTextField(props);
    const classes = useStyles();

    return (
        <TextField
            className={classes.field}
            error={showError}
            id="filled-error-helper-text"
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            value={fieldValue}
            helperText={errorMessage}
            variant="filled"
        />
    );
}
