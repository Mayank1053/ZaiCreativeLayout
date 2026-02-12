// Enquiry by ID API - update handled status and delete
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { db } from '@/lib/db';

// PUT: Update enquiry (mark as handled)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    const body = await request.json();
    const { handled } = body;
    
    // Check if enquiry exists
    const existingEnquiry = await db.enquiry.findUnique({
      where: { id },
    });
    
    if (!existingEnquiry) {
      return NextResponse.json(
        { error: 'Enquiry not found' },
        { status: 404 }
      );
    }
    
    // Update enquiry
    const enquiry = await db.enquiry.update({
      where: { id },
      data: {
        handled: handled !== undefined ? handled : existingEnquiry.handled,
      },
    });
    
    return NextResponse.json(enquiry);
  } catch (error) {
    console.error('Update enquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to update enquiry' },
      { status: 500 }
    );
  }
}

// DELETE: Delete enquiry
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    
    // Check if enquiry exists
    const existingEnquiry = await db.enquiry.findUnique({
      where: { id },
    });
    
    if (!existingEnquiry) {
      return NextResponse.json(
        { error: 'Enquiry not found' },
        { status: 404 }
      );
    }
    
    // Delete enquiry
    await db.enquiry.delete({
      where: { id },
    });
    
    return NextResponse.json(
      { success: true, message: 'Enquiry deleted successfully' }
    );
  } catch (error) {
    console.error('Delete enquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to delete enquiry' },
      { status: 500 }
    );
  }
}
