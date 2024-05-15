import { Hint } from "@/components/Hint";
import { FormPopOver } from "@/components/form/form-popover";
import { HelpCircle, User2 } from "lucide-react";

const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <FormPopOver align={"center"} side={"right"} sideOffset={-100}>
        <div className="grid gridcols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
        </div>
      </FormPopOver>
    </div>
  );
};

export default BoardList;
