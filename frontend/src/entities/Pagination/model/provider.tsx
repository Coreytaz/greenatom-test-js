"use client"

import type { ReactNode } from "react";
import { PaginationStoreContext } from "./context";
import { PaginationStore } from "./store";
import { useParams } from "next/navigation";

type Props = {
    children?: ReactNode;
};

export const PaginationProvider = (props: Props) => {
    const params = useParams<{ id: string[] }>();
    const page = params.id.at(1)
    const store = new PaginationStore(page)
    return (
        <PaginationStoreContext.Provider value={store}>
            {props.children}
        </PaginationStoreContext.Provider>
    );
};