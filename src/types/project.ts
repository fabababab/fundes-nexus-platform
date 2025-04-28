
export interface Project {
  id: string;
  name: string;
  description: string;
  status: "recruiting" | "active";
}

export interface ProjectApplication {
  projectId: string;
  msmeName: string;
  sector: string;
  contactInfo: string;
  interest?: string;
}

export interface MSMERecommendation {
  projectId: string;
  businessName: string;
  businessType: string;
  contactInfo: string;
}
