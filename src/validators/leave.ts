import Joi, { ArraySchema, StringSchema } from "joi";
import { LeaveFormValuesType } from "../components/LeaveForm";

export const LeaveFormValues: Record<
  keyof LeaveFormValuesType,
  StringSchema | ArraySchema
> = {
  assignTo: Joi.array().items(),
  validFrom: Joi.string().required(),
  validTo: Joi.string().required(),
  earningLeave: Joi.string().required(),
  medicalLeave: Joi.string().required(),
  casualLeave: Joi.string().required(),
};

export const LeaveFormValuesValidation = Joi.object<LeaveFormValuesType>(
  LeaveFormValues
);
