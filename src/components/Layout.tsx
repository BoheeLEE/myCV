import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
import site from '../content/site'

type Props = {
  children: ReactNode
  title?: string
}

export default function Layout({ children, title }: Props) {
  const pageTitle = title ? `${title} | ${site.title}` : site.title

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={site.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <header className="bg-navy text-white shadow-md">
          <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight hover:text-blue-200 transition-colors">
              {site.title}
            </Link>
            <div className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-blue-200 transition-colors">Home</Link>
              <Link href="/cv" className="hover:text-blue-200 transition-colors">CV</Link>
            </div>
          </nav>
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
          {children}
        </main>

        <footer className="bg-gray-50 border-t text-center text-sm text-gray-500 py-6">
          <p>{site.title} &mdash; {site.description}</p>
        </footer>
      </div>
    </>
  )
}
