import api from "../utils/api";

export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const createProject = async (name: string) => {
  const response = await api.post("/projects", { name });
  return response.data;
};

export const deleteProject = async (id: string) => {
  console.log("Deleting project:", id);

  const response = await api.delete("/projects/" + id);

  return response.data;
};