import {
    FormControl,
    FormHelperText,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
} from "@material-ui/core";
import { useState } from "react";
import { Nullable } from "../../../intrastructure/types";
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
    const [selectedValue, setSelectedValue] = useState<Nullable<S>>(value || values[0].value);
    const { isValid, onValidation, helperText } = useValidation({
        errorMessage,
        onUpdateErrorState,
        fieldName,
    });

    const onBlur = (
        event: { target: { value: S } }
    ) => {
        const value = event.target.value;
        if (onUpdateErrorState) {
            const validationResult = validate({ validation, value });
            onValidation(validationResult);
        }

        onUpdate({ value, fieldName });
    };

    const onChange = (
        event: { target: { value: S } }
    ) => {
        const value = event.target.value;
        setSelectedValue(value);
        if (onUpdateErrorState && validation) {
            const validationResult = validate({ validation, value });
            onValidation(validationResult);
        }
    };
    return {
        selectedValue,
        onChange,
        onBlur,
        values,
        helperText,
        isValid,
        label,
    };
}

export function XSelectField<S>(props: XSelectFieldProps<S>) {
    const { selectedValue, onChange, onBlur, values, isValid, helperText, label } =
        useXSelectField(props);
    const classes = useStyles();
    return (
        <FormControl className={classes.field} error={!isValid}>
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
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
}
