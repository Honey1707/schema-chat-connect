import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Database, FileText, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadSchema = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    projectName: "",
    dbType: "",
    schema: null as File | null,
    credentials: null as File | null,
    description: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      dbType: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'schema' | 'credentials') => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      [fileType]: file
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement file upload and form submission
    console.log("Form submitted:", formData);
    toast({
      title: "Schema Uploaded Successfully!",
      description: "Our team will review your submission and contact you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 to-secondary/30">

      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Upload Your Database Schema</h1>
            <p className="text-xl text-muted-foreground">
              Provide your database details and schema to get started with your custom chat agent
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Info Cards */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Secure & Private</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Your credentials are encrypted and stored securely. We never access your production data.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">All Databases</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Support for PostgreSQL, MySQL, MongoDB, SQL Server, and more database types.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Quick Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Our team typically delivers your custom chat agent within 3-5 business days.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Upload Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl bg-card/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Project Details</CardTitle>
                  <CardDescription>
                    Fill in your database information and upload your schema file
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="projectName" className="text-sm font-medium">
                          Project Name
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
                          Database Type
                        </Label>
                        <Select onValueChange={handleSelectChange} required>
                          <SelectTrigger className="bg-background border-input focus:border-primary">
                            <SelectValue placeholder="Select database type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="postgresql">PostgreSQL</SelectItem>
                            <SelectItem value="mysql">MySQL</SelectItem>
                            <SelectItem value="mongodb">MongoDB</SelectItem>
                            <SelectItem value="sqlserver">SQL Server</SelectItem>
                            <SelectItem value="oracle">Oracle</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="credentials" className="text-sm font-medium">
                        Database Credentials Document
                      </Label>
                      <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                        <div className="space-y-2">
                          <Label htmlFor="credentials" className="cursor-pointer">
                            <span className="text-primary hover:text-primary/80 font-medium">
                              Upload credentials document
                            </span>
                            <span className="text-muted-foreground"> or drag and drop</span>
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            JSON, TXT, or document files containing database connection details (max 5MB)
                          </p>
                        </div>
                        <Input
                          id="credentials"
                          type="file"
                          onChange={(e) => handleFileChange(e, 'credentials')}
                          accept=".json,.txt,.doc,.docx,.pdf"
                          className="hidden"
                          required
                        />
                      </div>
                      {formData.credentials && (
                        <p className="text-sm text-success mt-1">
                          ✓ {formData.credentials.name} uploaded
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="schema" className="text-sm font-medium">
                        Schema File
                      </Label>
                      <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                        <div className="space-y-2">
                          <Label htmlFor="schema" className="cursor-pointer">
                            <span className="text-primary hover:text-primary/80 font-medium">
                              Click to upload
                            </span>
                            <span className="text-muted-foreground"> or drag and drop</span>
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            SQL, JSON, or documentation files (max 10MB)
                          </p>
                        </div>
                        <Input
                          id="schema"
                          type="file"
                          onChange={(e) => handleFileChange(e, 'schema')}
                          accept=".sql,.json,.txt,.md"
                          className="hidden"
                          required
                        />
                      </div>
                      {formData.schema && (
                        <p className="text-sm text-success mt-1">
                          ✓ {formData.schema.name} uploaded
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Project Description (Optional)
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