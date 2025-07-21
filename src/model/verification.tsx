export interface Column {
  column_name: string;
  description: string;
}

export interface TableInfo {
  name: string;
  description: string;
  columns: Column[];
  verified: boolean;
}

export interface Project {
  id: string;
  name: string;
  tables: TableInfo[];
}