'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Mail, 
  Phone, 
  CheckCircle, 
  Clock, 
  Trash2, 
  Loader2,
  ExternalLink,
  Eye
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  services: string[];
  handled: boolean;
  createdAt: string;
}

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
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Services</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enquiries.map((enquiry) => (
                      <TableRow key={enquiry.id} className={enquiry.handled ? 'opacity-60' : ''}>
                        <TableCell className="font-medium">{enquiry.name}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <a 
                              href={`mailto:${enquiry.email}`}
                              className="flex items-center gap-1 text-sm text-accent hover:underline"
                            >
                              <Mail className="h-3 w-3" />
                              {enquiry.email}
                            </a>
                            {enquiry.phone && (
                              <a 
                                href={`tel:${enquiry.phone}`}
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                              >
                                <Phone className="h-3 w-3" />
                                {enquiry.phone}
                              </a>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {enquiry.services && enquiry.services.length > 0 ? (
                              enquiry.services.slice(0, 2).map((service, i) => (
                                <Badge key={i} variant="secondary" className="text-xs bg-muted">
                                  {service}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-muted-foreground text-xs italic">None</span>
                            )}
                            {enquiry.services && enquiry.services.length > 2 && (
                              <Badge variant="secondary" className="text-xs bg-muted">
                                +{enquiry.services.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm line-clamp-2 max-w-xs text-muted-foreground">{enquiry.message}</p>
                        </TableCell>
                        <TableCell>
                          {enquiry.handled ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Handled
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(enquiry.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View details"
                              onClick={() => setSelectedEnquiry(enquiry)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {!enquiry.handled ? (
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Mark as handled"
                                onClick={() => updateMutation.mutate({ id: enquiry.id, handled: true })}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Mark as pending"
                                onClick={() => updateMutation.mutate({ id: enquiry.id, handled: false })}
                                className="text-orange-600 hover:text-orange-700"
                              >
                                <Clock className="h-4 w-4" />
                              </Button>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-destructive hover:text-destructive"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Enquiry</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this enquiry from {enquiry.name}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteMutation.mutate(enquiry.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    disabled={deleteMutation.isPending}
                                  >
                                    {deleteMutation.isPending ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      'Delete'
                                    )}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {enquiries.map((enquiry) => (
                  <div key={enquiry.id} className={`p-4 rounded-lg border bg-card text-card-foreground shadow-sm space-y-3 ${enquiry.handled ? 'opacity-60' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{enquiry.name}</h3>
                        <p className="text-xs text-muted-foreground">{new Date(enquiry.createdAt).toLocaleDateString()}</p>
                      </div>
                      {enquiry.handled ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Handled
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <a 
                        href={`mailto:${enquiry.email}`}
                        className="flex items-center gap-2 text-sm text-accent hover:underline"
                      >
                        <Mail className="h-3 w-3" />
                        {enquiry.email}
                      </a>
                      {enquiry.phone && (
                        <a 
                          href={`tel:${enquiry.phone}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <Phone className="h-3 w-3" />
                          {enquiry.phone}
                        </a>
                      )}
                    </div>

                    {enquiry.services && enquiry.services.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {enquiry.services.map((service, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-muted">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="bg-muted/50 p-2 rounded text-sm line-clamp-3 text-muted-foreground">
                      {enquiry.message}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setSelectedEnquiry(enquiry)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {!enquiry.handled ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                          onClick={() => updateMutation.mutate({ id: enquiry.id, handled: true })}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700"
                          onClick={() => updateMutation.mutate({ id: enquiry.id, handled: false })}
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Enquiry</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this enquiry from {enquiry.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(enquiry.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              disabled={deleteMutation.isPending}
                            >
                              {deleteMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                'Delete'
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* View Enquiry Dialog */}
      <Dialog open={!!selectedEnquiry} onOpenChange={() => setSelectedEnquiry(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedEnquiry && new Date(selectedEnquiry.createdAt).toLocaleDateString()}
              {' '}- {selectedEnquiry && new Date(selectedEnquiry.createdAt).toLocaleTimeString()}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-lg">{selectedEnquiry.name}</span>
                {selectedEnquiry.handled ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Handled
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={`mailto:${selectedEnquiry.email}`}
                    className="text-accent hover:underline"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
                {selectedEnquiry.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={`tel:${selectedEnquiry.phone}`}
                      className="text-accent hover:underline"
                    >
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                )}
              </div>

              {selectedEnquiry.services && selectedEnquiry.services.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Interested Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEnquiry.services.map((service, i) => (
                      <Badge key={i} variant="outline" className="border-accent/50 bg-accent/5 text-accent-foreground">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-muted p-4 rounded-lg mt-2">
                <p className="text-sm font-medium text-muted-foreground mb-1">Message:</p>
                <p className="text-sm whitespace-pre-wrap">{selectedEnquiry.message}</p>
              </div>
              
              <div className="flex justify-between pt-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" asChild size="sm">
                    <a href={`mailto:${selectedEnquiry.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Reply
                    </a>
                  </Button>
                  {selectedEnquiry.phone && (
                    <Button variant="outline" asChild size="sm">
                      <a href={`tel:${selectedEnquiry.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </a>
                    </Button>
                  )}
                </div>
                <Button
                  size="sm"
                  variant={selectedEnquiry.handled ? "outline" : "default"}
                  onClick={() => {
                    updateMutation.mutate({ id: selectedEnquiry.id, handled: !selectedEnquiry.handled });
                    setSelectedEnquiry({ ...selectedEnquiry, handled: !selectedEnquiry.handled });
                  }}
                >
                  {selectedEnquiry.handled ? (
                    <>
                      <Clock className="h-4 w-4 mr-2" />
                      Mark Pending
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Handled
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

