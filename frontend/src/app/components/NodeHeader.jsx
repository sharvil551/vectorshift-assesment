import { RxCrossCircled } from "react-icons/rx";
import { useReactFlow } from "reactflow";

const NodeHeader = ({ id, icon: Icon, title, description, className = "" ,actions,}) => {
  const { deleteElements } = useReactFlow();
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };
  return (
    <div className="p-2">
      <div
        className={`border border-node-border rounded-md bg-node-header-bg ${className}`}
      >
        <div className="flex items-start justify-between p-1">
          <div>
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
              {Icon && <Icon className="w-4 h-4 fill-primary" />}
              <span className="text-primary">{title}</span>
            </div>
            {description && (
              <p className="text-[11px] text-gray-500">{description}</p>
            )}
          </div>
          <div className="flex gap-1 items-center">
              {actions}
            <RxCrossCircled
              onClick={handleDelete}
              className="text-gray-500 w-6 h-6 hover:text-red-500 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;
