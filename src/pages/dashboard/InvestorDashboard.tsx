
import React from "react";
import { Briefcase, CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/types/common";

interface InvestorDashboardProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const InvestorDashboard: React.FC<InvestorDashboardProps> = ({ activeRole, onRoleChange }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="rounded-full bg-soft-purple p-6 mb-6">
        <CalendarClock className="h-12 w-12 text-primary-purple" />
      </div>
      <h2 className="text-3xl font-bold mb-4 text-dark-purple">Donor Dashboard Coming Soon</h2>
      <p className="text-lg text-neutral-gray max-w-2xl mx-auto mb-8">
        We're building an enhanced dashboard experience specifically designed for donors. 
        Stay tuned for comprehensive impact metrics, portfolio management tools, and 
        actionable insights to maximize the effectiveness of your contributions.
      </p>
      <div className="bg-soft-gray rounded-lg p-6 max-w-xl mx-auto">
        <h3 className="font-semibold mb-2 text-secondary-purple">Features to expect:</h3>
        <ul className="list-disc list-inside text-left space-y-2 text-gray-700">
          <li>Real-time impact analytics from your funded projects</li>
          <li>Portfolio diversification and management tools</li>
          <li>MSME progress tracking and milestone alerts</li>
          <li>Impact benchmarking against UN SDGs</li>
          <li>Collaboration opportunities with other donors</li>
          <li>Custom reporting and insights dashboard</li>
        </ul>
      </div>
    </div>
  );
};

export default InvestorDashboard;
