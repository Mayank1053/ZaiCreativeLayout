import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAuth } from '@/lib/auth';
import { db } from '@/lib/db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET: Get single update by ID
export async function GET(request: Request, context: RouteContext) {
  try {
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    const update = await db.update.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    if (!update) {
      return NextResponse.json({ error: 'Update not found' }, { status: 404 });
    }

    return NextResponse.json(update);
  } catch (error) {
    console.error('Fetch update error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch update' },
      { status: 500 }
    );
  }
}

// PUT: Update an update
export async function PUT(request: Request, context: RouteContext) {
  try {
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();

    const {
      title,
      slug,
      category,
      excerpt,
      coverImage,
      gallery,
      content,
      published,
      featured,
      projectId,
      publishedAt,
    } = body;

    // Check existence
    const existing = await db.update.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Update not found' }, { status: 404 });
    }

    // Slug check if changed
    if (slug && slug !== existing.slug) {
      const slugTaken = await db.update.findUnique({ where: { slug } });
      if (slugTaken) {
        return NextResponse.json(
          { error: 'An update with this slug already exists' },
          { status: 400 }
        );
      }
    }

    const updated = await db.update.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(category !== undefined && { category }),
        ...(excerpt !== undefined && { excerpt }),
        ...(coverImage !== undefined && { coverImage }),
        ...(gallery !== undefined && { gallery: Array.isArray(gallery) ? gallery : [] }),
        ...(content !== undefined && { content }),
        ...(published !== undefined && { published: Boolean(published) }),
        ...(featured !== undefined && { featured: Boolean(featured) }),
        ...(projectId !== undefined && { projectId: projectId || null }),
        ...(publishedAt !== undefined && { publishedAt: new Date(publishedAt) }),
      },
    });

    revalidatePath('/updates');
    revalidatePath(`/updates/${updated.slug}`);
    if (existing.slug !== updated.slug) {
      revalidatePath(`/updates/${existing.slug}`);
    }
    revalidatePath('/');

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update update error:', error);
    return NextResponse.json(
      { error: 'Failed to update update' },
      { status: 500 }
    );
  }
}

// DELETE: Delete an update
export async function DELETE(request: Request, context: RouteContext) {
  try {
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    const existing = await db.update.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Update not found' }, { status: 404 });
    }

    await db.update.delete({ where: { id } });

    revalidatePath('/updates');
    revalidatePath(`/updates/${existing.slug}`);
    revalidatePath('/');

    return NextResponse.json({ success: true, message: 'Update deleted' });
  } catch (error) {
    console.error('Delete update error:', error);
    return NextResponse.json(
      { error: 'Failed to delete update' },
      { status: 500 }
    );
  }
}
