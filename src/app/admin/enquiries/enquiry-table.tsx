import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { Mail, Phone, CheckCircle, Clock, Trash2, Loader2, Eye } from 'lucide-react';
import { Enquiry } from './enquiry-types'; // We need to share this type

interface EnquiryTableProps {
  enquiries: Enquiry[];
  onSelect: (enquiry: Enquiry) => void;
  onUpdateStatus: (id: string, handled: boolean) => void;
  onDelete: (id: string) => void;
  isDeletePending: boolean;
}

export function EnquiryTable({
  enquiries,
  onSelect,
  onUpdateStatus,
  onDelete,
  isDeletePending
}: EnquiryTableProps) {
  return (
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
                    enquiry.services.slice(0, 2).map((service) => (
                      <Badge key={service} variant="secondary" className="text-xs bg-muted">
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
                    onClick={() => onSelect(enquiry)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {!enquiry.handled ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Mark as handled"
                      onClick={() => onUpdateStatus(enquiry.id, true)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Mark as pending"
                      onClick={() => onUpdateStatus(enquiry.id, false)}
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
