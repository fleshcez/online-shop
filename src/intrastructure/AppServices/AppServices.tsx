import { createContext, ReactNode, useMemo } from "react";
import { ApiServiceImplementation } from "../services/api.service";

export interface AppServices {
    apiService: any;
}

export const appServiceContext = createContext<AppServices>({} as any);

interface AppServicesProps {
    children: ReactNode | ReactNode[];
}

function useAppServices() {
    const apiService = useMemo(() => new ApiServiceImplementation(), []);
    
    return {
        apiService
    };
}

export function AppServices({ children }: AppServicesProps) {
    const apiService = useAppServices();
    return (
        <appServiceContext.Provider value={apiService}>
            {children}
        </appServiceContext.Provider>
    );
}
