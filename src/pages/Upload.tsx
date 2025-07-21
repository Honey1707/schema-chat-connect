import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { FormData } from "@/model/upload";
import { handleUploadSchema } from "@/api/uploadService";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const UploadSchema = () => {
  const { id: userId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    dbType: "",
    credentials: null,
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      dbType: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file && file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 5MB limit. Please upload a smaller file.");
      return;
    }

    setFormData({
      ...formData,
      credentials: file,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (userId) {
        await handleUploadSchema(userId, formData);
        // Reset form
        setFormData({
          projectName: "",
          dbType: "",
          credentials: null,
          description: "",
        });
        navigate(`/${userId}`);
      }
    } catch (error) {
      // Error handling is done in the service
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 to-secondary/30">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Upload Your Database Schema</h1>
            <p className="text-xl text-muted-foreground">
              Provide your database details to get started with your custom chat agent
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full lg:w-2/3">
              <Card className="border-0 shadow-xl bg-card/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Project Details</CardTitle>
                  <CardDescription>
                    Fill in your database information and upload your schema file
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="projectName" className="text-sm font-medium">
                          Project Name *
                        </Label>
                        <Input
                          id="projectName"
                          name="projectName"
                          placeholder="My Chat Agent Project"
                          value={formData.projectName}
                          onChange={handleInputChange}
                          required
                          className="bg-background border-input focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dbType" className="text-sm font-medium">
                          Database Type *
                        </Label>
                        <Select 
                          onValueChange={handleSelectChange} 
                          value={formData.dbType}
                          required
                        >
                          <SelectTrigger className="bg-background border-input focus:border-primary">
                            <SelectValue placeholder="Select database type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mysql">MySQL</SelectItem>
                            <SelectItem value="postgresql">PostgreSQL</SelectItem>
                            <SelectItem value="mongodb">MongoDB</SelectItem>
                            <SelectItem value="sqlite">SQLite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="credentials" className="text-sm font-medium">
                        Database Credentials Document *
                      </Label>
                      <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                        <div className="space-y-2">
                          <Label htmlFor="credentials" className="cursor-pointer">
                            <span className="text-primary hover:text-primary/80 font-medium">
                              {formData.credentials ? "Change file" : "Upload credentials document"}
                            </span>
                            <span className="text-muted-foreground"> or drag and drop</span>
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            TXT, JSON, or document files (max 5MB)
                          </p>
                        </div>
                        <Input
                          id="credentials"
                          name="credentials"
                          type="file"
                          onChange={handleFileChange}
                          accept=".json,.txt,.doc,.docx,.pdf"
                          className="sr-only"
                          required
                        />
                      </div>
                      {formData.credentials ? (
                        <p className="text-sm text-success mt-1">
                          ✓ {formData.credentials.name} uploaded
                        </p>
                      ) : (
                        <p className="text-sm text-destructive mt-1">
                          * Required field
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Project Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your use case and any specific requirements..."
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="bg-background border-input focus:border-primary resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-lg"
                    >
                      Submit Project
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSchema;