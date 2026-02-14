// Admin projects API - list all projects and create new project
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAuth } from '@/lib/auth';
import { db } from '@/lib/db';

// GET: List all projects
export async function GET(request: Request) {
  try {
    // Verify authentication
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Fetch all projects with category info
    const projects = await db.project.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Serialize projects (parse images JSON)
    const serializedProjects = projects.map(project => ({
      ...project,
      images: JSON.parse(project.images),
    }));
    
    return NextResponse.json(serializedProjects);
  } catch (error) {
    console.error('Fetch projects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST: Create new project
export async function POST(request: Request) {
  try {
    // Verify authentication
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const {
      title,
      slug,
      description,
      location,
      direction,
      vastuNotes,
      images,
      featured,
      categoryId,
    } = body;
    
    // Validate required fields
    if (!title || !slug || !description || !location || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if slug already exists
    const existingProject = await db.project.findUnique({
      where: { slug },
    });
    
    if (existingProject) {
      return NextResponse.json(
        { error: 'A project with this slug already exists' },
        { status: 400 }
      );
    }
    
    // Create project
    const project = await db.project.create({
      data: {
        title,
        slug,
        description,
        location,
        direction: direction || null,
        vastuNotes: vastuNotes || null,
        images: JSON.stringify(images || []),
        featured: featured || false,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    // Revalidate projects page
    revalidatePath('/projects');
    
    return NextResponse.json({
      ...project,
      images: JSON.parse(project.images),
    }, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
