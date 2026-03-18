"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../utils/api";

type Task = {
  id: string;
  title: string;
  status: string;
};

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<{ id: string; name: string } | null>(
    null,
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [filter, setFilter] = useState<"ALL" | "TODO" | "DONE">("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [error, setError] = useState<string | null>(null);

  const handleDeleteProject = async () => {
    console.log("Delete clicked");

    try {
      await api.delete(`/projects/${projectId}`);
      router.push("/dashboard");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  const handleCreateTask = async () => {
    if (!taskTitle.trim()) return;

    try {
      const res = await api.post("/tasks", {
        title: taskTitle,
        projectId: projectId,
      });

      setTasks((prev) => [...prev, res.data]);
      setTaskTitle("");
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  const toggleTaskStatus = async (task: Task) => {
    try {
      const newStatus = task.status === "DONE" ? "TODO" : "DONE";

      const res = await api.patch(`/tasks/${task.id}`, {
        status: newStatus,
      });

      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, status: res.data.status } : t,
        ),
      );
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${projectId}`);
        setProject(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTasks = async () => {
      try {
        const res = await api.get(
          `/tasks/${projectId}?page=${page}&limit=5&search=${search}&sortBy=${sortBy}&order=${order}${
            filter !== "ALL" ? `&status=${filter}` : ""
          }`,
        );

        setTasks(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error(error);
        setError("Failed to load tasks");
      }
    };

    fetchProject();
    fetchTasks();
  }, [projectId, page, search, sortBy, order, filter]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-4 bg-gray-200 px-3 py-1 rounded text-black"
      >
        ← Back to Dashboard
      </button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Details</h1>

        <button
          onClick={handleDeleteProject}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Project
        </button>
      </div>

      <div className="mb-6">
  <div className="inline-flex items-center gap-3 bg-gray-900 px-5 py-3 rounded-lg border border-gray-700">
    <span className="text-base text-gray-400">
      Project
    </span>
    <span className="text-lg font-semibold text-white">
      {project ? project.name : "Loading..."}
    </span>
  </div>
</div>

      <div className="flex gap-2 mt-4 mb-4">
        <input
          type="text"
          placeholder="Enter task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
        />

        <button
          onClick={handleCreateTask}
          className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>
      )}

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-4 mb-4">
          {/* Sorting */}
          <select
            value={order}
            onChange={(e) => {
              const newOrder = e.target.value as "asc" | "desc";
              setSortBy("createdAt");
              setOrder(newOrder);
            }}
            className="p-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>

          {/* Search */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="p-2 rounded bg-gray-800 text-white border border-gray-700 w-64"
          />

          {/* Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setFilter("ALL");
                setPage(1);
              }}
              className={`px-3 py-1 rounded ${
                filter === "ALL"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              All
            </button>

            <button
              onClick={() => {
                setFilter("TODO");
                setPage(1);
              }}
              className={`px-3 py-1 rounded ${
                filter === "TODO"
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              TODO
            </button>

            <button
              onClick={() => {
                setFilter("DONE");
                setPage(1);
              }}
              className={`px-3 py-1 rounded ${
                filter === "DONE"
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              DONE
            </button>
          </div>
        </div>
        {tasks.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            <p className="text-lg">📭 No tasks yet</p>
            <p className="text-sm mt-2">Create your first task above</p>
          </div>
        ) : (
          (tasks || [])
            .filter((task) => filter === "ALL" || task.status === filter)
            .map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTaskStatus(task)}
                className="border p-3 rounded-md bg-gray-900 text-white cursor-pointer flex justify-between"
              >
                <span>{task.title}</span>
                <div className="flex gap-3">
                  <span>{task.status === "DONE" ? "✅" : "⬜"}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                    }}
                    className="text-red-400 hover:text-red-600"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
      <div className="flex gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-400">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
