import Joi from "joi";

export interface CreateOauthData {
  code: string;
}

export const oauthSchema = Joi.object<CreateOauthData>({
  code: Joi.string().required(),
});
