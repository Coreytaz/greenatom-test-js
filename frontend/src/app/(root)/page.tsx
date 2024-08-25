import { CardPhoto } from "@/entities/CardPhoto";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Фото альбом",
};

export default async function Home() {
  const { data: albums } = await fetch("http://localhost:8055/items/albums", {
    cache: "no-cache",
  }).then((res) => res.json());
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
