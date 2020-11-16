import React, { useEffect, useState } from "react";
import { EMSApiService } from "../services/api/ems";
import { User } from "./AdminDashboard";

export interface LeaveDocumentType {
  _id: string;
  validFrom: string;
  validTo: string;
  earningLeave: string;
  medicalLeave: string;
  casualLeave: string;
  assignTo: User[];
  createdAt: string;
}

const AdminAssignedLeaves = () => {
  const [leaves, setLeaves] = useState<LeaveDocumentType[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const res = await EMSApiService.getAdminLeaves(controller);
      setLeaves(res.data);
    })();
    return () => controller.abort();
  }, []);

  return (
    <div>
      <h6>
        <b>All Leaves</b>
      </h6>
      <table className="table table-striped table-hover ">
        <thead>
          <tr>
            <th>#</th>
            <th>Valid From</th>
            <th>Valid To</th>
            <th>Earning Leaves</th>
            <th>Medical Leaves</th>
            <th>Casual Leaves</th>
            <th>Assigned To</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, i) => (
            <tr key={leave._id}>
              <td>{i + 1}</td>
              <td>{leave.validFrom}</td>
              <td>{leave.validTo}</td>
              <td>{leave.earningLeave}</td>
              <td>{leave.medicalLeave}</td>
              <td>{leave.casualLeave}</td>
              <td>
                {leave.assignTo?.map((user) => (
                  <div>{user.name}</div>
                ))}
              </td>
              <td>{leave.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAssignedLeaves;
