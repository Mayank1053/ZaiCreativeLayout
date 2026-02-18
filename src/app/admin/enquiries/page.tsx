'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Mail, 
  CheckCircle, 
  Clock, 
  Loader2
} from 'lucide-react';

import { Enquiry } from './enquiry-types';
import { EnquiryTable } from './enquiry-table';
import { EnquiryCardList } from './enquiry-card-list';
import { EnquiryDetailDialog } from './enquiry-detail-dialog';

export default function EnquiriesPage() {
  const queryClient = useQueryClient();
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const { data: enquiries, isLoading } = useQuery<Enquiry[]>({
    queryKey: ['admin-enquiries'],
    queryFn: async () => {
      const response = await fetch('/api/enquiries');
      if (!response.ok) throw new Error('Failed to fetch enquiries');
      const data = await response.json();
      const loadedEnquiries = Array.isArray(data.enquiries) ? data.enquiries : [];
      return loadedEnquiries.map((e: any) => ({
        ...e,
        services: Array.isArray(e.services) ? e.services : []
      }));
    },
    staleTime: 60 * 1000,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, handled }: { id: string; handled: boolean }) => {
      const response = await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handled }),
      });
      if (!response.ok) throw new Error('Failed to update enquiry');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/enquiries/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete enquiry');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      setSelectedEnquiry(null);
    },
  });

  if (isLoading || !enquiries) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  const pendingCount = enquiries.filter(e => !e.handled).length;
  const handledCount = enquiries.filter(e => e.handled).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-semibold">Enquiries</h1>
          <p className="text-muted-foreground">Manage client enquiries and contact submissions</p>
        </div>
        <div className="flex gap-4">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {pendingCount} Pending
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            {handledCount} Handled
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Enquiries ({enquiries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {enquiries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No enquiries yet.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <EnquiryTable 
                enquiries={enquiries}
                onSelect={setSelectedEnquiry}
                onUpdateStatus={(id, handled) => updateMutation.mutate({ id, handled })}
                onDelete={(id) => deleteMutation.mutate(id)}
                isDeletePending={deleteMutation.isPending}
              />

              {/* Mobile Card View */}
              <EnquiryCardList 
                enquiries={enquiries}
                onSelect={setSelectedEnquiry}
                onUpdateStatus={(id, handled) => updateMutation.mutate({ id, handled })}
                onDelete={(id) => deleteMutation.mutate(id)}
                isDeletePending={deleteMutation.isPending}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* View Enquiry Dialog */}
      <EnquiryDetailDialog 
        enquiry={selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        onUpdateStatus={(id, handled) => {
          updateMutation.mutate({ id, handled });
          // Optimistically update selected enquiry if it's the one we are editing
          if (selectedEnquiry && selectedEnquiry.id === id) {
             setSelectedEnquiry({ ...selectedEnquiry, handled });
          }
        }}
      />
    </div>
  );
}
