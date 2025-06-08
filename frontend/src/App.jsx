import { SubmitButton } from "./app/components/SubmitButton";
import { PipelineToolbar } from "./app/components/PipelineToolbar";
import { PipelineUI } from "./app/components/PipelineUI";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Toaster />
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </>
  );
}

export default App;
