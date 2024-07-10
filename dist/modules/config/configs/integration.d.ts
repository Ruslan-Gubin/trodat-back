export declare const integrationAuthConfig: {
    auth: {
        username: string;
        password: string;
    };
    headers: {
        configName: string;
        configVersion: string;
    };
};
export declare const integrationBody: {
    goodsGet: {
        auth: {
            clientID: string;
        };
        general: {
            method: string;
            deviceID: string;
        };
    };
    goodsGetPack: {
        auth: {
            clientID: string;
        };
        general: {
            debug: boolean;
            method: string;
            deviceID: string;
        };
    };
    goodsPriceGet: {
        auth: {
            clientID: string;
        };
        general: {
            method: string;
            deviceID: string;
        };
    };
    goodsQuantityGet: {
        auth: {
            clientID: string;
        };
        general: {
            method: string;
            deviceID: string;
        };
    };
};
