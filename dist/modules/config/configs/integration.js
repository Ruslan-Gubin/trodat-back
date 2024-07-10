"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.integrationBody = exports.integrationAuthConfig = void 0;
exports.integrationAuthConfig = {
    auth: {
        username: 'AUTH_TOKEN',
        password: 'jU5gujas',
    },
    headers: {
        configName: 'test',
        configVersion: '1',
    },
};
exports.integrationBody = {
    goodsGet: {
        auth: {
            clientID: "0adee25e-53a3-11ee-813e-005056b73475"
        },
        general: {
            method: "goods-get",
            deviceID: "00000032-0023-0001-0001-000000000012"
        },
    },
    goodsGetPack: {
        auth: {
            clientID: 'c02c593e-4c90-11ee-813c-005056b73475',
        },
        general: {
            debug: true,
            method: 'goods-get-pack',
            deviceID: '7474e89d-2075-e44b-bfa9-19208b2d92f0',
        },
    },
    goodsPriceGet: {
        auth: {
            clientID: '3bf3de8f-f93a-11ed-810f-005056b73475',
        },
        general: {
            method: 'goods-price-get',
            deviceID: '0000000517039283',
        },
    },
    goodsQuantityGet: {
        auth: {
            clientID: '3bf3de8f-f93a-11ed-810f-005056b73475',
        },
        general: {
            method: 'goods-quantity-get',
            deviceID: 'e2bea947-e577-b44e-9835-8c99956c5b25',
        },
    },
};
//# sourceMappingURL=integration.js.map