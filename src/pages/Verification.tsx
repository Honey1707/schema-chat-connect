import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Save,
  Check,
  Database,
  Table,
  Columns,
  Edit3,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Loading } from "@/components/ui/loading";

interface Column {
  column_name: string;
  description: string;
}

interface TableInfo {
  name: string;
  description: string;
  columns: Column[];
  verified: boolean;
}

interface Project {
  id: string;
  name: string;
  tables: TableInfo[];
}

const Verification = () => {
  const { dbname } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [currentTableIndex, setCurrentTableIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editedTableDescription, setEditedTableDescription] = useState("");
  const [editedColumns, setEditedColumns] = useState<Column[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/projects/${dbname}/verification`,
          {
            withCredentials: true,
          }
        );
        setProject(response.data);

        const unverifiedIndex = response.data.tables.findIndex(
          (table: TableInfo) => !table.verified
        );
        const startIndex = unverifiedIndex >= 0 ? unverifiedIndex : 0;
        setCurrentTableIndex(startIndex);

        if (response.data.tables[startIndex]) {
          setEditedTableDescription(
            response.data.tables[startIndex].description
          );
          setEditedColumns([...response.data.tables[startIndex].columns]);
        }
      } catch (err) {
        setError("Failed to fetch project data");
      } finally {
        setLoading(false);
      }
    };

    if (dbname) fetchProjectData();
  }, [dbname]);

  // Effect to check if all tables are verified and navigate back
  useEffect(() => {
    if (project && project.tables.length > 0) {
      const allTablesVerified = project.tables.every(table => table.verified);
      
      if (allTablesVerified) {
        // Add a small delay to allow user to see the completion state
        const timer = setTimeout(() => {
          navigate(-1);
        }, 1500);

        return () => clearTimeout(timer);
      }
    }
  }, [project, navigate]);

  const currentTable = project?.tables[currentTableIndex];
  const unverifiedTablesCount =
    project?.tables.filter((table) => !table.verified).length || 0;
  const totalTables = project?.tables.length || 0;

  const handleColumnDescriptionChange = (
    columnIndex: number,
    newDescription: string
  ) => {
    const updatedColumns = [...editedColumns];
    updatedColumns[columnIndex] = {
      ...updatedColumns[columnIndex],
      description: newDescription,
    };
    setEditedColumns(updatedColumns);
    setHasChanges(true);
  };

  const handleTableDescriptionChange = (newDescription: string) => {
    setEditedTableDescription(newDescription);
    setHasChanges(true);
  };

  const saveChanges = async () => {
    if (!currentTable || !project) return;

    setSaving(true);
    try {
      await axios.put(
        `http://localhost:8000/projects/${dbname}/tables/${currentTable.name}`,
        {
          description: editedTableDescription,
          columns: editedColumns,
        },
        {
          withCredentials: true,
        }
      );

      const updatedTables = [...project.tables];
      updatedTables[currentTableIndex] = {
        ...updatedTables[currentTableIndex],
        description: editedTableDescription,
        columns: editedColumns,
      };
      setProject({ ...project, tables: updatedTables });
      setHasChanges(false);
    } catch (err) {
      console.error("Failed to save changes:", err);
    } finally {
      setSaving(false);
    }
  };

  const verifyTable = async () => {
    if (!currentTable || !project) return;

    setSaving(true);
    try {
      await axios.put(
        `http://localhost:8000/projects/${dbname}/tables/${currentTable.name}/verify`,
        {},
        {
          withCredentials: true,
        }
      );

      const updatedTables = [...project.tables];
      updatedTables[currentTableIndex] = {
        ...updatedTables[currentTableIndex],
        verified: true,
      };
      setProject({ ...project, tables: updatedTables });

      const nextUnverifiedIndex = updatedTables.findIndex(
        (table, index) => index > currentTableIndex && !table.verified
      );

      if (nextUnverifiedIndex >= 0) {
        setCurrentTableIndex(nextUnverifiedIndex);
        setEditedTableDescription(
          updatedTables[nextUnverifiedIndex].description
        );
        setEditedColumns([...updatedTables[nextUnverifiedIndex].columns]);
        setHasChanges(false);
      }
    } catch (err) {
      console.error("Failed to verify table:", err);
    } finally {
      setSaving(false);
    }
  };

  const navigateToTable = (tableIndex: number) => {
    if (hasChanges) {
      if (
        !confirm(
          "You have unsaved changes. Are you sure you want to navigate away?"
        )
      ) {
        return;
      }
    }

    setCurrentTableIndex(tableIndex);
    setEditedTableDescription(project?.tables[tableIndex].description || "");
    setEditedColumns([...(project?.tables[tableIndex].columns || [])]);
    setHasChanges(false);
  };

  if (loading) return <Loading message="Loading project data..." />;
  if (error)
    return <p className="text-center mt-20 text-lg text-red-500">{error}</p>;
  if (!project || !currentTable)
    return <p className="text-center mt-20 text-lg">Project not found</p>;

  // Check if all tables are verified
  const allTablesVerified = project.tables.every(table => table.verified);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-secondary/20">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Show completion message if all tables are verified */}
          {allTablesVerified && (
            <Card className="border-0 shadow-lg bg-green-50 dark:bg-green-900/20 mb-6 border-green-200 dark:border-green-800">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 text-green-700 dark:text-green-300">
                  <CheckCircle className="w-6 h-6" />
                  <div>
                    <h3 className="font-semibold">Verification Complete!</h3>
                    <p className="text-sm">All tables have been verified. Redirecting...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="sr-only sm:not-sr-only">Back</span>
              </Button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {project.name}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Database Verification
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {hasChanges && (
                <Button
                  onClick={saveChanges}
                  disabled={saving}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 flex-1 sm:flex-none"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving..." : "Save"}</span>
                </Button>
              )}
              <Button
                onClick={verifyTable}
                disabled={saving || currentTable.verified}
                size="sm"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 flex-1 sm:flex-none"
              >
                <Check className="w-4 h-4" />
                <span>{currentTable.verified ? "Verified" : "Verify"}</span>
              </Button>
            </div>
          </div>

          {/* Progress */}
          <Card className="border-0 shadow-sm bg-card mb-6 sm:mb-8">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Verification Progress
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {totalTables - unverifiedTablesCount} of {totalTables}{" "}
                    tables verified
                  </p>
                </div>
                {unverifiedTablesCount > 0 ? (
                  <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/30 px-3 py-1.5 rounded-full">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-orange-700 dark:text-orange-300">
                      {unverifiedTablesCount} tables need verification
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-700 dark:text-green-300">
                      All tables verified
                    </span>
                  </div>
                )}
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-4">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      ((totalTables - unverifiedTablesCount) / totalTables) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Table List Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm bg-card">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Database className="w-5 h-5" />
                    <span>Tables</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1 max-h-[400px] overflow-y-auto">
                    {project.tables.map((table, index) => (
                      <button
                        key={table.name}
                        onClick={() => navigateToTable(index)}
                        className={`w-full text-left p-3 hover:bg-accent/50 transition-colors flex items-center justify-between text-sm ${
                          index === currentTableIndex
                            ? "bg-accent border-r-2 border-primary"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Table className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{table.name}</span>
                        </div>
                        {table.verified ? (
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              {/* Table Information */}
              <Card className="border-0 shadow-sm bg-card">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Table className="w-5 h-5" />
                      <span className="truncate max-w-[200px] sm:max-w-none">
                        {currentTable.name}
                      </span>
                    </CardTitle>
                    <Badge
                      variant={
                        currentTable.verified ? "default" : "destructive"
                      }
                      className="flex items-center gap-1"
                    >
                      {currentTable.verified ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      {currentTable.verified
                        ? "Verified"
                        : "Needs Verification"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                  <div>
                    <Label
                      htmlFor="table-description"
                      className="text-sm font-medium"
                    >
                      Table Description
                    </Label>
                    <Textarea
                      id="table-description"
                      value={editedTableDescription}
                      onChange={(e) =>
                        handleTableDescriptionChange(e.target.value)
                      }
                      placeholder="Enter table description..."
                      className="mt-2 min-h-[120px]"
                      disabled={currentTable.verified}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Columns */}
              <Card className="border-0 shadow-sm bg-card">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Columns className="w-5 h-5" />
                    <span>Columns ({editedColumns.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-3">
                    {editedColumns.map((column, index) => (
                      <Card
                        key={column.column_name}
                        className="border border-border/50"
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm font-medium bg-accent px-2 py-1 rounded">
                                  {column.column_name}
                                </span>
                              </div>
                              <Edit3 className="w-4 h-4 text-muted-foreground" />
                            </div>

                            <div>
                              <Label
                                htmlFor={`desc-${index}`}
                                className="text-xs text-muted-foreground"
                              >
                                Description
                              </Label>
                              <Textarea
                                id={`desc-${index}`}
                                value={column.description}
                                onChange={(e) =>
                                  handleColumnDescriptionChange(
                                    index,
                                    e.target.value
                                  )
                                }
                                placeholder="Enter column description..."
                                className="text-sm mt-1 min-h-[100px]"
                                disabled={currentTable.verified}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;