import { FieldError, FieldUpdate } from "../xForm.service";

export interface XFieldProps<T> {
    fieldName: string;
    onUpdate: (field: FieldUpdate) => void;
    errorMessage?: string;
    label: string;
    value?: T;
    onUpdateErrorState?: (err: FieldError) => void;
}
