'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, Star, Sparkles, Image as ImageIcon, Eye, Edit3, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/ui/image-upload';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';
import { toast } from 'sonner';

export interface UpdateData {
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  coverImage: string;
  gallery: string[];
  content: string;
  published: boolean;
  featured: boolean;
  projectId?: string | null;
  publishedAt?: string;
}

interface ProjectOption {
  id: string;
  title: string;
  slug: string;
}

interface UpdateFormProps {
  initialData?: UpdateData;
  isEdit?: boolean;
}

const CATEGORY_PRESETS = [
  'Project & Site Work',
  'Design & Layout',
  'Celebrations & Greetings',
  'Studio News',
];

export function UpdateForm({ initialData, isEdit = false }: UpdateFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<UpdateData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'Project & Site Work',
    excerpt: initialData?.excerpt || '',
    coverImage: initialData?.coverImage || '',
    gallery: initialData?.gallery || [],
    content: initialData?.content || '',
    published: initialData?.published !== undefined ? initialData.published : true,
    featured: initialData?.featured || false,
    projectId: initialData?.projectId || '',
    publishedAt: initialData?.publishedAt
      ? new Date(initialData.publishedAt).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  });

  const [pendingImages, setPendingImages] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  // Fetch projects for linking
  const { data: projects = [] } = useQuery<ProjectOption[]>({
    queryKey: ['admin-projects-simple'],
    queryFn: async () => {
      const response = await fetch('/api/admin/projects');
      if (!response.ok) return [];
      const data = await response.json();
      return Array.isArray(data)
        ? data.map((p) => ({ id: p.id, title: p.title, slug: p.slug }))
        : [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const submitMutation = useMutation({
    mutationFn: async (data: UpdateData) => {
      const url = isEdit
        ? `/api/admin/updates/${initialData?.id}`
        : '/api/admin/updates';

      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save update');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-updates'] });
      toast.success(isEdit ? 'Update updated successfully' : 'Update published successfully');
      router.push('/admin/updates');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    setFormData((prev) => ({
      ...prev,
      title,
      slug: isEdit ? prev.slug : slug,
    }));
  };

  const handleFilesAdded = (files: File[]) => {
    setPendingImages((prev) => [...prev, ...files]);
  };

  const handleRemovePending = (index: number) => {
    setPendingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGalleryChange = (newGallery: string[]) => {
    setFormData((prev) => {
      let newCover = prev.coverImage;
      if (!newGallery.includes(prev.coverImage)) {
        newCover = newGallery[0] || '';
      }
      return { ...prev, gallery: newGallery, coverImage: newCover };
    });
  };

  const handleSetCover = (url: string) => {
    setFormData((prev) => ({ ...prev, coverImage: url }));
    toast.success('Selected as cover image');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalGallery = [...formData.gallery];

    // Upload pending images if any
    if (pendingImages.length > 0) {
      setIsUploading(true);
      try {
        const uploadPromises = pendingImages.map((file) => uploadToCloudinary(file));
        const uploadedUrls = await Promise.all(uploadPromises);
        finalGallery = [...finalGallery, ...uploadedUrls];
      } catch (error) {
        console.error('Failed to upload images', error);
        toast.error('Failed to upload images. Please try again.');
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    // Ensure we have a cover image
    const finalCover = formData.coverImage || finalGallery[0] || '';

    if (!finalCover) {
      toast.error('Please upload at least one image or provide a cover image');
      return;
    }

    submitMutation.mutate({
      ...formData,
      coverImage: finalCover,
      gallery: finalGallery,
      projectId: formData.projectId === 'none' || !formData.projectId ? null : formData.projectId,
    });
  };

  const isSubmitting = submitMutation.isPending || isUploading;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. Basic Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Update Overview</CardTitle>
          <CardDescription>
            Enter the title, category, and a concise summary for cards and social sharing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Modern Villa Slab Casting Completed or Happy Diwali from Creative Layout"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL Path) *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="url-friendly-slug"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(val) => setFormData((prev) => ({ ...prev, category: val }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_PRESETS.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectId">Link to Project (Optional)</Label>
              <Select
                value={formData.projectId || 'none'}
                onValueChange={(val) => setFormData((prev) => ({ ...prev, projectId: val }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select existing project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Standalone Update)</SelectItem>
                  {projects.map((proj) => (
                    <SelectItem key={proj.id} value={proj.id}>
                      {proj.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="publishedAt">Publish Date</Label>
              <Input
                id="publishedAt"
                type="date"
                value={formData.publishedAt}
                onChange={(e) => setFormData((prev) => ({ ...prev, publishedAt: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Brief Description (Excerpt) *</Label>
            <Textarea
              id="excerpt"
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="1–2 sentence summary explaining this update. Displayed on the update cards, search engines, and WhatsApp share snippets."
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* 2. Photo Gallery & Cover Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Photos & Visual Gallery</span>
            <span className="text-xs font-normal text-muted-foreground">
              Click &quot;Set Cover&quot; on any photo to choose the main hero image
            </span>
          </CardTitle>
          <CardDescription>
            Upload site photos, blueprints, 3D renders, or festive greeting artwork.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageUpload
            disabled={isSubmitting}
            value={formData.gallery}
            onChange={handleGalleryChange}
            onFilesAdded={handleFilesAdded}
            pendingFiles={pendingImages}
            onRemovePending={handleRemovePending}
          />

          {formData.gallery.length > 0 && (
            <div className="pt-2 border-t border-border">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                Manage Cover Image Selection
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {formData.gallery.map((url, index) => {
                  const isCover = formData.coverImage === url;
                  return (
                    <div
                      key={url}
                      className={`relative group rounded-md overflow-hidden border-2 transition-all ${
                        isCover
                          ? 'border-accent-blue shadow-md shadow-accent-blue/20 ring-1 ring-accent-blue'
                          : 'border-border opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="relative aspect-video w-full">
                        <Image
                          src={url}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 20vw"
                        />
                      </div>
                      <div className="p-1.5 bg-card/90 text-center">
                        {isCover ? (
                          <Badge variant="default" className="w-full justify-center text-[10px] py-0 h-5 bg-accent-blue text-white">
                            <Star className="h-3 w-3 mr-1 fill-current" /> Cover Image
                          </Badge>
                        ) : (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSetCover(url)}
                            className="w-full h-5 text-[10px] px-1 hover:text-accent-blue"
                          >
                            Set as Cover
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 3. Markdown Blog Text (Copy-Paste Friendly) */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Blog Story / Update Content</CardTitle>
              <CardDescription>
                Write or copy-paste Markdown text directly. Great for AI agents or manual pasting.
              </CardDescription>
            </div>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'write' | 'preview')}>
              <TabsList className="h-8">
                <TabsTrigger value="write" className="text-xs gap-1.5">
                  <Edit3 className="h-3.5 w-3.5" /> Write
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-xs gap-1.5">
                  <Eye className="h-3.5 w-3.5" /> Live Preview
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'write' ? (
            <div className="space-y-2">
              <Textarea
                id="content"
                rows={16}
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                placeholder={`# Heading 1&#10;&#10;Write your project story, structural details, or festive wishes here...&#10;&#10;## Key Highlights&#10;- Foundation poured with M25 concrete&#10;- Vastu alignment verified: North-East corner dedicated for prayer&#10;- 3D architectural elevations finalized&#10;&#10;> &quot;Architecture is the learned game, correct and magnificent, of forms assembled in the light.&quot;`}
                className="font-mono text-sm leading-relaxed"
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent-blue" />
                Supports standard Markdown: <code># Headings</code>, <code>**bold**</code>, <code>*italic*</code>, <code>- lists</code>, <code>&gt; quotes</code>, and links.
              </p>
            </div>
          ) : (
            <div className="min-h-[350px] p-6 rounded-lg border border-border bg-surface-primary overflow-y-auto">
              {formData.content.trim() ? (
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {formData.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-16 italic">
                  No markdown content entered yet. Switch to the Write tab to paste your text.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 4. Publication Settings */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, published: Boolean(checked) }))
                }
              />
              <div>
                <Label htmlFor="published" className="cursor-pointer font-medium">
                  Publish to Live Site
                </Label>
                <p className="text-xs text-muted-foreground">
                  Uncheck to save as a draft visible only in the Admin panel.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, featured: Boolean(checked) }))
                }
              />
              <div>
                <Label htmlFor="featured" className="cursor-pointer font-medium">
                  Mark as Featured Update
                </Label>
                <p className="text-xs text-muted-foreground">
                  Pinned to the top of the Updates page.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Action Buttons */}
      <div className="flex items-center justify-end gap-4 pb-12">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/updates')}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[160px] bg-accent-blue hover:bg-accent-blue/90 text-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isUploading ? 'Uploading Photos...' : 'Saving Update...'}
            </>
          ) : isEdit ? (
            'Save Changes'
          ) : (
            'Publish Update'
          )}
        </Button>
      </div>
    </form>
  );
}
