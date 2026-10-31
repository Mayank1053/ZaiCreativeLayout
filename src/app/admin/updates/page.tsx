'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Loader2, ExternalLink, Search, Sparkles, Star } from 'lucide-react';
import { toast } from 'sonner';

interface UpdateItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  gallery: string[];
  published: boolean;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  project?: {
    id: string;
    title: string;
    slug: string;
  } | null;
}

export default function UpdatesAdminPage() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const { data: updates, isLoading } = useQuery<UpdateItem[]>({
    queryKey: ['admin-updates'],
    queryFn: async () => {
      const response = await fetch('/api/admin/updates');
      if (!response.ok) throw new Error('Failed to fetch updates');
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    },
    staleTime: 60 * 1000,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/updates/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete update');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-updates'] });
      toast.success('Update deleted successfully');
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const filteredUpdates = (updates || []).filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set((updates || []).map((u) => u.category)))];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent-blue" /> Studio Updates
          </h1>
          <p className="text-muted-foreground text-sm">
            Publish site progress, design layout releases, celebratory wishes, and announcements.
          </p>
        </div>
        <Link href="/admin/updates/new">
          <Button className="bg-accent-blue hover:bg-accent-blue/90 text-white gap-2">
            <Plus className="h-4 w-4" /> New Update
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="text-xs"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Updates Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">
            All Updates ({filteredUpdates.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-accent-blue" />
            </div>
          ) : filteredUpdates.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-4">No updates found.</p>
              <Link href="/admin/updates/new">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Create your first update
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Cover</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Linked Project</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUpdates.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="relative w-12 h-12 rounded overflow-hidden bg-muted border border-border">
                          {item.coverImage ? (
                            <Image
                              src={item.coverImage}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                              No img
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground line-clamp-1 max-w-[280px]">
                          {item.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          /updates/{item.slug}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.project ? (
                          <span className="text-xs text-accent-blue hover:underline">
                            {item.project.title}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(item.publishedAt || item.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Badge
                            variant={item.published ? 'default' : 'outline'}
                            className={`text-[10px] ${
                              item.published ? 'bg-emerald-600 text-white' : 'text-muted-foreground'
                            }`}
                          >
                            {item.published ? 'Published' : 'Draft'}
                          </Badge>
                          {item.featured && (
                            <Badge variant="outline" className="text-[10px] border-amber-500 text-amber-500 gap-1">
                              <Star className="h-2.5 w-2.5 fill-current" /> Pinned
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {item.published && (
                            <Link href={`/updates/${item.slug}`} target="_blank">
                              <Button variant="ghost" size="icon" className="h-8 w-8" title="View Live">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                          <Link href={`/admin/updates/${item.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => setDeleteId(item.id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this update. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
