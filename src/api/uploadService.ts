import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { FormData } from "@/model/upload";

export const handleUploadSchema = async (userId: string, formData: FormData) => {
  if (!userId) {
    toast({
      title: "Error",
      description: "User ID is missing",
      variant: "destructive",
    });
    throw new Error("User ID is missing");
  }

  if (!formData.credentials) {
    toast({
      title: "Missing Credentials",
      description: "Please upload a credentials document",
      variant: "destructive",
    });
    throw new Error("Please upload a credentials document");
  }

  try {
    // Read the file content as base64
    const fileReader = new FileReader();
    const fileContent = await new Promise<string>((resolve, reject) => {
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = reject;
      fileReader.readAsDataURL(formData.credentials!);
    });

    const requestData = {
      name: formData.projectName,
      dbType: formData.dbType,
      userid: userId,
      status: "processing",
      description: formData.description,
      verified: false,
      credentialDoc: fileContent.split(",")[1], // Remove the data URL prefix
      submittedDate: new Date().toISOString(),
    };

    const response = await axios.post("http://localhost:8000/requests/", requestData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast({
      title: "Schema Uploaded Successfully!",
      description: "Our team will review your submission and contact you within 24 hours.",
    });

    return response.data;
  } catch (error) {
    console.error("Submission error:", error);
    let errorMessage = "There was an error submitting your request. Please try again.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.detail || errorMessage;
    }

    toast({
      title: "Submission Failed",
      description: errorMessage,
      variant: "destructive",
    });
    throw new Error(errorMessage);
  }
};