import prismadb from '@/lib/prismadb'
import { UserRoles } from '@/types/enums'
import { validateFields } from '@/utils/validateUtils'
import { clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 })
    }
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: {
          select: {
            url: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
        category: true,
        color: true,
        bodyType: true,
        make: true,
        model: true,
        region: true,
        city: true,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const body = await req.json()

    const {
      ownerId,
      name,
      images,
      price,
      categoryId,
      bodyTypeId,
      makeId,
      modelId,
      colorId,
      isArchived,
      isFeatured,
      mileage,
      year,
      fuel,
      gearbox,
      typeOfDrive,
      description,
      phone,
      regionId,
      cityId,
      engineSize,
      vinCode,
      headlights,
      spareTire,
      interiorMatherial,
      isCrashed,
      airConditioner,
      androidAuto,
      heatedSteeringWheel,
      electricWindows,
      electricSideMirrors,
      electricSeatAdjustment,
      isofix,
      navigationSystem,
      seatVentilation,
      seatHeating,
      soundSystem,
      sportSeats,
    } = body

    const requiredFields = [
      { value: params.storeId, fieldName: 'Store ID' },
      { value: name, fieldName: 'Name' },
      { value: price, fieldName: 'Price' },
      { value: categoryId, fieldName: 'Category id' },
      { value: bodyTypeId, fieldName: 'Body Type id' },
      { value: makeId, fieldName: 'Make id' },
      { value: modelId, fieldName: 'Model id' },
      { value: colorId, fieldName: 'Color id' },
      { value: mileage, fieldName: 'Mileage' },
      { value: year, fieldName: 'Year' },
      { value: fuel, fieldName: 'Fuel' },
      { value: gearbox, fieldName: 'Gearbox' },
      { value: typeOfDrive, fieldName: 'Type Of Drive' },
      { value: description, fieldName: 'Description' },
      { value: phone, fieldName: 'Phone' },
      { value: images, fieldName: 'Images' },
      { value: regionId, fieldName: 'Region' },
      { value: cityId, fieldName: 'City' },
      { value: ownerId, fieldName: 'Owner id' },
    ]

    validateFields(requiredFields)

    const user = await clerkClient.users.getUser(ownerId)

    if (!user.id) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (
      user.id !== ownerId &&
      user.privateMetadata.userRole !== UserRoles.ADMIN
    ) {
      return new NextResponse('Forbidden. Administrator rights are required.', {
        status: 403,
      })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId: user.id },
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }
    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        bodyTypeId,
        makeId,
        modelId,
        colorId,
        isArchived,
        isFeatured,
        mileage,
        year,
        fuel,
        gearbox,
        typeOfDrive,
        description,
        phone,
        regionId,
        cityId,
        engineSize,
        vinCode,
        headlights,
        spareTire,
        interiorMatherial,
        isCrashed,
        airConditioner,
        androidAuto,
        heatedSteeringWheel,
        electricWindows,
        electricSideMirrors,
        electricSeatAdjustment,
        isofix,
        navigationSystem,
        seatVentilation,
        seatHeating,
        soundSystem,
        sportSeats,
        images: {
          deleteMany: {},
        },
      },
    })
    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }, idx: number) => ({
                url: image.url,
                position: idx,
              })),
            ],
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const body = await req.json()
    const user = await clerkClient.users.getUser(body.ownerId)

    if (!user.id) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (
      user.id !== body.ownerId &&
      user.privateMetadata.userRole !== UserRoles.ADMIN
    ) {
      return new NextResponse('Forbidden. Administrator rights are required.', {
        status: 403,
      })
    }

    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 })
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
    })

    await prismadb.product.delete({
      where: { id: params.productId },
    })

    return NextResponse.json(product)
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
}
