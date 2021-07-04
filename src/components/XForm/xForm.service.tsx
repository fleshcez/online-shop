import { createContext, ReactNode, useMemo, useState } from "react";

export interface FieldError {
    fieldName: string;
    error?: string;
}

export interface FieldUpdate {
    fieldName: string;
    value: any;
}

interface FormErrors {
    [key:string]: any;
}

interface FormModel {
    [key:string]: any;
}

export interface XFormService {
    addError: (error: FieldError) => void;
    updateField: (field: FieldUpdate) => void;
    isFormValid: boolean;
    formModel: FormModel;
    formErrors: FormErrors;
}

export const xFormServiceContext = createContext<XFormService>({} as XFormService);

export interface XFormServiceProps {
    children: ReactNode | ReactNode[];
}

function useXFormService(): XFormService {
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [formModel, setFormModel] = useState<FormModel>({});

    const addError = (err: FieldError) => {
        if (err.error) {
            setFormErrors({...formErrors, [err.fieldName]: err.error});
            return;
        }
        delete formErrors[err.fieldName];
        setFormErrors({...formErrors});
    };

    const updateField = ({fieldName, value}: FieldUpdate) => {
        setFormModel({...formModel, [fieldName]: value})
    };

    const isFormValid = useMemo(()=> {
        return Object.keys(formErrors).length === 0;
    }, [formErrors, formModel]);

    return {
        addError,
        updateField,
        formErrors,
        formModel,
        isFormValid
    };
}

export function XFormService({children}: XFormServiceProps) {
    const formService = useXFormService();
    return (
        <xFormServiceContext.Provider value={formService} >
            {children}
        </xFormServiceContext.Provider>
    );
}