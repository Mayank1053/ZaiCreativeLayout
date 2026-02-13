'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FolderKanban, Mail, CheckCircle, Clock, Loader2 } from 'lucide-react';

interface Stats {
  totalProjects: number;
  totalEnquiries: number;
  pendingEnquiries: number;
  handledEnquiries: number;
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      // Fetch projects
      const projectsRes = await fetch('/api/admin/projects');
      const projects = projectsRes.ok ? await projectsRes.json() : [];
      
      // Fetch enquiries
      const enquiriesRes = await fetch('/api/enquiries');
      const enquiriesData = enquiriesRes.ok ? await enquiriesRes.json() : { enquiries: [] };
      const enquiries = Array.isArray(enquiriesData.enquiries) ? enquiriesData.enquiries : [];
      
      const pendingEnquiries = enquiries.filter((e: { handled: boolean }) => !e.handled).length;
      const handledEnquiries = enquiries.filter((e: { handled: boolean }) => e.handled).length;
      
      return {
        totalProjects: Array.isArray(projects) ? projects.length : 0,
        totalEnquiries: enquiries.length,
        pendingEnquiries,
        handledEnquiries,
      };
    },
    // Keep data fresh for 1 minute, but allow caching
    staleTime: 60 * 1000,
  });

  if (isLoading || !stats) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-serif font-semibold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-24" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-semibold">Dashboard</h1>
        <Badge variant="secondary" className="text-sm">
          Admin Panel
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
            <FolderKanban className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Portfolio projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Enquiries
            </CardTitle>
            <Mail className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalEnquiries}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Contact submissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Enquiries
            </CardTitle>
            <Clock className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.pendingEnquiries}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Handled Enquiries
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.handledEnquiries}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/projects/new"
              className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <FolderKanban className="h-5 w-5 inline-block mr-2 text-accent" />
              <span>Add New Project</span>
            </a>
            <a
              href="/admin/enquiries"
              className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <Mail className="h-5 w-5 inline-block mr-2 text-accent" />
              <span>View Enquiries</span>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
