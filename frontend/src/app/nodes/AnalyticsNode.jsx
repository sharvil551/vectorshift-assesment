import { BsGraphUpArrow } from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  COMPONENT_TYPES,
  HANDLE_POSITIONS,
  HANDLE_TYPE,
} from "@/helpers/enums";
import NodeHeader from "../components/NodeHeader";
import { NodeHandle } from "../components/NodeHandle";

export function AnalyticsNode({ id }) {
  return (
    <div className="bg-white border border-node-border border-2 rounded-sm w-[350px] shadow-sm  text-xs font-medium text-gray-700">
      <NodeHeader
        id={id}
        icon={COMPONENT_TYPES.ANALYTICS.icon}
        title={COMPONENT_TYPES.ANALYTICS.label}
        description={COMPONENT_TYPES.ANALYTICS.description}
      />

      <div className="p-3 pt-2">
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          <Card className="@container/card bg-node-header-bg shadow-xs border-node-border ">
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

      <NodeHandle
        handles={[
          {
            id: `${id}-target`,
            type: HANDLE_TYPE.TARGET,
            position: HANDLE_POSITIONS.LEFT,
          },
          {
            id: `${id}-source`,
            type: HANDLE_TYPE.SOURCE,
            position: HANDLE_POSITIONS.RIGHT,
          },
        ]}
      />
    </div>
  );
}
