"use client";

import { CardPhoto } from "@/entities/CardPhoto";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import { useModalPhoto } from "../ModalPhoto";
import { observer } from "mobx-react-lite";

interface GalleryProps {
  albums: any[];
}

export const Gallery: FC<GalleryProps> = observer(({ albums }) => {
  const params = useParams<{ id: string[] }>();
  const page = "/album/";
  const router = useRouter();
  const [albumId, photoId] = params.id;
  const { onOpen, setAlbums, setCurrentPhoto } = useModalPhoto();

  useEffect(() => {
    setAlbums(albums);
    if (photoId) {
      const _photoId = String(photoId);
      const index = albums.findIndex((album) => String(album.id) === _photoId);
      if (index !== -1) {
        setCurrentPhoto(_photoId, index);
        onOpen();
      } else {
        window.history.replaceState(null, "", `${page}${albumId}`);
      }
    }
  }, []);

  if (!albums) return null;

  return (
    <main className="max-w-[1200px] w-full flex-grow">
      <div className="grid auto-fill-[320px] gap-5 px-5 py-2">
        {albums.map((album, index) => {
          return (
            <CardPhoto
              key={album.id}
              img={album.id}
              onClick={() => {
                window.history.pushState(
                  null,
                  "",
                  `${page}${albumId}/${album.id}`
                );
                setCurrentPhoto(album.id, index);
                onOpen();
              }}
              hiddenContent
            />
          );
        })}
      </div>
    </main>
  );
});
