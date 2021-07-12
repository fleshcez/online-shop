import { makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";
import { Nullable } from "../../../intrastructure/types";
import { XFieldProps } from "./xFieldProps";
import { Validation } from "./validation";
import { useXFormField } from "./XFormField";

export interface XTextFieldProps extends XFieldProps<string> {
    validation?: Validation;
}

function useXTextField(props: XTextFieldProps) {
    const {
        value,
        label,
    } = props;
    const [fieldValue, setFieldValue] = useState<Nullable<string>>(value || "");
    const { isDirty, isValid, helperText, onBlur, onChange, onFocus } = useXFormField<string>({...props, setFieldValue, fieldValue});

    return {
        label,
        showError: !isValid && isDirty,
        errorMessage: isDirty && helperText,
        onBlur,
        onChange,
        onFocus,
        fieldValue
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
