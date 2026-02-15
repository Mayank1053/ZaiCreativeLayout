'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Trash2, GripVertical, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import ImageUpload from '@/components/ui/image-upload';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';
import { toast } from 'sonner';

// Pre-defined phases
const PREDEFINED_PHASES = [
  'Soil/Land Inspection',
  'Floor Planning',
  'Layouting & Foundation Marking',
  'Excavating',
  'Base',
  'Construction',
  'Centering',
  'Roof Concreting',
  'Finishing',
  'Handover'
];

export interface Phase {
  id?: string;
  title: string;
  date: string | null;
  description: string;
  images: string[];
  order: number;
  tempId?: string; // For frontend tracking of new phases
}

interface PhasesManagerProps {
  phases: Phase[];
  onChange: (phases: Phase[]) => void;
  pendingUploads: (files: File[]) => void;
  onRemovePending: (index: number) => void;
}

export function PhasesManager({ 
  phases, 
  onChange,
}: PhasesManagerProps) {
  const [expandedPhaseId, setExpandedPhaseId] = useState<string | number | null>(null);

  // Local state for pending uploads per phase [phaseIndex]: File[]
  const [phasePendingImages, setPhasePendingImages] = useState<Record<number, File[]>>({});

  const handleAddPhase = () => {
    const newPhase: Phase = {
      title: '',
      date: null,
      description: '',
      images: [],
      order: phases.length,
      tempId: `new-${Date.now()}`
    };
    
    const newPhases = [...phases, newPhase];
    onChange(newPhases);
    setExpandedPhaseId(newPhase.tempId || null);
  };

  const handleRemovePhase = (index: number) => {
    const newPhases = phases.filter((_, i) => i !== index);
    // Reorder remaining phases
    newPhases.forEach((p, i) => p.order = i);
    onChange(newPhases);
  };

  const handleMovePhase = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === phases.length - 1)
    ) return;

    const newPhases = [...phases];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newPhases[index], newPhases[targetIndex]] = [newPhases[targetIndex], newPhases[index]];
    
    // Update order
    newPhases.forEach((p, i) => p.order = i);
    onChange(newPhases);
  };

  const updatePhase = (index: number, field: keyof Phase, value: any) => {
    const newPhases = [...phases];
    newPhases[index] = { ...newPhases[index], [field]: value };
    onChange(newPhases);
  };

  // Handle phase image uploads
  // Note: We need to handle this carefully. The main form handles submission.
  // We should probbaly bubble up the pending files or handle upload here?
  // Ideally, the parent form handles everything. For now, let's reuse ImageUpload 
  // but we might need a way to pass the localized pending files back to parent
  // OR we just handle upload immediately here? 
  // Immediate upload is easier but might leave orphaned images if form isn't saved.
  // Given the complexity, let's bubble up pending images? 
  // Actually, let's implement immediate upload for phases to simplify complexity for now,
  // acknowledging the orphan risk. Or better:
  // Let expose a method to getting pending images.
  
  // SIMPLIFICATION: usage of existing ImageUpload component 
  // which generally expects props for handling files.
  // For this 'manager' component, let's keep it simple:
  // We'll manage strictly the data structure. 'images' is an array of strings (URLs).
  // The integration with the actual file uploading needs to be bridged.
  //
  // Refactor thought: The parent `ProjectForm` handles `pendingImages` for the main project.
  // It's going to be messy to merge phase images into that same bucket without complex tracking.
  // A cleaner approach for Phases might be: "Upload Immediately" upon selection.
  // It provides better UX for nested lists anyway.

  const handlePhaseImagesChange = (index: number, newImages: string[]) => {
    updatePhase(index, 'images', newImages);
  };

  const handlePhaseFilesAdded = async (index: number, files: File[]) => {
    // Immediate upload strategy
    const loadingToast = toast.loading(`Uploading ${files.length} image(s)...`);
    
    try {
      const uploadPromises = files.map(file => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      const currentImages = phases[index].images || [];
      updatePhase(index, 'images', [...currentImages, ...uploadedUrls]);
      
      toast.success('Images uploaded successfully');
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Failed to upload images");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Visual Journey / Progress</h3>
        <Button onClick={handleAddPhase} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" /> Add Phase
        </Button>
      </div>

      <div className="space-y-4">
        {phases.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8 border border-dashed rounded-lg">
            No phases added yet. Start by adding a phase like "Soil Inspection".
          </p>
        )}

        {phases.map((phase, index) => {
          const isExpanded = expandedPhaseId === (phase.id || phase.tempId || index);
          const toggleExpand = () => setExpandedPhaseId(isExpanded ? null : (phase.id || phase.tempId || index));

          return (
            <Card key={phase.id || phase.tempId || index} className="overflow-hidden">
              <div className="bg-muted/30 p-3 flex items-center justify-between border-b">
                <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={toggleExpand}>
                  <div className="bg-background p-1 rounded-md border shadow-sm cursor-grab active:cursor-grabbing">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-sm">
                    {index + 1}. {phase.title || '(Untitled Phase)'}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {phase.images.length} images
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7" 
                    disabled={index === 0}
                    onClick={() => handleMovePhase(index, 'up')}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7" 
                    disabled={index === phases.length - 1}
                    onClick={() => handleMovePhase(index, 'down')}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleRemovePhase(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {isExpanded && (
                <CardContent className="p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Stage Title</Label>
                      <Select 
                        value={PREDEFINED_PHASES.includes(phase.title) ? phase.title : (phase.title ? 'custom' : '')} 
                        onValueChange={(val) => {
                          if (val !== 'custom') updatePhase(index, 'title', val);
                          else if (!phase.title) updatePhase(index, 'title', ''); 
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage (e.g. Foundation)" />
                        </SelectTrigger>
                        <SelectContent>
                          {PREDEFINED_PHASES.map(p => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                          <SelectItem value="custom">Custom Stage...</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {(!PREDEFINED_PHASES.includes(phase.title) || phase.title === '') && (
                        <Input 
                          placeholder="e.g. Interior Design" 
                          value={phase.title} 
                          onChange={(e) => updatePhase(index, 'title', e.target.value)}
                          className="mt-2"
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      placeholder="Details about this construction phase..." 
                      value={phase.description || ''} 
                      onChange={(e) => updatePhase(index, 'description', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 bg-muted/20 p-4 rounded-lg border border-dashed">
                    <Label className=" font-semibold text-primary">Visual Asset (Required)</Label>
                    <ImageUpload 
                      value={phase.images}
                      onChange={(imgs) => handlePhaseImagesChange(index, imgs)}
                      pendingFiles={[]} 
                      onFilesAdded={(files) => handlePhaseFilesAdded(index, files)}
                      onRemovePending={() => {}} // No pending tracking for phases (immediate upload)
                      disabled={false}
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
