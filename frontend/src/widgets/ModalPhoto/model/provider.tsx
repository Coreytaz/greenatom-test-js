"use client"

import type { ReactNode } from "react";
import { ModalPhotoStoreContext } from "./context";
import { ModalPhotoStore } from "./store";

type Props = {
    children?: ReactNode;
};

export const ModalPhotoProvider = (props: Props) => {
    const store = new ModalPhotoStore()
    return (
        <ModalPhotoStoreContext.Provider value={store}>
            {props.children}
        </ModalPhotoStoreContext.Provider>
    );
};