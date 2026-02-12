'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ProjectForm } from '@/components/admin';
import { Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  direction?: string | null;
  vastuNotes?: string | null;
  images: string[];
  featured: boolean;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
}

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ['admin-project', params.id],
    queryFn: async () => {
      const response = await fetch(`/api/admin/projects/${params.id}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error('Project not found');
        throw new Error('Failed to load project');
      }
      return response.json();
    },
    enabled: !!params.id,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">{(error as Error).message || 'Failed to load project'}</p>
        <button
          onClick={() => router.push('/admin/projects')}
          className="text-accent hover:underline mt-2"
        >
          Back to projects
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif font-semibold">Edit Project</h1>
        <p className="text-muted-foreground">Update project details</p>
      </div>
      
      {project && <ProjectForm project={project} isEdit />}
    </div>
  );
}
