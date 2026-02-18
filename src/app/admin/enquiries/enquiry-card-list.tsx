import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, CheckCircle, Clock, Trash2, Loader2, Eye } from 'lucide-react';
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
import { Enquiry } from './enquiry-types';

interface EnquiryCardListProps {
  enquiries: Enquiry[];
  onSelect: (enquiry: Enquiry) => void;
  onUpdateStatus: (id: string, handled: boolean) => void;
  onDelete: (id: string) => void;
  isDeletePending: boolean;
}

export function EnquiryCardList({
  enquiries,
  onSelect,
  onUpdateStatus,
  onDelete,
  isDeletePending
}: EnquiryCardListProps) {
  return (
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
              {enquiry.services.map((service) => (
                <Badge key={service} variant="secondary" className="text-xs bg-muted">
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
              onClick={() => onSelect(enquiry)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            {!enquiry.handled ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                onClick={() => onUpdateStatus(enquiry.id, true)}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700"
                onClick={() => onUpdateStatus(enquiry.id, false)}
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
                    onClick={() => onDelete(enquiry.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={isDeletePending}
                  >
                    {isDeletePending ? (
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
  );
}
