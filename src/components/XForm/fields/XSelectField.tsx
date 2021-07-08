import {
    FormControl,
    FormHelperText,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
} from "@material-ui/core";
import { useState, useContext, useRef, useEffect } from "react";
import { Nullable } from "../../../intrastructure/types";
import { xFormServiceContext } from "../xForm.service";
import { XFieldProps } from "./fieldProps";
import { RequiredValidation, useValidation, validate } from "./validation";

export interface XSelectFieldProps<S> extends XFieldProps<S> {
    validation?: RequiredValidation;
    values: Array<{ label: string; value: S }>;
}

const useStyles = makeStyles({
    field: {
        width: "100%",
    },
});

function useXSelectField<S>(props: XSelectFieldProps<S>) {
    const {
        value,
        onUpdate,
        validation,
        errorMessage,
        label,
        onUpdateErrorState,
        fieldName,
        values,
    } = props;

    const formService = useContext(xFormServiceContext);
    const { subscribe, updateField, addError } = formService;

    // Can use component without service. Externat update function takes precedence
    const updateFn = onUpdate || updateField;
    const updateErrorFn = onUpdateErrorState || addError;

    const [selectedValue, setSelectedValue] = useState<Nullable<S>>(value || values[0].value);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const { isValid, onValidation, helperText } = useValidation({
        errorMessage,
        updateErrorFn,
        fieldName,
    });


    const valueRef = useRef<Nullable<S>>();
    const validRef = useRef<boolean>(true);
    validRef.current = isValid;
    valueRef.current = selectedValue;

    const tryValidate = (value: Nullable<S>) => {
        if (validation) {
            const validationResult = validate({ validation, value });
            onValidation(validationResult);
        }
    };

    useEffect(() => {
        subscribe({
            value: valueRef,
            isDirty: () => isDirty,
            setDirty: (dirt) => setIsDirty(dirt),
            isValid: validRef,
            name: fieldName
        });

        tryValidate(value);
    }, []);

    const onBlur = (
        event: { target: { value: S } }
    ) => {
        const value = event.target.value;
        tryValidate(value);

        updateFn({ value, fieldName });
    };

    const onFocus = () => setIsDirty(true);

    const onChange = (
        event: { target: { value: S } }
    ) => {
        const value = event.target.value;
        setSelectedValue(value);
        tryValidate(value);
    };

    return {
        selectedValue,
        values,
        onChange,
        onBlur,
        onFocus,
        label,
        errorMessage: isDirty && helperText,
        showError: !isValid && isDirty,
        isDirty,
    };
}

export function XSelectField<S>(props: XSelectFieldProps<S>) {
    const { selectedValue, onChange, onBlur, values, errorMessage, label, showError } =
        useXSelectField(props);
    const classes = useStyles();
    return (
        <FormControl className={classes.field} error={showError}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedValue}
                onChange={onChange as any}
                onBlur={onBlur as any}
            >
                {values.map((v, index) => {
                    return (
                        <MenuItem key={index} value={v.value as any}>
                            {v.label}
                        </MenuItem>
                    );
                })}
            </Select>
            <FormHelperText>{errorMessage}</FormHelperText>
        </FormControl>
    );
}
