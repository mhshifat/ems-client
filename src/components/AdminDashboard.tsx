import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EMSApiService } from "../services/api/ems";
import { useAuth } from "./hooks";

export interface User {
  _id: string;
  name: string;
  email: string;
  department: string;
  role: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const res = await EMSApiService.getUsers(controller);
      if (res?.data) {
        setUsers(res.data);
      }
    })();

    return () => controller.abort();
  }, []);

  const isCurrentUser = (id: string) => {
    return id.toString() === user?.uid.toString();
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await EMSApiService.deleteUser(id);
      if (res?.data?._id) {
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (err) {
      setError(err?.message);
    }
  };

  return (
    <div>
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
      <table className="table table-striped table-hover ">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user._id}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>{user.role}</td>
              <td>
                {isCurrentUser(user._id) ? (
                  "Disabled"
                ) : (
                  <Fragment>
                    <Link to={`/user/${user._id}/edit`}>Edit </Link>|
                    <Link
                      to="/"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteUser(user._id);
                      }}
                    >
                      {" "}
                      Delete
                    </Link>
                  </Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
