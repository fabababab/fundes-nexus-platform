
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  User, 
  Calendar 
} from "lucide-react";

interface ContactInfoModalProps {
  open: boolean;
  onClose: () => void;
  contactId: string;
}

const ContactInfoModal = ({ open, onClose, contactId }: ContactInfoModalProps) => {
  // Mock data - in a real app, this would come from an API
  const contact = {
    name: "Sarah Chen",
    title: "Co-founder & CEO",
    organization: "EcoTech Solutions",
    type: "startup",
    email: "sarah.chen@ecotech.com",
    phone: "+1 (555) 123-4567",
    website: "www.ecotech.com",
    location: "San Francisco, CA",
    joinedDate: "March 2024",
    avatar: null
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Information</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={contact.avatar || ""} />
              <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{contact.name}</h3>
              <p className="text-sm text-muted-foreground">{contact.title}</p>
              <Badge variant="outline" className="mt-1">
                {contact.type}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{contact.organization}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                {contact.email}
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                {contact.phone}
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {contact.website}
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{contact.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {contact.joinedDate}</span>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactInfoModal;
