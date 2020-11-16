import React, { FormEvent, useState } from "react";
import { EMSApiService } from "../services/api/ems";
import { LeaveFormValuesValidation } from "../validators/leave";
import { User } from "./AdminDashboard";
import { useForm } from "./hooks";

interface Props {
  employees: User[];
  onSuccess?: () => void;
}
const LEAVE_DEFAULT = {
  assignTo: [],
  validFrom: "",
  validTo: "",
  earningLeave: "",
  medicalLeave: "",
  casualLeave: "",
};
export type LeaveFormValuesType = typeof LEAVE_DEFAULT;
const LeaveForm: React.FC<Props> = ({ employees, onSuccess }) => {
  const {
    formValues,
    handleChange,
    validationOnSubmit,
    updateFormValueError,
    reset,
  } = useForm<LeaveFormValuesType>(LEAVE_DEFAULT);
  const [error, setError] = useState("");

  const handleLeaveFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await validationOnSubmit(LeaveFormValuesValidation);
      const res = await EMSApiService.createLeave(formValues);
      if (res.success) {
        reset();
        onSuccess?.();
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
    <form className="form-horizontal well" onSubmit={handleLeaveFormSubmit}>
      <fieldset>
        <legend>Assign Leave</legend>
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

        <div className="col-xs-3">
          <div className="form-group">
            <label className="col-lg-12">Employees</label>
            <div className="col-lg-12">
              {employees.map((employee) => (
                <div className="checkbox" key={employee._id}>
                  <label>
                    <input
                      type="checkbox"
                      name="assignTo"
                      onChange={handleChange}
                      defaultValue={employee.name}
                    />
                    {employee.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-xs-9">
          <div className="form-group">
            <label htmlFor="validFrom" className="col-lg-2">
              <b>Valid From:</b>
            </label>
            <div className="col-lg-10">
              <input
                type="date"
                className="form-control"
                id="validFrom"
                name="validFrom"
                value={formValues.validFrom}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="validTo" className="col-lg-2">
              <b>Valid To:</b>
            </label>
            <div className="col-lg-10">
              <input
                type="date"
                className="form-control"
                id="validTo"
                name="validTo"
                value={formValues.validTo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="earningLeave" className="col-lg-2">
              <b>Earning Leave:</b>
            </label>
            <div className="col-lg-10">
              <input
                type="number"
                className="form-control"
                id="earningLeave"
                name="earningLeave"
                value={formValues.earningLeave}
                onChange={handleChange}
                placeholder="No. of leave"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="medicalLeave" className="col-lg-2">
              <b>Medical Leave:</b>
            </label>
            <div className="col-lg-10">
              <input
                type="number"
                className="form-control"
                id="medicalLeave"
                name="medicalLeave"
                value={formValues.medicalLeave}
                onChange={handleChange}
                placeholder="No. of leave"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="casualLeave" className="col-lg-2">
              <b>Casual Leave:</b>
            </label>
            <div className="col-lg-10">
              <input
                type="number"
                className="form-control"
                id="casualLeave"
                name="casualLeave"
                value={formValues.casualLeave}
                onChange={handleChange}
                placeholder="No. of leave"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-lg-10">
              <button type="submit" className="btn btn-primary">
                Assign
              </button>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default LeaveForm;
