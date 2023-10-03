import { TreasureHaulPayload } from '@/lib/treasurehaul/treasure-haul-payload';
import prisma from '../../../../lib/prisma'

export async function POST(request: Request) {
  const {
    roomName,
    haul,
    previewImageSrc,
  } = await request.json() as TreasureHaulPayload;

  const thisRoom: TreasureHaulPayload = {
    haul: {},
    roomName: "",
    previewImageSrc: "",
  }

  if (!haul) {
    return new Response(
      'Invalid haul type', {
        status: 400,
      }
    )
  } else {
    const validItems = Object.entries(haul).filter(([key, item]) => (
      item.itemName &&
      item.src &&
      item.type
    ));
  
    thisRoom.haul = Object.fromEntries(validItems);
  }

  if (!roomName) {
    return new Response(
      'Invaild room name', {
        status: 400,
      }
    )
  } else {
    thisRoom.roomName = roomName;
  }

  if (previewImageSrc) {
    thisRoom.previewImageSrc = previewImageSrc;
  }

  const createdHaul = await prisma.treasureHaul.create({
    data: {
      item: thisRoom,
    }
  });

  return new Response(
    `Created room ${createdHaul.id}!`, {
      status: 200,
    }
  )
}
