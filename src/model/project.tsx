export interface Project {
  id: string;
  name: string;
  dbType: string;
  status: "need-verification" | "processing" | "failed" | "verified";
  submittedDate: string;
  description: string;
}

export interface VerificationStatus {
  request_id: string;
  database_name: string;
  verified_tables: number;
  total_tables: number;
}