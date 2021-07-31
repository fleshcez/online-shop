import { useState } from "react";
import { Nullable } from "../../../intrastructure/types";
import { FieldError } from "../xForm.service";

export enum ValidationType {
    required = "required",
    email = "email",
    phone = "phone",
    zip = "zip",
    customFunction = "customFunction",
    creditCardNumber = "creditCardNumber",
}

export interface Validation {
    type: ValidationType;
}

export interface RequiredValidation extends Validation {
    type: ValidationType.required;
}

export interface EmailValidation extends Validation {
    type: ValidationType.email;
}

export interface PhoneValidation extends Validation {
    type: ValidationType.phone;
}

export interface ZipCodeValidation extends Validation {
    type: ValidationType.zip;
}

export interface CustomFunctionValidation<T> extends Validation {
    type: ValidationType.customFunction;
    validationFn: (value: T) => boolean;
}

export interface ValidationProps<T> {
    validation?: Validation;
    value: T;
}

function isNullOrUndefined(value: any) {
    return value === null || value === undefined;
}

function isEmptyString(value: any) {
    return value === "";
}

function validateCreditCardNumber(ccn: string) {
    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    const amexpRegEx = /^(?:3[47][0-9]{13})$/;
    const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

    return (
        visaRegEx.test(ccn) ||
        mastercardRegEx.test(ccn) ||
        amexpRegEx.test(ccn) ||
        discovRegEx.test(ccn)
    );
}

export function validate<T>({ validation, value }: ValidationProps<T>) {
    if (!validation) {
        return true;
    }

    switch (validation.type) {
        case ValidationType.required:
            return isNullOrUndefined(value) || isEmptyString(value)
                ? false
                : true;
        case ValidationType.email:
            const emailRegex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(value as unknown as string);
        case ValidationType.customFunction:
            const valFn = (validation as CustomFunctionValidation<T>)
                .validationFn;
            return valFn(value);
        case ValidationType.phone:
            const phoneRegex = /(^\\+)?[0-9()-]*/;
            return phoneRegex.test(value as unknown as string);
        case ValidationType.zip:
            const zipRegex = /^[0-9]{6,6}$/;
            return zipRegex.test(value as unknown as string);
        case ValidationType.creditCardNumber:
            return validateCreditCardNumber(value as unknown as string);
    }
}

interface UseValidationProps {
    errorMessage: Nullable<string>;
    updateErrorFn: (err: FieldError) => void;
    fieldName: string;
}
export function useValidation({errorMessage, updateErrorFn, fieldName}: UseValidationProps) {
    const [isValid, setIsValid] = useState(true);

    const onValidation = (validationResult: boolean) => {
        var msg = validationResult ? "" : errorMessage || "";
        setIsValid(validationResult);
        updateErrorFn && updateErrorFn({ fieldName, error: msg });
    };

    return {
        onValidation,
        isValid
    }
}