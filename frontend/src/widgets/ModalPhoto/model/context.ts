"use client";

import { createContext } from "react";

import { ModalPhotoStore } from "./store";

export const ModalPhotoStoreContext = createContext<null | ModalPhotoStore>(
  null
);
