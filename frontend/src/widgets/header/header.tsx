import { ToggleTheme } from '@/features/ToggleTheme'
import Link from 'next/link'
import { FC } from 'react'

interface HeaderProps {

}

export const Header: FC<HeaderProps> = (props) => {
    return (
        <header className='flex justify-between max-w-[1200px] w-full items-center px-5 py-2 border-b' {...props}>
            <Link href="/" className="text-2xl font-semibold hover:text-blue-500 transition-colors">Фото альбом</Link>
            <ToggleTheme />
        </header>
    )
}
