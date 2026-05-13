import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import site from '../content/site'

type Props = { children: ReactNode; title?: string }

export default function Layout({ children, title }: Props) {
  const { pathname } = useRouter()
  const pageTitle = title ? `${title} | ${site.title}` : site.title

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={site.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page-shell">
        {/* Brand bar */}
        <div className="brand-bar">
          <div className="brand-bar-inner">
            <span className="brand-bar-text">Imperial College London</span>
            <span className="brand-bar-sub">National Heart &amp; Lung Institute</span>
          </div>
        </div>

        {/* Sticky nav */}
        <header className="site-header">
          <Link href="/" className="brand-lockup">
            <span className="brand-owner">Bohee Lee</span>
            <span className="brand-sep">/</span>
            <span className="brand-repo">cv</span>
          </Link>
          <nav className="site-nav">
            <Link href="/" className={`nav-tab${pathname === '/' ? ' is-active' : ''}`}>
              Overview
            </Link>
            <Link href="/cv" className={`nav-tab${pathname === '/cv' ? ' is-active' : ''}`}>
              Full CV
            </Link>
          </nav>
        </header>

        {children}

        {/* Footer */}
        <footer className="site-footer">
          <div className="site-footer-inner">
            <span className="footer-name">{site.title}</span>
            <span className="footer-meta">
              Postdoctoral Researcher · Imperial College London
            </span>
          </div>
        </footer>
      </div>
    </>
  )
}
