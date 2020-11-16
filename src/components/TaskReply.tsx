import React, { useEffect, useState } from "react";
import { EMSApiService } from "../services/api/ems";
import TaskReplyForm from "./TaskReplyForm";

interface Props {
  taskId: string;
}

interface Comment {
  _id: string;
  comment: string;
  commentBy: {
    name: string;
  };
  createdAt: string;
}

const TaskReply: React.FC<Props> = ({ taskId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const res = await EMSApiService.getCommentsFromTask(taskId, controller);
      setComments(res.data);
    })();
    return () => controller.abort();
  }, [taskId]);

  const refetchTask = async () => {
    const res = await EMSApiService.getCommentsFromTask(taskId);
    setComments(res.data);
  };

  return (
    <div>
      <h6>
        <b>{comments.length} reply</b>
      </h6>
      {comments.map((comment) => (
        <div
          key={comment._id}
          style={{
            background: "#f9f9f9",
            padding: "5px",
          }}
        >
          <h6>
            <b>{comment.commentBy.name}: </b>
            {comment.createdAt}
          </h6>
          <p>{comment.comment}</p>
        </div>
      ))}
      <TaskReplyForm taskId={taskId} onSuccess={refetchTask} />
    </div>
  );
};

export default TaskReply;
