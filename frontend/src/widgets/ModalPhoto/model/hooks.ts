"use client";

import { useContext } from "react";

import { ModalPhotoStoreContext } from "./context";

export const useModalPhoto = () => {
  const store = useContext(ModalPhotoStoreContext);
  if (!store) {
    throw new Error(
      "Can not `useModalPhoto` outside of the `ModalPhotoStoreContext`"
    );
  }

  return store;
};
