"use client"

import { ModalPhoto, ModalPhotoProvider } from "@/widgets/ModalPhoto";
import { Gallery } from "@/widgets/gallery";

export default function AlbumPage() {


    return (
        <ModalPhotoProvider>
            <Gallery />
            <ModalPhoto />
        </ModalPhotoProvider>
    );
}