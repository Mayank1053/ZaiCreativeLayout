import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAuth } from '@/lib/auth';
import { db } from '@/lib/db';

// GET: List all updates for admin
export async function GET(request: Request) {
  try {
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates = await db.update.findMany({
      include: {
        project: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(updates);
  } catch (error) {
    console.error('Fetch updates error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch updates' },
      { status: 500 }
    );
  }
}

// POST: Create a new update
export async function POST(request: Request) {
  try {
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      category,
      excerpt,
      coverImage,
      gallery,
      content,
      published = true,
      featured = false,
      projectId,
      publishedAt,
    } = body;

    // Validation
    if (!title || !slug || !excerpt || !coverImage) {
      return NextResponse.json(
        { error: 'Title, slug, excerpt, and cover image are required' },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existingUpdate = await db.update.findUnique({
      where: { slug },
    });

    if (existingUpdate) {
      return NextResponse.json(
        { error: 'An update with this slug already exists' },
        { status: 400 }
      );
    }

    const update = await db.update.create({
      data: {
        title,
        slug,
        category: category || 'General Update',
        excerpt,
        coverImage,
        gallery: Array.isArray(gallery) ? gallery : [],
        content: content || '',
        published: Boolean(published),
        featured: Boolean(featured),
        projectId: projectId || null,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
    });

    revalidatePath('/updates');
    revalidatePath(`/updates/${slug}`);
    revalidatePath('/');

    return NextResponse.json(update, { status: 201 });
  } catch (error) {
    console.error('Create update error:', error);
    return NextResponse.json(
      { error: 'Failed to create update' },
      { status: 500 }
    );
  }
}
