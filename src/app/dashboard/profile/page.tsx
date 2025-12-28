"use client";

import * as React from "react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { UserProfile } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Pencil } from "lucide-react";


const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  casteCategory: z.enum(["SC", "ST", "OBC", "General", "Minority"]),
  annualIncome: z.coerce.number().min(0, "Annual income must be a positive number."),
  isFarmer: z.enum(["Yes", "No"]),
  occupation: z.enum(["Student", "Employed", "Self-employed", "Unemployed"]),
  hasDisability: z.enum(["Yes", "No"]),
  state: z.string().min(2, "State is required.").default("Andhra Pradesh"),
  district: z.string().min(2, "District is required."),
  profilePictureUrl: z.string().optional(),
});


export default function ProfilePage() {
  const { profile, setProfile, loading } = useUserProfile();
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<UserProfile>({
    resolver: zodResolver(formSchema),
    values: profile || {},
  });

  React.useEffect(() => {
    if (profile) {
      form.reset(profile);
    }
  }, [profile, form]);

  const onSubmit: SubmitHandler<UserProfile> = (data) => {
    setProfile(data);
    toast({ title: "Profile Updated", description: "Your details have been saved successfully." });
  };
  
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        form.setValue("profilePictureUrl", dataUrl);
        // We can also optimistically update the profile here if needed
        if(profile) {
            setProfile({ ...profile, profilePictureUrl: dataUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                 <Avatar className="h-24 w-24">
                  <AvatarImage src={profile?.profilePictureUrl} />
                  <AvatarFallback className="text-3xl">{getInitials(profile?.fullName)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-headline">{profile?.fullName || 'Your Profile'}</CardTitle>
                  <CardDescription>
                    Update your personal details and preferences below.
                  </CardDescription>
                </div>
              </div>
              <Button type="button" variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit Profile Picture</span>
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePictureUpload}
                className="hidden"
                accept="image/*"
              />
            </div>
          </CardHeader>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>This information helps us personalize your experience.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <FormField name="fullName" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="dob" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="gender" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Gender</FormLabel><FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Male" /></FormControl><FormLabel className="font-normal">Male</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Female" /></FormControl><FormLabel className="font-normal">Female</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Other" /></FormControl><FormLabel className="font-normal">Other</FormLabel></FormItem>
                  </RadioGroup>
                </FormControl><FormMessage /></FormItem>
              )} />
               <FormField name="state" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} disabled /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="district" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>District</FormLabel><FormControl><Input placeholder="e.g., Guntur" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle>Socio-Economic Information</CardTitle>
                <CardDescription>Details related to your economic and social background.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <FormField name="casteCategory" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Caste Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent><SelectItem value="SC">SC</SelectItem><SelectItem value="ST">ST</SelectItem><SelectItem value="OBC">OBC</SelectItem><SelectItem value="General">General</SelectItem><SelectItem value="Minority">Minority</SelectItem></SelectContent>
                </Select><FormMessage /></FormItem>
              )} />
              <FormField name="annualIncome" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Annual Family Income (INR)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="occupation" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Occupation Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent><SelectItem value="Student">Student</SelectItem><SelectItem value="Employed">Employed</SelectItem><SelectItem value="Self-employed">Self-employed</SelectItem><SelectItem value="Unemployed">Unemployed</SelectItem></SelectContent>
                </Select><FormMessage /></FormItem>
              )} />
              <FormField name="isFarmer" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Are you a farmer?</FormLabel><FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                  </RadioGroup>
                </FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="hasDisability" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Do you have any disability?</FormLabel><FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                  </RadioGroup>
                </FormControl><FormMessage /></FormItem>
              )} />
            </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}


const ProfileSkeleton = () => (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
            </CardContent>
        </Card>
         <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
        </div>
    </div>
);