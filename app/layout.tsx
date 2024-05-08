import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import './globals.css'
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from '@/providers/theme-provider'
import { ModalProvider } from '@/providers/modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EduInsight',
  description: 'Developed by Julius Biascan',
  authors: [
    {
      name: "Julius Biascan",
      url: "https://juliusbiascan.vercel.app",
    },
  ],
  creator: "juliusbiascan",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Toaster />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}