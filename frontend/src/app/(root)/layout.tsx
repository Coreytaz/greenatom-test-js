import { Header } from '@/widgets/header';

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen flex flex-col items-center gap-5">
            <Header />
            {children}
        </main>
    );
}