import React, { FormEvent, useState } from "react";
import { EMSApiService } from "../services/api/ems";
import { useForm } from "./hooks";

interface Props {
  taskId: string;
  onSuccess?: () => void;
}

const TaskReplyForm: React.FC<Props> = ({ taskId, onSuccess }) => {
  const { formValues, handleChange, updateFormValueError, reset } = useForm({
    comment: "",
  });
  const [error, setError] = useState("");

  const handleTaskReplyFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!formValues.comment) return;
      const res = await EMSApiService.commentOnTask(taskId, formValues);
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
    <form className="form-horizontal" onSubmit={handleTaskReplyFormSubmit}>
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
        <label htmlFor="comment" className="col-lg-12">
          Comment / Message
        </label>
        <div className="col-lg-12">
          <textarea
            className="form-control"
            id="comment"
            placeholder="Comment"
            name="comment"
            value={formValues.comment}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="col-lg-10">
          <button type="submit" className="btn btn-primary">
            Comment
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskReplyForm;
