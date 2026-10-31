import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { UpdateForm } from '@/components/admin/update-form';

export default function NewUpdatePage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/updates">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">New Studio Update</h1>
          <p className="text-sm text-muted-foreground">
            Publish a site progress report, design release, festive greeting, or company news.
          </p>
        </div>
      </div>

      <UpdateForm />
    </div>
  );
}
