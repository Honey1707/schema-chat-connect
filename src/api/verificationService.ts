import axios from "axios";
import { Project, TableInfo } from "@/model/verification";

export const fetchProjectData = async (dbname: string) => {
  try {
    const response = await axios.get(`http://localhost:8000/projects/${dbname}/verification`, {
      withCredentials: true,
    });
    return response.data as Project;
  } catch (err) {
    throw new Error("Failed to fetch project data");
  }
};

export const saveTableChanges = async (
  dbname: string,
  tableName: string,
  description: string,
  columns: TableInfo["columns"]
) => {
  try {
    await axios.put(
      `http://localhost:8000/projects/${dbname}/tables/${tableName}`,
      {
        description,
        columns,
      },
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.error("Failed to save changes:", err);
    throw new Error("Failed to save changes");
  }
};

export const verifyTable = async (dbname: string, tableName: string) => {
  try {
    await axios.put(
      `http://localhost:8000/projects/${dbname}/tables/${tableName}/verify`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.error("Failed to verify table:", err);
    throw new Error("Failed to verify table");
  }
};