"use client";

import { createContext } from "react";

import { PaginationStore } from "./store";

export const PaginationStoreContext = createContext<null | PaginationStore>(
  null
);
