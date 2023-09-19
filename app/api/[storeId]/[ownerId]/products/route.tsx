import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; ownerId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const bodyTypeId = searchParams.get('bodyTypeId') || undefined;
    const makeId = searchParams.get('makeId') || undefined;
    const modelId = searchParams.get('modelId') || undefined;
    const regionId = searchParams.get('regionId') || undefined;
    const cityId = searchParams.get('cityId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        ownerId: params.ownerId,
        storeId: params.storeId,
        categoryId,
        colorId,
        bodyTypeId,
        makeId,
        modelId,
        regionId,
        cityId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        bodyType: true,
        make: true,
        model: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[OWNER_PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
