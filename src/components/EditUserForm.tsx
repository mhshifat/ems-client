import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { EMSApiService } from "../services/api/ems";
import { updateUserFormValuesValidation } from "../validators/user";
import { User } from "./AdminDashboard";
import { useForm } from "./hooks";

interface Props {
  user: User;
}
export type UserFormValuesType = User;
const EditUserForm: React.FC<Props> = ({ user }) => {
  const {
    formValues,
    handleChange,
    validationOnSubmit,
    updateFormValueError,
  } = useForm<User>(user);

  const [error, setError] = useState("");
  const history = useHistory();

  const handleUserEditFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newValues: Partial<User & { __v: number }> = { ...formValues };
    delete newValues._id;
    delete newValues.__v;
    try {
      await validationOnSubmit(updateUserFormValuesValidation, newValues);
      const res = await EMSApiService.updateUser(formValues);
      if (res.success) {
        history.push("/");
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
    <form className="form-horizontal well" onSubmit={handleUserEditFormSubmit}>
      <fieldset>
        <legend>Edit User</legend>
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
                  defaultChecked={formValues.department === "web development"}
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
                  defaultChecked={formValues.department === "seo"}
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
                  defaultChecked={formValues.role === "admin"}
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
                  defaultChecked={formValues.role === "employee"}
                />
                Employee
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="col-lg-10 col-lg-offset-2">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default EditUserForm;
