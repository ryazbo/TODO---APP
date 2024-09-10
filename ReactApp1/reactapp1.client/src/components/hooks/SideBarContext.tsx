import { createContext, ReactNode, Dispatch, useReducer, useMemo } from "react";

interface SideBarPatcher {
    type: "SET_SIDE_BAR_ITEMS";
    payload: ItemProps[];
}

interface ItemProps {
    title: string;
    navigate: string;
    icon: ReactNode;
    isActive?: boolean
}

type Action = SideBarPatcher;

interface FilterPaginationState {
    item?:ItemProps[]
}

const initialState: FilterPaginationState = {
    item: undefined
};

const filterPaginationReducer = (state: FilterPaginationState, action: Action): FilterPaginationState => {
    switch (action.type) {
        case "SET_SIDE_BAR_ITEMS":
            return { ...state, item: action.payload };
        default:
            throw new Error(`Unhandled action type`);
    }
};

const SideBarContext = createContext<{ state: FilterPaginationState; dispatch: Dispatch<Action> } | undefined>(undefined);

function SideBarProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(filterPaginationReducer, initialState);

    const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <SideBarContext.Provider value={contextValue}>
            {children}
        </SideBarContext.Provider>
    );
}

export { SideBarContext, SideBarProvider };
