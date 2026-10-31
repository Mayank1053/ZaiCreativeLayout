'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { UpdateForm, UpdateData } from '@/components/admin/update-form';

export default function EditUpdatePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: update, isLoading, error } = useQuery<UpdateData>({
    queryKey: ['admin-update', id],
    queryFn: async () => {
      const response = await fetch(`/api/admin/updates/${id}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error('Update not found');
        throw new Error('Failed to load update');
      }
      return response.json();
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-accent-blue" />
      </div>
    );
  }

  if (error || !update) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-destructive font-medium">
          {(error as Error)?.message || 'Failed to load update'}
        </p>
        <Button variant="outline" onClick={() => router.push('/admin/updates')}>
          Back to updates
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/updates">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Edit Update</h1>
          <p className="text-sm text-muted-foreground">
            Update content, photos, or publishing details.
          </p>
        </div>
      </div>

      <UpdateForm initialData={update} isEdit={true} />
    </div>
  );
}
