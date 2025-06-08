// import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Handle, Position, useReactFlow } from "reactflow";
import { MdOutlineOutput } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { SiGoogleanalytics } from "react-icons/si";
import { COMPONENT_TYPES } from "@/helpers/enums";

export function AnalyticsNode({ id }) {
  const { deleteElements } = useReactFlow();

  const handleDeleteNode = () => {
    deleteElements({ nodes: [{ id }] });
  };
  const styles = {
    background: "#fff",
    width: "12px",
    height: "12px",
    border: "1px solid #4e50e8",
  };

  return (
    <div className="bg-white border border-[#d6d6ff] border-2 rounded-sm w-[350px] shadow-sm  text-xs font-medium text-gray-700">
      <div className="p-2">
        <div className="border border-[#d6d6ff] rounded-md bg-[#f4f4ff]">
          <div className="flex items-start justify-between p-1">
            <div>
              <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                <SiGoogleanalytics className="w-4 h-4" fill="#635bc8" />
                <span className="text-[#635bc8]">{COMPONENT_TYPES.ANALYTICS.label}</span>
              </div>
              <p className="text-[11px] text-gray-500 pt-1">
               Displays token consumption statistics from the LLM response.
              </p>
            </div>
            <RxCrossCircled
              onClick={handleDeleteNode}
              className="text-gray-500 w-6 h-6 hover:text-red-500 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>
       <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        style={styles}
      />

      <div className="p-3 pt-2">
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
         <Card className="@container/card bg-[#f4f4ff] shadow-xs border-[#d6d6ff] ">
            <CardHeader>
              <CardDescription>Tokens Used</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                4,212
              </CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  <BsGraphUpArrow className="mr-1" />
                  +8.3%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start text-sm">
              <div className="flex items-center gap-2 font-medium text-green-700">
                Increase in token usage this week
                <BsGraphUpArrow className="size-4" />
              </div>
              <div className="text-muted-foreground text-xs">
                LLM consumption trend
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

       <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        style={styles}
      />
    </div>
  );
}
