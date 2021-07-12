import { MutableRefObject, useEffect } from "react";
import { createContext, ReactNode, useState } from "react";

export interface FieldError {
    fieldName: string;
    error?: string;
}

export interface FieldUpdate {
    fieldName: string;
    value: any;
}

interface FormErrors {
    [key: string]: any;
}

interface FormModel {
    [key: string]: any;
}

interface FormSubscriber {
    value: MutableRefObject<any>;
    isDirty: () => boolean;
    setDirty: (dirt: boolean) => void;
    isValid: MutableRefObject<boolean>;
    name: string;
}

export interface XFormService {
    addError: (error: FieldError) => void;
    updateField: (field: FieldUpdate) => void;
    isFormValid: boolean;
    formModel: FormModel;
    formErrors: FormErrors;
    subscribe: (subscriber: FormSubscriber) => void;
    isFormDirty: boolean;
    onAction: (callbackFn:(model:any) => void, validate: boolean) => void;
}

export const xFormServiceContext = createContext<XFormService>(
    {} as XFormService
);

export interface XFormServiceProps {
    children: ReactNode | ReactNode[];
}

function useXFormService(): XFormService {
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [formModel, setFormModel] = useState<FormModel>({});
    const [subscribers, setSubscribers] = useState<FormSubscriber[]>([]);
    const [isFormValid, setIsFormValid] = useState<boolean>(true);
    const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

    const addError = (err: FieldError) => {
        if (err.error) {
            setFormErrors({ ...formErrors, [err.fieldName]: err.error });
            return;
        }
        delete formErrors[err.fieldName];
        setFormErrors({ ...formErrors });
    };

    const validateChildren = () => {
        const res = subscribers.every(s => s.isValid.current);
        setIsFormValid(res);
    };

    // Retrieves form model and calls back with it
    const onAction = (callbackFn: (model:any) => void, validate: boolean) => {
        if(!validate || isFormValid) {
            // Browser autocomplete doesn't trigger change event on fields.
            // Won't have all fields populated if not manually pulling values
            const latestFormModel = subscribers.reduce((acc, cur) => ({
                ...acc,
                [cur.name]: cur.value.current
            }), {});
            callbackFn(latestFormModel);
        } else {
            setIsFormDirty(true);
            subscribers.forEach(s => s.setDirty(true));
        }
    };

    const updateField = ({ fieldName, value }: FieldUpdate) => {
        setFormModel(prevModel => ({ ...prevModel, [fieldName]: value }));
        validateChildren();
    };

    useEffect(() => {
        validateChildren();
    }, [subscribers]);

    const subscribe = (subscriber: FormSubscriber) => {
        setSubscribers(subs => ([...subs, subscriber]));
    };

    return {
        addError,
        updateField,
        formErrors,
        formModel,
        isFormValid,
        subscribe,
        isFormDirty,
        onAction
    };
}

export function XFormService({ children }: XFormServiceProps) {
    const formService = useXFormService();
    return (
        <xFormServiceContext.Provider value={formService}>
            {children}
        </xFormServiceContext.Provider>
    );
}
