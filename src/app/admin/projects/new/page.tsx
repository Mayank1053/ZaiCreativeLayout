import { ProjectForm } from '@/components/admin';

export default function NewProjectPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif font-semibold">New Project</h1>
        <p className="text-muted-foreground">Create a new portfolio project</p>
      </div>
      
      <ProjectForm />
    </div>
  );
}
