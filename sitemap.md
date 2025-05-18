
# Site Structure Overview

## Before Changes

### Shared Pages (Used by All Roles)
- `/dashboard` - General dashboard with role switcher
- `/feed` - News feed (shared)
- `/chatbot` - AI Assistant (shared)
- `/events` - Events calendar (shared)
- `/messages` - Messaging system (shared)
- `/community` - Community forum (shared)

### Role-Specific Pages
- **MSME**
  - `/msme/project-overview` - Project overview for MSMEs
  - `/msme/learning-modules` - Learning modules for MSMEs
- **Fundes**
  - `/fundes` - Fundes dashboard
  - `/fundes/communications` - Fundes communications hub
  - `/fundes/events` - Fundes events calendar
  - `/fundes/tasks` - Fundes task management
- **Investor**
  - `/portfolio` - Investor portfolio
  - `/discover-startups` - Discover startups

## After Changes (Current Implementation)

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
- `/dashboard` - Investor dashboard (when role is set to investor)
- `/portfolio` - Investor portfolio
- `/discover-startups` - Discover startups
- Common pages (temporarily still shared)

### Shared/Fallback Pages
The following pages are still available as shared resources or fallbacks:
- `/feed`
- `/chatbot`
- `/events`
- `/messages`
- `/community`

## Navigation System

The navigation is now role-specific with:

1. **Side Navigation**
   - Displays menu items specific to the current role
   - Updates based on role changes

2. **Header Navigation**
   - Quick access to messages, feed, and events
   - Role-specific routing (for MSME role, links go to MSME-specific versions)

3. **Role Switcher**
   - Allows changing between different roles
   - When switching roles, appropriate role-specific pages are accessible
