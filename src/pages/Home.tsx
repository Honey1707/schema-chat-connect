import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Database, MessageSquare, Cloud, Shield, Zap, Users } from "lucide-react";
import Header from "@/components/Header";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 to-secondary/30">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Transform Your Database Into an 
            <span className="text-primary"> Intelligent Chat Agent</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Upload your development database schema and credentials. We'll create a custom chat agent 
            that understands your data and can answer complex queries in natural language.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/upload">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                Start Your Project
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">1. Upload Your Schema</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Securely upload your database schema and provide connection credentials. 
                  We support all major database types.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">2. We Build Your Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our expert team develops a custom chat agent that understands your database 
                  structure and can answer complex queries.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cloud className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">3. Deploy on Your Cloud</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We deploy the chat agent directly on your cloud infrastructure, 
                  ensuring security and compliance with your standards.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose DC Data Design?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Enterprise Security</h3>
                  <p className="text-muted-foreground">Your data never leaves your control. We deploy on your cloud with your security standards.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Lightning Fast</h3>
                  <p className="text-muted-foreground">Get instant answers to complex database queries through natural language conversations.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Expert Team</h3>
                  <p className="text-muted-foreground">Our experienced developers create tailored solutions that understand your unique data structure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Transform Your Database?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of companies already using AI-powered database chat agents to unlock insights from their data.
          </p>
          <Link to="/upload">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-lg">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="text-xl font-bold text-primary">DC</div>
            <div className="text-lg font-light text-foreground">data design</div>
          </div>
          <p className="text-muted-foreground">© 2024 DC Data Design. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;