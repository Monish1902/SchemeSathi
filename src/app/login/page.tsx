"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/components/logo";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const storedEmail = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');

      if (loginEmail === storedEmail && loginPassword === storedPassword) {
        toast({ title: "Login Successful", description: "Welcome back!" });
        router.push("/dashboard");
      } else {
        toast({ variant: "destructive", title: "Login Failed", description: "Invalid email or password." });
      }
    } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Could not process login." });
    }
  };
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('userEmail', signupEmail);
      localStorage.setItem('userPassword', signupPassword);
      toast({ title: "Signup Successful", description: "You can now log in with your new account." });
      router.push("/onboarding");
    } catch (error) {
       toast({ variant: "destructive", title: "Error", description: "Could not save signup details." });
    }
  };
  
  const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M21.35 11.1h-9.3v2.7h5.3c-.2 1.6-1.2 2.8-2.8 3.8v2.3h3c1.7-1.6 2.7-4 2.7-6.8 0-.6-.1-1.2-.2-1.8z" />
        <path fill="#34A853" d="M12.05 22c2.5 0 4.6-.8 6.1-2.2l-3-2.3c-.8.6-1.9.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H3.85v2.4C5.35 19.9 8.45 22 12.05 22z" />
        <path fill="#FBBC05" d="M6.95 14.3c-.2-.6-.2-1.2-.2-1.8s0-1.2.2-1.8V8.3h-3.1C3.25 9.8 3 11.4 3 13s.25 3.2 1.85 4.7l3.1-2.4z" />
        <path fill="#EA4335" d="M12.05 6.4c1.4 0 2.5.5 3.4 1.4l2.6-2.6C16.65 3.2 14.55 2 12.05 2 8.45 2 5.35 4.1 3.85 7.1L6.95 9.5c.7-2.2 2.7-3.8 5.1-3.8z" />
    </svg>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input id="email-login" type="email" placeholder="user@example.com" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Input id="password-login" type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Login</Button>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full"><GoogleIcon/>Google</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>Join scheme sathi to find schemes tailored for you.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" type="email" placeholder="user@example.com" required value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" type="password" required value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Sign Up</Button>
                 <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full"><GoogleIcon/>Google</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link href="#" className="underline">Terms of Service</Link> and{" "}
        <Link href="#" className="underline">Privacy Policy</Link>.
      </p>
    </div>
  );
}
