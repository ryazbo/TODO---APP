import { useContext } from "react";
import { SideBarContext } from "../hooks/SideBarContext";

const useSideBar = () => {
    const context = useContext(SideBarContext);
    if (!context) {
        throw new Error("useServicio must be used within an ServicioProvider");
    }
    return context;
};

export { useSideBar };