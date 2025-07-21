import axios from "axios";
import { Project, VerificationStatus } from "@/model/project";

export const fetchProjectsAndProgress = async (userId: string) => {
  try {
    // Fetch projects
    const response = await axios.get(`http://localhost:8000/requests/`, {
      withCredentials: true,
      params: { userid: userId },
    });
    const fetchedProjects: Project[] = response.data.requests;

    // Fetch progress for projects with "need-verification" status
    const progressPromises = fetchedProjects
      .filter((project: Project) => project.status === "need-verification")
      .map((project: Project) =>
        axios
          .post(
            `http://localhost:8000/requests/status`,
            { name: project.name, id: project.id },
            { withCredentials: true }
          )
          .then((res) => ({ [project.id]: res.data }))
      );

    const progressResponses = await Promise.all(progressPromises);
    const progressMap = progressResponses.reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {} as { [key: string]: VerificationStatus }
    );

    return { projects: fetchedProjects, progressData: progressMap };
  } catch (err) {
    throw new Error("Failed to fetch projects or progress");
  }
};

export const handleLogout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/users/logout",
      {},
      { withCredentials: true, timeout: 5000 }
    );
    console.log("Logout response:", response.data);
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    return true;
  } catch (err) {
    console.error("Logout error:", err);
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    return true;
  }
};