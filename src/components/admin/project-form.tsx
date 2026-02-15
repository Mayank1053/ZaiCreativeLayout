'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import ImageUpload from '@/components/ui/image-upload';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';
import { toast } from 'sonner';

import { PhasesManager, Phase } from './phases-manager';

// Project interface
interface Project {
  id?: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  direction?: string | null;
  vastuNotes?: string | null;
  images: string[];
  featured: boolean;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
  phases?: Phase[];
}

// Category interface
interface Category {
  id: string;
  name: string;
}

interface ProjectFormProps {
  project?: Project;
  isEdit?: boolean;
}

// Direction options
const DIRECTIONS = [
  'North',
  'South',
  'East',
  'West',
  'North-East',
  'North-West',
  'South-East',
  'South-West',
];

export function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<Project>({
    title: project?.title || '',
    slug: project?.slug || '',
    description: project?.description || '',
    location: project?.location || '',
    direction: project?.direction || '',
    vastuNotes: project?.vastuNotes || '',
    images: project?.images || [],
    featured: project?.featured || false,
    categoryId: project?.categoryId || '',
    phases: project?.phases || [],
  });

  const [pendingImages, setPendingImages] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch categories using React Query
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // Categories don't change often
  });

  const submitMutation = useMutation({
    mutationFn: async (data: Project) => {
      const url = isEdit 
        ? `/api/admin/projects/${project?.id}`
        : '/api/admin/projects';
      
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save project');
      }
      return response.json();
    },
    onSuccess: () => {
      // Invalidate projects and stats
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      if (isEdit) {
        queryClient.invalidateQueries({ queryKey: ['admin-project', project?.id] });
      }
      toast.success(isEdit ? 'Project updated successfully' : 'Project created successfully');
      router.push('/admin/projects');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    setFormData(prev => ({ ...prev, title, slug }));
  };

  // Handle files added (locally)
  const handleFilesAdded = (files: File[]) => {
    setPendingImages(prev => [...prev, ...files]);
  };

  // Remove pending file
  const handleRemovePending = (index: number) => {
    setPendingImages(prev => prev.filter((_, i) => i !== index));
  };
  
  // Update existing images (remove)
  const handleImagesChange = (newImages: string[]) => {
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalImages = [...formData.images];

    // Upload pending images if any
    if (pendingImages.length > 0) {
      setIsUploading(true);
      try {
        const uploadPromises = pendingImages.map(file => uploadToCloudinary(file));
        const uploadedUrls = await Promise.all(uploadPromises);
        finalImages = [...finalImages, ...uploadedUrls];
      } catch (error) {
        console.error("Failed to upload images", error);
        toast.error("Failed to upload images. Please try again.");
        setIsUploading(false);
        return; // Stop submission
      }
      setIsUploading(false);
    }

    // Submit with all image URLs
    submitMutation.mutate({
      ...formData,
      images: finalImages
    });
  };

  const isSubmitting = submitMutation.isPending || isUploading;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Project title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="project-url-slug"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Project description"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Project location"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vastu Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Vastu Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="direction">Direction</Label>
              <Select
                value={formData.direction || ''}
                onValueChange={(value) => setFormData(prev => ({ ...prev, direction: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  {DIRECTIONS.map((direction) => (
                    <SelectItem key={direction} value={direction}>
                      {direction}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vastuNotes">Vastu Notes</Label>
              <Input
                id="vastuNotes"
                value={formData.vastuNotes || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, vastuNotes: e.target.value }))}
                placeholder="Additional vastu details"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Project Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageUpload 
            value={formData.images}
            onChange={handleImagesChange}
            pendingFiles={pendingImages}
            onFilesAdded={handleFilesAdded}
            onRemovePending={handleRemovePending}
            disabled={isSubmitting}
          />
          {pendingImages.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {pendingImages.length} image(s) waiting to be uploaded.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Construction Phases */}
      <PhasesManager 
        phases={formData.phases || []}
        onChange={(phases) => setFormData(prev => ({ ...prev, phases }))}
        pendingUploads={() => {}} // Not used with immediate upload
        onRemovePending={() => {}} // Not used with immediate upload
      />

      {/* Featured */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => 
            setFormData(prev => ({ ...prev, featured: checked as boolean }))
          }
        />
        <Label htmlFor="featured">Featured on homepage</Label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/projects')}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {isUploading 
            ? `Uploading ${pendingImages.length} images...` 
            : (isEdit ? 'Update Project' : 'Create Project')
          }
        </Button>
      </div>
    </form>
  );
}
