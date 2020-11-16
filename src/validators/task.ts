import Joi, { ArraySchema, StringSchema } from "joi";
import { TaskFormValuesType } from "../components/TaskForm";

export const assignTaskFormValues: Record<
  keyof TaskFormValuesType,
  StringSchema | ArraySchema
> = {
  assignTo: Joi.array().items(),
  task: Joi.string().required(),
};

export const assignTaskFormValuesValidation = Joi.object<TaskFormValuesType>(
  assignTaskFormValues
);
