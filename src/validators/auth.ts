import Joi, { StringSchema } from "joi";
import { LoginFormValuesType } from "../components/LoginForm";
import { RegisterFormValuesType } from "../components/RegisterForm";

export const registerFormValues: Record<
  keyof RegisterFormValuesType,
  StringSchema
> = {
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  department: Joi.string().required(),
  role: Joi.string().required(),
};

export const registerFormValuesValidation = Joi.object<RegisterFormValuesType>(
  registerFormValues
);

export const loginFormValues: Record<
  keyof LoginFormValuesType,
  StringSchema
> = {
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
};

export const loginFormValuesValidation = Joi.object<LoginFormValuesType>(
  loginFormValues
);
