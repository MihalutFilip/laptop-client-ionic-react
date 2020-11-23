import { NetworkStatus } from "@capacitor/core";
import { Network } from "@capacitor/core/dist/esm/web/network";
import { useEffect, useState } from "react";
import LocalStorage from "./LocalStorage";

const initialState = {
    connected: false,
    connectionType: 'unknown',
}

export const useNetworkStatus = () => {
    const [networkStatus, setNetworkStatus] = useState(initialState);
    useEffect(() => {
        const handler = Network.addListener('networkStatusChange', handleNetworkStatusChange);
        Network.getStatus().then(handleNetworkStatusChange);
        let canceled = false;
        return () => {
            canceled = true;
            handler.remove();
        }

        function handleNetworkStatusChange(status: NetworkStatus) {
            LocalStorage.setConnection(status);
            console.log('useNetwork - status change', status);
            if (!canceled) {
                setNetworkStatus(status);
            }
        }
    }, [])
    return { networkStatus };
};
