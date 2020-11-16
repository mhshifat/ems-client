import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { EMSApiService } from "../services/api/ems";
import { registerFormValuesValidation } from "../validators";
import { useForm } from "./hooks";

interface Props {}
const REGISTER_DEFAULT = {
  name: "",
  email: "",
  password: "",
  department: "",
  role: "",
};
export type RegisterFormValuesType = typeof REGISTER_DEFAULT;
const RegisterForm: React.FC<Props> = () => {
  const {
    formValues,
    handleChange,
    validationOnSubmit,
    updateFormValueError,
  } = useForm<RegisterFormValuesType>(REGISTER_DEFAULT);
  const [error, setError] = useState("");
  const history = useHistory();

  const handleRegisterFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await validationOnSubmit(registerFormValuesValidation);
      const res = await EMSApiService.register(formValues);
      if (res.success) {
        history.push("/login");
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
    <form className="form-horizontal well" onSubmit={handleRegisterFormSubmit}>
      <fieldset>
        <legend>Register</legend>
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
          <label htmlFor="inputName" className="col-lg-2 control-label">
            Name
          </label>
          <div className="col-lg-10">
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
        </div>
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
          <label className="col-lg-2 control-label">Departments</label>
          <div className="col-lg-10">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="department"
                  onChange={handleChange}
                  id="department1"
                  defaultValue="web development"
                />
                Web Development
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="department"
                  onChange={handleChange}
                  id="department2"
                  defaultValue="seo"
                />
                SEO
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-lg-2 control-label">Role</label>
          <div className="col-lg-10">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="role"
                  onChange={handleChange}
                  id="role1"
                  defaultValue="admin"
                />
                Admin
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="role"
                  onChange={handleChange}
                  id="role2"
                  defaultValue="employee"
                />
                Employee
              </label>
            </div>
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

export default RegisterForm;
