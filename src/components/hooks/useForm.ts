import { ObjectSchema } from "joi";
import { ChangeEvent, useState } from "react";
import { extractErrorMessagesFromErr } from "../../helpers/errors";

const useForm = <T>(defaultValues: T) => {
  const [formValues, setFormValues] = useState<T>(defaultValues);
  const [formValuesErrors, setFormValuesErrors] = useState<string[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      // @ts-ignore
      [name]: Array.isArray(formValues[name])
        ? // @ts-ignore
          formValues[name].includes(value)
          ? // @ts-ignore
            formValues[name].filter((el) => el !== value)
          : // @ts-ignore
            [...formValues[name], value]
        : value,
    });
  };

  const validationOnSubmit = async (
    validateAgainst: ObjectSchema<T>,
    values?: Object
  ) => {
    try {
      await validateAgainst.validateAsync(values || formValues, {
        abortEarly: false,
      });
      return Promise.resolve(formValues);
    } catch (err) {
      const errors = extractErrorMessagesFromErr(err);
      setFormValuesErrors(errors);
      return Promise.reject();
    }
  };

  const updateFormValueError = (err: Error) => {
    const errors = extractErrorMessagesFromErr(err);
    setFormValuesErrors(errors);
  };

  const reset = () => {
    setFormValues(defaultValues);
    setFormValuesErrors([]);
  };

  return {
    formValues,
    handleChange,
    formValuesErrors,
    validationOnSubmit,
    updateFormValueError,
    reset,
  };
};

export default useForm;
