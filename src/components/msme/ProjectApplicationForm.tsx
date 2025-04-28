
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProjectApplication } from "@/types/project";

interface ProjectApplicationFormProps {
  projectId: string;
  onSubmit: (data: ProjectApplication) => void;
}

export const ProjectApplicationForm = ({ projectId, onSubmit }: ProjectApplicationFormProps) => {
  const form = useForm<ProjectApplication>({
    defaultValues: {
      projectId,
      msmeName: "",
      sector: "",
      contactInfo: "",
      interest: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="msmeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your business name" />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="sector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Sector</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Manufacturing, Retail, Services" />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="contactInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Information</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Email or phone number" />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="interest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why are you interested? (Optional)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Tell us why you're interested in this project" />
              </FormControl>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">Submit Application</Button>
      </form>
    </Form>
  );
};
