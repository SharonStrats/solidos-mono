import { PasswordLoginHandler, JsonView, JsonInteractionHandlerInput, JsonRepresentation, LoginOutputType } from '@solid/community-server';
export declare class MigratedPasswordLoginHandler extends PasswordLoginHandler implements JsonView {
    login(input: JsonInteractionHandlerInput): Promise<JsonRepresentation<LoginOutputType>>;
}
