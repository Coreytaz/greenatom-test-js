"use client";

import { useState, useEffect } from "react";
import { ModalPhoto, ModalPhotoProvider } from "@/widgets/ModalPhoto";
import { Gallery } from "@/widgets/gallery";
import { http } from "@/shared/api";
import { Loading } from "@/shared/ui";

function useFetchAlbum(url1: string, url2: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setData(null);
    setError(null);
    http
      .get(url1)
      .then(async (respData) => {
        if (!cancelled) {
          const {
            data: { data },
          } = await http.get(url2);
          respData.data.data.photos = data;
          setData(respData.data.data);
          return respData;
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url1, url2]);

  return [data, isLoading, error];
}

export default function AlbumPage({ params }: { params: { id: string[] } }) {
  const [data, isLoading, error] = useFetchAlbum(
    `http://localhost:8055/items/albums/${params.id.at(0)}`,
    `http://localhost:8055/files?limit=25&fields[]=id&fields[]=title&sort[]=-uploaded_on&filter[_and][0][_and][0][$FOLLOW(albums_files,directus_files_id)][albums_id][_eq]=${params.id.at(
      0
    )}&filter[_and][1][_and][0][type][_nnull]=true&filter[_and][1][_and][1][folder][_eq]=39a3c5ae-1c9a-4c6d-881a-1819b5404e3c`
  );

  if (isLoading) {
    return (
      <div className="flex items-center flex-grow">
        <Loading className="w-14 h-14" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center flex-grow">
        <h1>Произошла ошибка :(</h1>
      </div>
    );
  }

  if (!data) return null;

  return (
    <ModalPhotoProvider>
      <h2 className="text-xl font-semibold">{data.title}</h2>
      <Gallery albums={data.photos} />
      <ModalPhoto />
    </ModalPhotoProvider>
  );
}
