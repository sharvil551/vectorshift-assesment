import { toast } from "sonner";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { PipelineResult } from "./PipelineResult";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes, shallow);
  const edges = useStore((state) => state.edges, shallow);

  const handleSubmit = async () => {
    try {
      const payload = {
        nodes,
        edges,
      };
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(<PipelineResult data={data} />, {
          className: "max-w-[250px]",
          position: "top-right",
        });
      } else {
        toast.error(data.detail, {
          position: "top-right",
        });
        return;
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast.error("Could not connect to the server", { position: "top-right" });
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <button
        type="button"
        onClick={handleSubmit}
        className="focus:outline-none text-white bg-[#6466f1] hover:bg-[#4e50e8] active:scale-95 hover:shadow-lg transition-all duration-200 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
      >
        Submit
      </button>
    </div>
  );
};
