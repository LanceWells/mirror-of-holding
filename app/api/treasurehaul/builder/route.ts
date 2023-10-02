import { TreasureHaulItem } from '@/lib/treasurehaul/treasure-haul-payload';
import prisma from '../../../../lib/prisma'

export async function POST(request: Request) {
  const {
    roomName,
    haul,
  } = await request.json() as {
    roomName: string,
    haul: TreasureHaulItem[],
  };

  const thisRoom: {
    roomName: string,
    haul: TreasureHaulItem[],
  } = {
    roomName: "",
    haul: [],
  }

  if (!roomName) {
    return new Response(
      'Invaild room name', {
        status: 400,
      }
    )
  }

  if (!haul) {
    return new Response(
      'Invalid haul type', {
        status: 400,
      }
    )
  }

  const validItems = haul.filter((item) => (
    item.itemName &&
    item.src &&
    item.type
  ));

  thisRoom.haul = validItems;

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
