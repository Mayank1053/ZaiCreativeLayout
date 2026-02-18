import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, CheckCircle, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Enquiry } from './enquiry-types';

interface EnquiryDetailDialogProps {
  enquiry: Enquiry | null;
  onClose: () => void;
  onUpdateStatus: (id: string, handled: boolean) => void;
}

export function EnquiryDetailDialog({
  enquiry,
  onClose,
  onUpdateStatus
}: EnquiryDetailDialogProps) {
  return (
    <Dialog open={!!enquiry} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Enquiry Details</DialogTitle>
          <DialogDescription>
            Submitted on {enquiry && new Date(enquiry.createdAt).toLocaleDateString()}
            {' '}- {enquiry && new Date(enquiry.createdAt).toLocaleTimeString()}
          </DialogDescription>
        </DialogHeader>
        
        {enquiry && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">{enquiry.name}</span>
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
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a 
                  href={`mailto:${enquiry.email}`}
                  className="text-accent hover:underline"
                >
                  {enquiry.email}
                </a>
              </div>
              {enquiry.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={`tel:${enquiry.phone}`}
                    className="text-accent hover:underline"
                  >
                    {enquiry.phone}
                  </a>
                </div>
              )}
            </div>

            {enquiry.services && enquiry.services.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Interested Services:</p>
                <div className="flex flex-wrap gap-2">
                  {enquiry.services.map((service) => (
                    <Badge key={service} variant="outline" className="border-accent/50 bg-accent/5 text-accent-foreground">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-muted p-4 rounded-lg mt-2">
              <p className="text-sm font-medium text-muted-foreground mb-1">Message:</p>
              <p className="text-sm whitespace-pre-wrap">{enquiry.message}</p>
            </div>
            
            <div className="flex justify-between pt-4 border-t">
              <div className="flex gap-2">
                <Button variant="outline" asChild size="sm">
                  <a href={`mailto:${enquiry.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Reply
                  </a>
                </Button>
                {enquiry.phone && (
                  <Button variant="outline" asChild size="sm">
                    <a href={`tel:${enquiry.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </a>
                  </Button>
                )}
              </div>
              <Button
                size="sm"
                variant={enquiry.handled ? "outline" : "default"}
                onClick={() => {
                  onUpdateStatus(enquiry.id, !enquiry.handled);
                  // We don't implicitly close here, let parent handle state update which might re-render this
                }}
              >
                {enquiry.handled ? (
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
  );
}
