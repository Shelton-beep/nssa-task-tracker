import { UpdateBoard } from "./schema";
("use server");

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import prisma from "@/lib/prisma-db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { title, id } = data;
  let board;

  try {
    board = await prisma.board.update({
      where: { id, orgId },
      data: { title },
    });
  } catch (error) {
    return { error: "Failed to update" };
  }

  revalidatePath(`/board/${id}`);

  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
