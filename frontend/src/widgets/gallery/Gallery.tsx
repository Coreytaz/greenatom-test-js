"use client"

import { CardPhoto } from '@/entities/CardPhoto'
import { useParams, useRouter } from 'next/navigation'
import React, { FC, useEffect } from 'react'
import { useModalPhoto } from '../ModalPhoto'
import { observer } from 'mobx-react-lite'

const albums = [
    {
        id: 1123123123123,
        file: 'https://avatars.mds.yandex.net/i?id=9045280b715298fb7b72fa6d88fe92c6_l-4519035-images-thumbs&n=13'
    },
    {
        id: 2123231,
        file: 'https://s1.1zoom.ru/big3/26/357022-svetik.jpg'
    },
    {
        id: 341241,
        file: 'https://wallbox.ru/resize/2560x1440/wallpapers/main/201428/4b0f817828c497c.jpg'
    },
    {
        id: 4444444444,
        file: 'https://i.pinimg.com/736x/6f/82/b4/6f82b495223d134834f282ea809846d7.jpg'
    }
]

export const Gallery: FC = observer(() => {
    const params = useParams<{ id: string[] }>()
    const page = '/album/'
    const router = useRouter()
    const [album, photoId] = params.id
    const { onOpen, setAlbums, setCurrentPhoto } = useModalPhoto()

    useEffect(() => {
        setAlbums(albums)
        if (photoId) {
            const _photoId = +photoId
            const index = albums.findIndex((album) => album.id === _photoId)
            if (index !== -1) {
                setCurrentPhoto(_photoId, index)
                onOpen()
            } else {
                router.replace(`${page}${album}`)
            }

        }
    }, [])

    return (
        <main className="max-w-[1200px] w-full flex-grow">
            <div className="grid auto-fill-[320px] gap-5 px-5 py-2">
                {albums.map((albums) => {
                    return (
                        <CardPhoto
                            key={albums.id}
                            img={albums.file}
                            onClick={() => {
                                router.push(`${page}${album}/${albums.id}`, { scroll: false })
                            }
                            }
                            hiddenContent
                        />
                    )
                })}
            </div>
        </main>
    )
})
