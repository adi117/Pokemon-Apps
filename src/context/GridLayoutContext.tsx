import { createContext} from "react";

type LayoutType = "grid" | "list";

interface LayoutContextType {
    layout : LayoutType;
    toggleLayout: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined > (undefined);

export default LayoutContext;