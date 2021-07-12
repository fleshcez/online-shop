import { Nullable } from "../../../intrastructure/types";
import { FieldError, FieldUpdate } from "../xForm.service";

export interface XFieldProps<T> {
    fieldName: string;
    onUpdate: (field: FieldUpdate) => void;
    errorMessage?: string;
    label: string;
    value?: Nullable<T>;
    onUpdateErrorState?: (err: FieldError) => void;
}
