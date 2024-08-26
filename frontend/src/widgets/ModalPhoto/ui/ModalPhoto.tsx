"use client";

import { useEffect } from "react";
import { cn } from "@/shared/lib";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  Image,
} from "@/shared/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { useModalPhoto } from "..";
import { observer } from "mobx-react-lite";
import { useParams, useRouter } from "next/navigation";

interface ModalPhotoProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalPhoto: FC<ModalPhotoProps> = observer(
  ({ className, ...props }) => {
    const pageSlug = "/album/";
    const params = useParams<{ id: string[] }>();
    const [albumId, page] = params.id;
    const router = useRouter();
    const {
      isOpen,
      onToggle,
      currentPhotoInfo,
      maxLengthAlbums,
      index,
      albums,
      nextPhoto,
      prevPhoto,
      setCurrentPhoto,
    } = useModalPhoto();

    const pushRouterIndex = (index) => {
      if (index === -1) {
        index = albums.length - 1;
      }
      if (index === albums.length) {
        index = 0;
      }
      const album = albums.at(index);
      window.history.pushState(null, "", `${pageSlug}${albumId}/${page}/${album.id}`);
    };

    useEffect(() => {
      const handlePopstate = () => {
        router.refresh();
      };

      window.addEventListener("popstate", handlePopstate);

      return () => {
        window.removeEventListener("popstate", handlePopstate);
      };
    }, []);

    if (!currentPhotoInfo) return null;

    return (
      <Dialog
        open={isOpen}
        onOpenChange={(value) => {
          if (!value) {
            window.history.pushState(null, "", `${pageSlug}${albumId}/${page}`);
          }
          onToggle(value);
        }}
        {...props}
      >
        <DialogContent className={cn("w-[97%] max-w-[1060px]", className)}>
          <DialogTitle className="sr-only">
            {currentPhotoInfo.title}
          </DialogTitle>
          <div className="flex justify-center">
            <Image
              className="max-h-[calc(100svh-150px)] w-auto object-cover rounded-lg pointer-events-none"
              quality={100}
              alt={currentPhotoInfo.title}
              src={currentPhotoInfo.id}
            />
          </div>
          <div className="flex justify-end gap-2">
            <div className="flex font-semibold text-blue-500">
              <span>{index + 1}</span>&nbsp;/&nbsp;
              <span>{maxLengthAlbums + 1}</span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  pushRouterIndex(index - 1);
                  prevPhoto();
                }}
                variant="clear"
                className="p-0 h-auto hover:opacity-70"
              >
                <ChevronLeft />
              </Button>
              <Button
                onClick={() => {
                  pushRouterIndex(index + 1);
                  nextPhoto();
                }}
                variant="clear"
                className="p-0 h-auto hover:opacity-70"
              >
                <ChevronRight />
              </Button>
            </div>
            <DialogClose />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);
