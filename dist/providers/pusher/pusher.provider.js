"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PusherProvider = exports.PUSHER = void 0;
const envs_1 = require("../../config/envs");
const Pusher = require("pusher");
exports.PUSHER = 'PUSHER';
exports.PusherProvider = {
    provide: exports.PUSHER,
    useFactory: () => {
        return new Pusher({
            appId: envs_1.envs.pusher.appId,
            key: envs_1.envs.pusher.key,
            secret: envs_1.envs.pusher.secret,
            cluster: envs_1.envs.pusher.cluster,
            useTLS: true,
        });
    },
};
//# sourceMappingURL=pusher.provider.js.map