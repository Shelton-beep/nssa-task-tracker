"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import prisma from "@/lib/prisma-db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { title, boardId } = data;
  let list;

  try {
    const board = await prisma.board.findUnique({
      where: { id: boardId, orgId },
    });

    if (!board) {
      return { error: "Board Not Found" };
    }

    const lastList = await prisma.list.findFirst({
      where: { boardId: boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await prisma.list.create({
      data: { title, boardId, order: newOrder },
    });
  } catch (error) {
    return { error: "Failed to create" };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
