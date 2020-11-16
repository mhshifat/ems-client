import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EMSApiService } from "../services/api/ems";

export interface TaskDocumentType {
  _id: string;
  task: string;
  createdAt: string;
}

const EmployeeTasks = () => {
  const [tasks, setTasks] = useState<TaskDocumentType[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const res = await EMSApiService.getTasks(controller);
      setTasks(res.data);
    })();
    return () => controller.abort();
  }, []);

  return (
    <div>
      <h6>
        <b>All Tasks</b>
      </h6>
      <table className="table table-striped table-hover ">
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr key={task._id}>
              <td>{i + 1}</td>
              <td>
                {task.task.length > 50
                  ? task.task.substr(0, 50) + "..."
                  : task.task}
              </td>
              <td>{task.createdAt}</td>
              <td>
                <Link to={`/task/${task._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTasks;
