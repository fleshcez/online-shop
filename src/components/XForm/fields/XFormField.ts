import { useContext, useEffect, useRef, useState } from "react";
import { Nullable } from "../../../intrastructure/types";
import { FieldError, FieldUpdate, xFormServiceContext } from "../xForm.service";
import { XFieldProps } from "./fieldProps";
import { useValidation, validate, Validation } from "./validation";

interface FormFieldProps<S> extends XFieldProps<S> {
    validation: Validation;
    setFieldValue: (val: any) => void;
}

export function useFormField<S>({
    validation,
    errorMessage,
    onUpdateErrorState,
    onUpdate,
    fieldName,
    setFieldValue
}: FormFieldProps<S>) {
    const formService = useContext(xFormServiceContext);
    const { subscribe, updateField, addError } = formService;

    // Can use component without service. External update function takes precedence
    const updateFn = onUpdate || updateField;
    const updateErrorFn = onUpdateErrorState || addError;

    const [isDirty, setIsDirty] = useState<boolean>(false);
    const { isValid, onValidation, helperText } = useValidation({
        errorMessage,
        updateErrorFn,
        fieldName,
    });

    const tryValidate = (value: Nullable<S>) => {
        if (validation) {
            const validationResult = validate({ validation, value });
            onValidation(validationResult);
        }
    };

    const valueRef = useRef<Nullable<S>>();
    const validRef = useRef<boolean>(true);
    
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
        setFieldValue(value);
        tryValidate(value);
    };
}
