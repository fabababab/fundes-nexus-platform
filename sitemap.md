
# Site Structure Overview

## Current Implementation

### MSME-Specific Pages
- `/msme` - MSME dashboard 
- `/msme/feed` - MSME-specific feed
- `/msme/chatbot` - MSME-specific AI assistant
- `/msme/events` - MSME-specific events
- `/msme/messages` - MSME-specific messaging
- `/msme/community` - MSME-specific community
- `/msme/project-overview` - Project overview for MSMEs
- `/msme/learning-modules` - Learning modules for MSMEs

### Fundes-Specific Pages
- `/fundes` - Fundes dashboard
- `/fundes/communications` - Fundes communications hub
- `/fundes/events` - Fundes events calendar
- `/fundes/tasks` - Fundes task management

### Investor-Specific Pages
- `/dashboard` - Default dashboard with role switcher
- `/portfolio` - Investor portfolio
- `/discover-projects` - Discover projects

### Redirects
The following shared pages have been completely removed and now redirect to role-specific versions:
- `/feed` → `/msme/feed`
- `/chatbot` → `/msme/chatbot`
- `/events` → `/msme/events`
- `/messages` → `/msme/messages`
- `/community` → `/msme/community`

### Unassigned Routes
Unassigned routes are now redirected to appropriate role-specific pages:
- `/analytics` → `/fundes`
- `/network` → `/fundes`
- `/documents` → `/msme`
- `/investments` → `/fundes`
- `/database` → `/fundes`
- `/settings` → `/msme`
- `/learning-journey` → `/msme/learning-modules`

## Navigation System

The navigation is fully role-specific with:

1. **Side Navigation**
   - Displays menu items specific to the current role
   - Updates based on role changes

2. **Header Navigation**
   - Quick access to messages, feed, and events
   - Role-specific routing (for MSME role, links go to MSME-specific versions)

3. **Role Switcher**
   - Allows changing between different roles
   - When switching roles, appropriate role-specific pages are accessible
