import { toast } from "sonner";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { PipelineResult } from "./PipelineResult";
import { ENV_BASE_URL } from "@/environment/environment";
import { useState } from "react";
import { HTTP_METHODS, TOAST_POSITION, TOAST_TYPE } from "@/helpers/enums";
import { Button } from "@/components/ui/button";
import { FaProjectDiagram, FaSpinner } from "react-icons/fa";

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const { nodes, edges } = useStore((state) => state, shallow);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        nodes: nodes.map((node) => ({
          id: node.id,
          position: node.position,
          type: node.type,
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
        })),
      };
      const response = await fetch(`${ENV_BASE_URL}/pipelines/parse`, {
        method: HTTP_METHODS.POST,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        toast[TOAST_TYPE.SUCCESS](<PipelineResult data={data} />, {
          className: "max-w-[250px]",
          position: TOAST_POSITION.TOP_RIGHT,
        });
      } else {
        toast[TOAST_TYPE.ERROR](data.detail, {
          position: TOAST_POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast.error("Could not connect to the server", {
        position: TOAST_POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <Button
        variant="outline"
        type="button"
        onClick={handleSubmit}
        className="focus:outline-none text-white bg-primary hover:bg-primary-hover active:scale-95 hover:shadow-lg transition-all duration-200 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer w-30"
        disabled={loading}
      >
        {loading ? (
          <>
            <span>Submitting</span>
            <FaSpinner className="animate-spin" />
          </>
        ) : (
          <>
            <span>Submit</span>
            <FaProjectDiagram className="ml-1" />
          </>
        )}
      </Button>
    </div>
  );
};
