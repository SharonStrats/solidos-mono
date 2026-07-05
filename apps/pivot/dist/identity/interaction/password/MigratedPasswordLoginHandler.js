"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigratedPasswordLoginHandler = void 0;
const community_server_1 = require("@solid/community-server");
class MigratedPasswordLoginHandler extends community_server_1.PasswordLoginHandler {
    async login(input) {
        const inspect = input;
        if (inspect.json.email.indexOf('@') === -1) {
            // user is logging in with an account that was migrated from an NSS account using
            // https://github.com/RubenVerborgh/NSS2CSS?tab=readme-ov-file#running-the-script
            // this can happen for instance on https://solidcommunity.net, where such a migration
            // happened in December 2024.
            inspect.json.email += '@users.css.pod';
        }
        return super.login(input);
    }
}
exports.MigratedPasswordLoginHandler = MigratedPasswordLoginHandler;
//# sourceMappingURL=MigratedPasswordLoginHandler.js.map