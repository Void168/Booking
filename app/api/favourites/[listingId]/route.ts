import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function POST(
  request: Request,
  { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('ID không hợp lệ')
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])];

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favouriteIds
        }
    })

    return NextResponse.json(user)
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
