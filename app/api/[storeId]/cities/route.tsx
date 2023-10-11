import prismadb from '@/lib/prismadb';
import { UserRoles } from '@/types/enums';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId, sessionClaims } = auth();
    const body = await req.json();

    const { name, regionId } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (sessionClaims.role !== UserRoles.ADMIN) {
      return new NextResponse('Forbidden. Administrator rights are required.', {
        status: 403,
      });
    }

    if (!name) {
      return new NextResponse('City name is required', { status: 400 });
    }
    if (!regionId) {
      return new NextResponse('Region id is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const city = await prismadb.city.create({
      data: {
        name,
        regionId,
      },
    });

    return NextResponse.json(city);
  } catch (error) {
    console.log('[CITY_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const cities = await prismadb.city.findMany();

    return NextResponse.json(cities);
  } catch (error) {
    console.log('[CITIES_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
