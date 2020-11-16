import React, { FormEvent, useState } from "react";
import { EMSApiService } from "../services/api/ems";
import { assignTaskFormValuesValidation } from "../validators/task";
import { User } from "./AdminDashboard";
import { useForm } from "./hooks";

interface Props {
  employees: User[];
  onSuccess?: () => void;
}
const TASK_DEFAULT = {
  assignTo: [],
  task: "",
};
export type TaskFormValuesType = typeof TASK_DEFAULT;
const TaskForm: React.FC<Props> = ({ employees, onSuccess }) => {
  const {
    formValues,
    handleChange,
    validationOnSubmit,
    updateFormValueError,
    reset,
  } = useForm<TaskFormValuesType>(TASK_DEFAULT);
  const [error, setError] = useState("");

  const handleTaskFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await validationOnSubmit(assignTaskFormValuesValidation);
      const res = await EMSApiService.createTask(formValues);
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
    <form className="form-horizontal well" onSubmit={handleTaskFormSubmit}>
      <fieldset>
        <legend>Assign Task</legend>
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
            <label htmlFor="task" className="col-lg-12">
              Task / Message
            </label>
            <div className="col-lg-12">
              <textarea
                className="form-control"
                id="task"
                placeholder="Task"
                name="task"
                value={formValues.task}
                onChange={handleChange}
                rows={10}
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

export default TaskForm;
