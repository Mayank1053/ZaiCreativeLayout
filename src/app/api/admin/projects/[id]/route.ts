// Admin project by ID API - get, update, delete single project
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAuth } from '@/lib/auth';
import { db } from '@/lib/db';

// GET: Get single project by ID
export async function GET(
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
    
    const project = await db.project.findUnique({
      where: { id },
      include: {
        category: true,
        phases: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      ...project,
      images: JSON.parse(project.images),
    });
  } catch (error) {
    console.error('Fetch project error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT: Update project
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
    
    const {
      title,
      slug,
      description,
      location,
      direction,
      floors,
      area,
      images,
      featured,
      categoryId,
      phases,
    } = body;
    
    // Check if project exists
    const existingProject = await db.project.findUnique({
      where: { id },
    });
    
    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Check if new slug conflicts with another project
    if (slug && slug !== existingProject.slug) {
      const slugConflict = await db.project.findUnique({
        where: { slug },
      });
      
      if (slugConflict) {
        return NextResponse.json(
          { error: 'A project with this slug already exists' },
          { status: 400 }
        );
      }
    }
    
    // Use transaction to handle project update and phases sync
    const project = await db.$transaction(async (tx) => {
      // 1. Update project details
      const updatedProject = await tx.project.update({
        where: { id },
        data: {
          title,
          slug,
          description,
          location,
          direction: direction || null,
          floors: floors || null,
          area: area || null,
          images: images ? JSON.stringify(images) : undefined,
          featured,
          categoryId,
        },
      });

      // 2. Handle phases if provided
      if (phases) {
        // Delete existing phases
        await tx.projectPhase.deleteMany({
          where: { projectId: id },
        });

        // Create new phases
        if (phases.length > 0) {
          await tx.projectPhase.createMany({
            data: phases.map((phase: any) => ({
              projectId: id,
              title: phase.title,
              date: phase.date ? new Date(phase.date) : null,
              description: phase.description,
              images: phase.images || [],
              order: phase.order,
            })),
          });
        }
      }

      // Return project with new phases
      return await tx.project.findUnique({
        where: { id },
        include: {
          category: true,
          phases: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      });
    });

    if (!project) throw new Error('Failed to retrieve updated project');

    // Revalidate projects page and specific project page
    revalidatePath('/projects');
    if (project.slug) {
      revalidatePath(`/projects/${project.slug}`);
    }
    // Also revalidate the old slug if it changed
    if (existingProject.slug && existingProject.slug !== project.slug) {
      revalidatePath(`/projects/${existingProject.slug}`);
    }
    
    return NextResponse.json({
      ...project,
      images: JSON.parse(project.images),
    });
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE: Delete project
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
    
    // Check if project exists
    const existingProject = await db.project.findUnique({
      where: { id },
    });
    
    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Delete project
    await db.project.delete({
      where: { id },
    });

    // Revalidate projects page and specific project page
    revalidatePath('/projects');
    if (existingProject.slug) {
        revalidatePath(`/projects/${existingProject.slug}`);
    }
    
    return NextResponse.json(
      { success: true, message: 'Project deleted successfully' }
    );
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
