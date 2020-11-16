import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditUserForm } from "../components";
import { User } from "../components/AdminDashboard";
import { EMSApiService } from "../services/api/ems";

const EditUserContainer = () => {
  const [user, setUser] = useState<User | null>(null);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      const res = await EMSApiService.getUser(params.id);
      setUser(res.data);
    })();
  }, [params.id]);

  return (
    <div className="col-xs-6 col-xs-push-3">
      {user ? <EditUserForm user={user} /> : <p>No data found!</p>}
    </div>
  );
};

export default EditUserContainer;
