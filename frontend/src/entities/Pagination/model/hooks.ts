"use client";

import { useContext } from "react";

import { PaginationStoreContext } from "./context";

export const usePagination = () => {
  const store = useContext(PaginationStoreContext);
  if (!store) {
    throw new Error(
      "Can not `usePagination` outside of the `PaginationStoreContext`"
    );
  }

  return store;
};
