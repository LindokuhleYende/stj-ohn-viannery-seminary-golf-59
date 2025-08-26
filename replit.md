# Overview

This is a fundraising golf event website for St John Vianney Seminary's 2nd Annual Golf Day. The application allows users to register for golf packages, make sponsorship commitments, and manage event participation. The system handles user authentication, registration management, and generates invoices for participants.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Radix UI primitives with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack React Query for server state, React Hook Form for form management
- **Routing**: React Router for client-side navigation
- **Form Validation**: Zod schema validation with react-hook-form integration

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful endpoints with structured error handling
- **Authentication**: Custom session-based auth with bcrypt password hashing
- **File Structure**: Monorepo with shared schema between client and server

## Data Storage Solutions
- **Primary Database**: PostgreSQL configured through Drizzle
- **Schema Design**: Three main entities - users, packages, and registrations
- **Connection**: Neon Database serverless PostgreSQL
- **Migrations**: Drizzle Kit for schema migrations and database management

## Authentication and Authorization
- **Strategy**: Custom authentication with JWT-like token storage in localStorage
- **Password Security**: bcrypt for password hashing
- **Session Management**: Express sessions with connect-pg-simple for PostgreSQL storage
- **Protected Routes**: Client-side route protection with redirect to auth page

## Key Features
- **Registration System**: Multi-step registration with package selection
- **Invoice Generation**: Automatic invoice creation with unique invoice numbers
- **Package Management**: Different golf and sponsorship packages with pricing
- **Countdown Timer**: Event countdown display on homepage
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS

# External Dependencies

## Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection for Neon Database
- **@supabase/supabase-js**: Authentication and database client (legacy, being replaced)
- **drizzle-orm**: Type-safe ORM for PostgreSQL operations
- **postgres**: PostgreSQL client for Node.js

## UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe CSS class management
- **lucide-react**: Icon library for React components

## Form and Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Validation resolvers for react-hook-form
- **zod**: TypeScript-first schema validation library

## Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Type safety and enhanced developer experience
- **tsx**: TypeScript execution for Node.js development
- **esbuild**: Fast JavaScript bundler for production builds

## Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit development environment integration