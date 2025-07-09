import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Plus, Clock, CheckCircle, MessageCircle, Database, Calendar } from "lucide-react";
import Header from "@/components/Header";

interface Project {
  id: string;
  name: string;
  dbType: string;
  status: "pending" | "in-progress" | "completed" | "contact-needed";
  submittedDate: string;
  description: string;
}

const Account = () => {
  // Mock data - replace with real data from API
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "E-commerce Analytics Agent",
      dbType: "PostgreSQL",
      status: "completed",
      submittedDate: "2024-01-15",
      description: "Chat agent for customer behavior analysis and sales insights"
    },
    {
      id: "2", 
      name: "HR Management System",
      dbType: "MySQL",
      status: "in-progress",
      submittedDate: "2024-01-20",
      description: "Employee data queries and reporting system"
    },
    {
      id: "3",
      name: "Inventory Management",
      dbType: "MongoDB",
      status: "contact-needed",
      submittedDate: "2024-01-22",
      description: "Real-time inventory tracking and alerts"
    },
    {
      id: "4",
      name: "Financial Dashboard",
      dbType: "SQL Server",
      status: "pending",
      submittedDate: "2024-01-25",
      description: "Financial reporting and analysis chat interface"
    }
  ]);

  const getStatusConfig = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return {
          label: "Completed",
          variant: "default" as const,
          icon: CheckCircle,
          color: "text-success"
        };
      case "in-progress":
        return {
          label: "In Progress",
          variant: "secondary" as const,
          icon: Clock,
          color: "text-primary"
        };
      case "contact-needed":
        return {
          label: "Will Contact You",
          variant: "outline" as const,
          icon: MessageCircle,
          color: "text-muted-foreground"
        };
      case "pending":
        return {
          label: "Pending Review",
          variant: "outline" as const,
          icon: Clock,
          color: "text-muted-foreground"
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 to-secondary/30">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">My Projects</h1>
              <p className="text-xl text-muted-foreground">
                Track the status of your database chat agent projects
              </p>
            </div>
            <Link to="/upload">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-5 h-5 mr-2" />
                New Project
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                    <p className="text-2xl font-bold text-foreground">{projects.length}</p>
                  </div>
                  <Database className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-success">
                      {projects.filter(p => p.status === 'completed').length}
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
                    <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold text-primary">
                      {projects.filter(p => p.status === 'in-progress').length}
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
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-muted-foreground">
                      {projects.filter(p => p.status === 'pending').length}
                    </p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects List */}
          <div className="space-y-6">
            {projects.map((project) => {
              const statusConfig = getStatusConfig(project.status);
              const StatusIcon = statusConfig.icon;

              return (
                <Card key={project.id} className="border-0 shadow-lg bg-card/90 backdrop-blur hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                          <Badge variant={statusConfig.variant} className="flex items-center gap-1">
                            <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                            {statusConfig.label}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{project.description}</p>
                        
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

                      <div className="flex items-center gap-2">
                        {project.status === "completed" && (
                          <Button variant="outline" size="sm">
                            View Agent
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
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
                <h3 className="text-2xl font-semibold text-foreground mb-2">No Projects Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Get started by creating your first database chat agent project
                </p>
                <Link to="/upload">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
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