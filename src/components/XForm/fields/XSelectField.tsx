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
import { XFieldProps } from "./xFieldProps";
import { RequiredValidation } from "./validation";
import { useXFormField } from "./XFormField";

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
        values,
        label
    } = props;
    const [fieldValue, setFieldValue] = useState<Nullable<S>>(value || values[0].value);
    const { isDirty, isValid, helperText, onBlur, onChange, onFocus } = useXFormField<S>({...props, setFieldValue, fieldValue});

    return {
        label,
        showError: !isValid && isDirty,
        errorMessage: isDirty && helperText,
        onBlur,
        onChange,
        onFocus,
        values,
        selectedValue: fieldValue
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
