
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MSMERecommendation } from "@/types/project";

interface ProjectRecommendFormProps {
  projectId: string;
  onSubmit: (data: MSMERecommendation) => void;
}

export const ProjectRecommendForm = ({ projectId, onSubmit }: ProjectRecommendFormProps) => {
  const form = useForm<MSMERecommendation>({
    defaultValues: {
      projectId,
      businessName: "",
      businessType: "",
      contactInfo: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter business name" />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
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
        
        <Button type="submit" className="w-full">Submit Recommendation</Button>
      </form>
    </Form>
  );
};
