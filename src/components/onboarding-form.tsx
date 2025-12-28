"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUserProfile } from "@/hooks/use-user-profile";
import type { UserProfile } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
});

const steps = [
  { id: 1, title: "Personal Details", fields: ["fullName", "dob", "gender"] },
  { id: 2, title: "Socio-Economic Details", fields: ["casteCategory", "annualIncome", "isFarmer", "occupation"] },
  { id: 3, title: "Other Details", fields: ["hasDisability", "state", "district"] },
];

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const { setProfile } = useUserProfile();

  const form = useForm<UserProfile>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      dob: "",
      gender: "Male",
      casteCategory: "General",
      annualIncome: 50000,
      isFarmer: "No",
      occupation: "Unemployed",
      hasDisability: "No",
      state: "Andhra Pradesh",
      district: "",
    },
  });

  const onSubmit: SubmitHandler<UserProfile> = (data) => {
    setProfile(data);
    router.push("/dashboard");
  };
  
  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as any, { shouldFocus: true });
    if (!output) return;
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  return (
    <div className="space-y-8">
      <Progress value={((currentStep + 1) / steps.length) * 100} />
      <Form {...form}>
        <form className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <FormField name="fullName" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="dob" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="gender" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Gender</FormLabel><FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Male" /></FormControl><FormLabel className="font-normal">Male</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Female" /></FormControl><FormLabel className="font-normal">Female</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Other" /></FormControl><FormLabel className="font-normal">Other</FormLabel></FormItem>
                  </RadioGroup>
                </FormControl><FormMessage /></FormItem>
              )} />
            </div>
          )}

          {currentStep === 1 && (
             <div className="space-y-4">
               <FormField name="casteCategory" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Caste Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                  <SelectContent><SelectItem value="SC">SC</SelectItem><SelectItem value="ST">ST</SelectItem><SelectItem value="OBC">OBC</SelectItem><SelectItem value="General">General</SelectItem><SelectItem value="Minority">Minority</SelectItem></SelectContent>
                </Select><FormMessage /></FormItem>
              )} />
              <FormField name="annualIncome" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Annual Family Income (INR)</FormLabel><FormControl><Input type="number" placeholder="e.g., 100000" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="isFarmer" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Are you a farmer?</FormLabel><FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                  </RadioGroup>
                </FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="occupation" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Occupation Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                  <SelectContent><SelectItem value="Student">Student</SelectItem><SelectItem value="Employed">Employed</SelectItem><SelectItem value="Self-employed">Self-employed</SelectItem><SelectItem value="Unemployed">Unemployed</SelectItem></SelectContent>
                </Select><FormMessage /></FormItem>
              )} />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <FormField name="hasDisability" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Do you have any disability?</FormLabel><FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                  </RadioGroup>
                </FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="state" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} disabled /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="district" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>District</FormLabel><FormControl><Input placeholder="e.g., Guntur" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button type="button" onClick={handlePrev} variant="outline" disabled={currentStep === 0}>
              <ArrowLeft className="mr-2 h-4 w-4"/> Previous
            </Button>
            <Button type="button" onClick={handleNext} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {currentStep === steps.length - 1 ? "Finish & See Schemes" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
