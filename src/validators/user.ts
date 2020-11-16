import Joi, { StringSchema } from "joi";
import { User } from "../components/AdminDashboard";

type UserFormValuesType = Omit<User, "_id">;

export const updateUserFormValues: Record<
  keyof UserFormValuesType,
  StringSchema
> = {
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  name: Joi.string().required(),
  department: Joi.string().required(),
  role: Joi.string().required(),
};

export const updateUserFormValuesValidation = Joi.object<UserFormValuesType>(
  updateUserFormValues
);
