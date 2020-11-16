import React, { FormEvent, useState } from "react";
import { EMSApiService } from "../services/api/ems";
import { loginFormValuesValidation } from "../validators/auth";
import { useAuth, useForm } from "./hooks";

interface Props {}
const LOGIN_DEFAULT = {
  email: "",
  password: "",
};
export type LoginFormValuesType = typeof LOGIN_DEFAULT;
const LoginForm: React.FC<Props> = () => {
  const {
    formValues,
    handleChange,
    validationOnSubmit,
    updateFormValueError,
  } = useForm<LoginFormValuesType>(LOGIN_DEFAULT);
  const { setUser } = useAuth();
  const [error, setError] = useState("");

  const handleLoginFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await validationOnSubmit(loginFormValuesValidation);
      const res = await EMSApiService.login(formValues);
      if (res.success) {
        if (res?.data?.token) {
          localStorage.setItem("tid", res.data.token);
          setUser({
            uid: res.data.user._id,
            name: res.data.user.name,
            email: res.data.user.email,
            department: res.data.user.department,
            role: res.data.user.role,
          });
        }
      }
    } catch (err) {
      if (err?.errors?.length) {
        const error = new Error(err.errors.join(" "));
        updateFormValueError(error);
      } else {
        setError(err?.message);
      }
    }
  };

  return (
    <form className="form-horizontal well" onSubmit={handleLoginFormSubmit}>
      <fieldset>
        <legend>Login</legend>
        {error && (
          <div className="alert alert-dismissible alert-danger">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              onClick={() => setError("")}
            >
              ×
            </button>
            <strong>Oh snap!</strong> {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="inputEmail" className="col-lg-2 control-label">
            Email
          </label>
          <div className="col-lg-10">
            <input
              type="text"
              className="form-control"
              id="inputEmail"
              placeholder="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword" className="col-lg-2 control-label">
            Password
          </label>
          <div className="col-lg-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="col-lg-10 col-lg-offset-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default LoginForm;
