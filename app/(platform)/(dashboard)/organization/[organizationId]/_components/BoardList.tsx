import { Hint } from "@/components/Hint";
import { FormPopOver } from "@/components/form/form-popover";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs/server";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  try {
    const boards = await prisma.board.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
    });

    return (
      <div className="space-y-4">
        <div className="flex items-center font-semibold text-lg text-neutral-700">
          <User2 className="h-6 w-6 mr-2" />
          Your boards
        </div>

        <div className="grid gridcols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {boards.map((board) => (
            <Link
              href={`/board/${board.id}`}
              key={board.id}
              style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
              className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition">
                <p className="relative font-semibold text-white p-2">
                  {board.title}
                </p>
              </div>
            </Link>
          ))}
          <FormPopOver side={"right"} sideOffset={10}>
            <div
              role="button"
              className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
            >
              <p className="text-sm">Create new board</p>
              <span className="text-xs">5 remaining</span>
              <Hint
                sideOffset={40}
                description={`Free Workspaces can have upto 5 open boards.For unlimited boards, upgrade workspace.`}
              >
                <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
              </Hint>
            </div>
          </FormPopOver>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching boards:", error);
    // Handle the error gracefully, e.g., display an error message to the user
    return <div>Error fetching boards. Please try again later.</div>;
  }
};

export default BoardList;

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
