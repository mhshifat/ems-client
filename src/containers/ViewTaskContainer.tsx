import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TaskReply } from "../components";
import { TaskDocumentType } from "../components/EmployeeTasks";
import { EMSApiService } from "../services/api/ems";

const ViewTaskContainer = () => {
  const [task, setTask] = useState<TaskDocumentType | null>(null);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      const res = await EMSApiService.getTask(params.id);
      setTask(res.data);
    })();
  }, [params.id]);

  return (
    <div className="col-xs-6 col-xs-push-3">
      {task ? (
        <Fragment>
          <h5>
            <b>Task: </b>#{task._id}
          </h5>
          <h6>
            <b>Created At: </b>
            {task.createdAt}
          </h6>
          <p
            style={{
              background: "#f9f9f9",
              padding: "10px",
            }}
          >
            {task.task}
          </p>
          <TaskReply taskId={params.id} />
        </Fragment>
      ) : (
        <p>No data found!</p>
      )}
    </div>
  );
};

export default ViewTaskContainer;
