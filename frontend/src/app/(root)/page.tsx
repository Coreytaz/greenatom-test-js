"use client";

import { useState, useEffect } from "react";
import { CardPhoto } from "@/entities/CardPhoto";
import Link from "next/link";
import { http } from "@/shared/api";
import { Loading } from "@/shared/ui";

function useFetchAlbums(url: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setData(null);
    setError(null);
    http
      .get(url)
      .then(async (respData) => {
        if (!cancelled) {
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
  }, [url]);

  return [data, isLoading, error];
}

export default function Home() {
  const [albums, isLoading, error] = useFetchAlbums(
    "http://localhost:8055/items/albums"
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

  if (!albums) return null;

  return (
    <main className="max-w-[1200px] w-full flex-grow">
      <div className="grid auto-fill-[320px] gap-5 px-5 py-2">
        {albums.map((album) => {
          return (
            <Link
              key={album.id}
              style={{ display: "contents" }}
              href={`/album/${album.id}`}
            >
              <CardPhoto
                img={album.preview}
                title={album.title}
                count={album.photos.length}
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
