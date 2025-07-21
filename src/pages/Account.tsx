import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Project, VerificationStatus } from "@/model/project";
import {
  Plus,
  Clock,
  CheckCircle,
  MessageCircle,
  Database,
  Calendar,
  LogOut,
  XCircle,
} from "lucide-react";
import { Loading } from "@/components/ui/loading";
import { fetchProjectsAndProgress, handleLogout } from "@/api/accountService";
import { PieChart, MiniCircularProgress } from "@/components/ui/PieChart";

const Account = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [progressData, setProgressData] = useState<{
    [key: string]: VerificationStatus;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (id) {
          const { projects, progressData } = await fetchProjectsAndProgress(id);
          setProjects(projects);
          setProgressData(progressData);
        }
      } catch (err) {
        setError("Failed to fetch projects or progress");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  if (loading) return <Loading message="Loading your projects..." />;
  if (error)
    return <p className="text-center mt-20 text-lg text-red-500">{error}</p>;

  const getStatusConfig = (status: Project["status"]) => {
    switch (status) {
      case "verified":
        return {
          label: "Verified",
          variant: "default" as const,
          icon: CheckCircle,
          color: "text-success",
        };
      case "processing":
        return {
          label: "Processing",
          variant: "secondary" as const,
          icon: Clock,
          color: "text-primary",
        };
      case "need-verification":
        return {
          label: "Need Verification",
          variant: "outline" as const,
          icon: MessageCircle,
          color: "text-muted-foreground",
        };
      case "failed":
        return {
          label: "Failed",
          variant: "destructive" as const,
          icon: XCircle,
          color: "text-destructive",
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getProgressPercentage = (projectId: string) => {
    const progress = progressData[projectId];
    if (progress && progress.total_tables > 0) {
      return Math.round(
        (progress.verified_tables / progress.total_tables) * 100
      );
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 to-secondary/30">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <header className="container mx-auto px-4 py-6 flex justify-center">
                <img
                  src="/lovable-uploads/9a1ede34-4092-44c9-8fd9-f7f85c01e76e.png"
                  alt="DC Data Design"
                  className="h-10 w-auto"
                />
              </header>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                variant="outline"
                onClick={onLogout}
                className="text-foreground hover:bg-secondary"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
              {projects.length > 0 && (
                <Link to={`/upload/${id}`}>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Project
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Projects
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {projects.length}
                    </p>
                  </div>
                  <Database className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Verified
                    </p>
                    <p className="text-2xl font-bold text-success">
                      {projects.filter((p) => p.status === "verified").length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Processing
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {projects.filter((p) => p.status === "processing").length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Need Verification
                    </p>
                    <p className="text-2xl font-bold text-muted-foreground">
                      {
                        projects.filter((p) => p.status === "need-verification")
                          .length
                      }
                    </p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {projects.map((project) => {
              const statusConfig = getStatusConfig(project.status);
              const StatusIcon = statusConfig.icon;

              return (
                <Card
                  key={project.id}
                  className="border-0 shadow-lg bg-card/90 backdrop-blur hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            {project.name}
                          </h3>
                          <Badge
                            variant={statusConfig.variant}
                            className="flex items-center gap-1"
                          >
                            <StatusIcon
                              className={`w-3 h-3 ${statusConfig.color}`}
                            />
                            {statusConfig.label}
                          </Badge>
                        </div>

                        {project.status === "need-verification" && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-muted-foreground mb-3">
                              Verification Progress
                            </p>
                            <div className="flex items-center gap-4">
                              <PieChart
                                percentage={getProgressPercentage(project.id)}
                                size={70}
                              />
                              <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium text-foreground">
                                  {progressData[project.id]?.verified_tables ||
                                    0}{" "}
                                  of{" "}
                                  {progressData[project.id]?.total_tables || 0}{" "}
                                  tables verified
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {getProgressPercentage(project.id)}% complete
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <p className="text-muted-foreground mb-3">
                          {project.description}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Database className="w-4 h-4" />
                            {project.dbType}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Submitted {formatDate(project.submittedDate)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {project.status === "need-verification" && (
                          <>
                            <MiniCircularProgress
                              verified={
                                progressData[project.id]?.verified_tables || 0
                              }
                              total={
                                progressData[project.id]?.total_tables || 0
                              }
                              size={50}
                              className="mr-2"
                            />
                            <Button variant="outline" size="sm">
                              <Link to={`/${id}/${project.name}`}>Verify</Link>
                            </Button>
                          </>
                        )}
                        {project.status === "verified" && (
                          <Button variant="outline" size="sm" disabled>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {projects.length === 0 && (
            <Card className="border-0 shadow-lg bg-card/90 backdrop-blur">
              <CardContent className="p-12 text-center">
                <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  No Projects Yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get started by creating your first database chat agent project
                </p>
                <Link to={`/upload/${id}`}>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Project
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
