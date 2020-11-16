import { User } from "../../components/AdminDashboard";
import { LeaveFormValuesType } from "../../components/LeaveForm";
import { TaskFormValuesType } from "../../components/TaskForm";
const API_URI = process.env.REACT_APP_API_URL || "";

export const EMSEndpoints = {
  register: API_URI + "/api/v1/users/register",
  login: API_URI + "/api/v1/users/login",
  users: API_URI + "/api/v1/users",
  user: API_URI + "/api/v1/users/",
  updateUser: API_URI + "/api/v1/users/",
  deleteUser: API_URI + "/api/v1/users/",
  createTask: API_URI + "/api/v1/tasks",
  getTasks: API_URI + "/api/v1/tasks",
  getLeaves: API_URI + "/api/v1/leaves",
  getAdminTask: API_URI + "/api/v1/tasks/admin",
  getAdminLeaves: API_URI + "/api/v1/leaves/admin",
  getTask: API_URI + "/api/v1/tasks/",
  commentOnTask: API_URI + "/api/v1/tasks/comment/",
  getCommentsFromTask: API_URI + "/api/v1/tasks/comments/",
  createLeave: API_URI + "/api/v1/leaves",
};

export const EMSApiService = {
  async register<T = any>(body?: T) {
    try {
      const res = await (
        await fetch(EMSEndpoints.register, {
          method: body ? "POST" : "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async login<T = any>(body?: T) {
    try {
      const res = await (
        await fetch(EMSEndpoints.login, {
          method: body ? "POST" : "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async getUsers(controller: AbortController) {
    try {
      const res = await (
        await fetch(EMSEndpoints.users, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("tid"),
          },
          signal: controller.signal,
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async getUser(userId: string) {
    try {
      const res = await (
        await fetch(EMSEndpoints.user + userId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("tid"),
          },
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async updateUser(body: User) {
    try {
      const res = await (
        await fetch(EMSEndpoints.updateUser + body._id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("tid"),
          },
          body: JSON.stringify(body),
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async deleteUser(id: string) {
    try {
      const res = await (
        await fetch(EMSEndpoints.deleteUser + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("tid"),
          },
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async createTask(body: TaskFormValuesType) {
    try {
      const res = await (
        await fetch(EMSEndpoints.createTask, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("tid"),
          },
          body: JSON.stringify(body),
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async getTasks(controller: AbortController) {
    try {
      const res = await (
        await fetch(EMSEndpoints.getTasks, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("tid"),
          },
          signal: controller.signal,
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async getTask(id: string) {
    try {
      const res = await (
        await fetch(EMSEndpoints.getTask + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("tid"),
          },
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async getAdminTasks(controller?: AbortController) {
    try {
      const res = await (
        await fetch(EMSEndpoints.getAdminTask, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("tid"),
          },
          signal: controller?.signal,
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async commentOnTask(taskId: string, body: Object) {
    try {
      const res = await (
        await fetch(EMSEndpoints.commentOnTask + taskId, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("tid"),
          },
          body: JSON.stringify(body),
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async getCommentsFromTask(taskId: string, controller?: AbortController) {
    try {
      const res = await (
        await fetch(EMSEndpoints.getCommentsFromTask + taskId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("tid"),
          },
          signal: controller?.signal,
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async createLeave(body: LeaveFormValuesType) {
    try {
      const res = await (
        await fetch(EMSEndpoints.createLeave, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("tid"),
          },
          body: JSON.stringify(body),
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async getAdminLeaves(controller?: AbortController) {
    try {
      const res = await (
        await fetch(EMSEndpoints.getAdminLeaves, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("tid"),
          },
          signal: controller?.signal,
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async getLeaves(controller: AbortController) {
    try {
      const res = await (
        await fetch(EMSEndpoints.getLeaves, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("tid"),
          },
          signal: controller.signal,
        })
      ).json();
      if (res.success) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
};
