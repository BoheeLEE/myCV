import Image from 'next/image'
import Layout from '../components/Layout'
import cv from '../content/cvGenerated'
import site from '../content/site'

function extractYear(citation: string): string {
  const m = citation.match(/\b(20\d{2})\b/)
  return m ? m[1] : ''
}

function isEditorial(citation: string): boolean {
  return /^\(editorial\)/i.test(citation.trim())
}

export default function Home() {
  const selectedPubs = cv.publications.slice(0, 7)
  const wip = cv.manuscriptsUnderReview

  const eduParsed = cv.education.map((e) => {
    const parts = e.degree.split(',')
    return {
      title: parts[0]?.trim() ?? e.degree,
      institution: parts.slice(1).join(',').trim(),
    }
  })

  return (
    <Layout>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Academic Profile</p>
          <h1 className="hero-name">{cv.name}</h1>
          <p className="hero-credentials">{cv.credentials}</p>
          <p className="hero-role">
            <strong style={{ color: 'var(--ink)' }}>{cv.currentPosition.title}</strong>
            {cv.currentPosition.institution && (
              <> &mdash; {cv.currentPosition.institution}</>
            )}
            {cv.currentPosition.period && (
              <><br /><span style={{ fontSize: '0.88rem' }}>{cv.currentPosition.period}</span></>
            )}
          </p>

          {cv.summary && (
            <p style={{ marginTop: '1.2rem', color: 'var(--muted)', lineHeight: 1.75, fontSize: '0.96rem', maxWidth: '52rem' }}>
              {cv.summary}
            </p>
          )}

          <div className="hero-actions">
            <a href={site.cvUrl} download={site.cvDownloadName} className="btn btn-primary">
              Download CV
            </a>
            <a href={site.cvUrl} target="_blank" rel="noopener noreferrer" className="btn">
              View PDF
            </a>
            {cv.contact.scholar && (
              <a href={cv.contact.scholar} target="_blank" rel="noopener noreferrer" className="btn">
                Google Scholar
              </a>
            )}
          </div>

          <ul className="hero-stats">
            <li className="stat-tile">
              <span className="stat-value">31</span>
              <span className="stat-label">Publications</span>
            </li>
            <li className="stat-tile">
              <span className="stat-value">17</span>
              <span className="stat-label">First Author</span>
            </li>
            <li className="stat-tile">
              <span className="stat-value">{cv.contact.hindex ?? '13'}</span>
              <span className="stat-label">H-index</span>
            </li>
            <li className="stat-tile">
              <span className="stat-value">4</span>
              <span className="stat-label">Grants Won</span>
            </li>
          </ul>
        </div>

        {/* Right panel: contact */}
        <div className="hero-panel">
          {/* Portrait */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <div style={{
              width: 220,
              height: 220,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid rgba(255,255,255,0.35)',
              boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
              flexShrink: 0,
            }}>
              <Image
                src="/myCV/portrait.jpg"
                alt="Bohee Lee"
                width={220}
                height={220}
                style={{ objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                priority
              />
            </div>
          </div>

          <p className="panel-kicker" style={{ textAlign: 'center' }}>Contact &amp; Links</p>
          <p className="panel-title" style={{ textAlign: 'center', fontSize: '1.15rem' }}>{cv.currentPosition.institution}</p>
          <ul className="contact-list">
            {cv.contact.email && (
              <li>
                <span className="contact-label">Email</span>
                <a href={`mailto:${cv.contact.email}`} className="contact-value">
                  {cv.contact.email}
                </a>
              </li>
            )}
            {cv.contact.website && (
              <li>
                <span className="contact-label">Imperial Profile</span>
                <a href={cv.contact.website} target="_blank" rel="noopener noreferrer" className="contact-value">
                  imperial.ac.uk/people/bohee.lee
                </a>
              </li>
            )}
            {cv.contact.scholar && (
              <li>
                <span className="contact-label">Google Scholar</span>
                <a href={cv.contact.scholar} target="_blank" rel="noopener noreferrer" className="contact-value">
                  View publications
                </a>
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* ── Main 2-col ─────────────────────────────────────────────── */}
      <div className="main-grid">

        {/* ── Sidebar ──────────────────────────────────────────────── */}
        <aside className="profile-rail">

          {/* Research methods */}
          {cv.skills.length > 0 && (
            <div className="card">
              <span className="section-label">Methods &amp; Skills</span>
              <div className="chip-row">
                {cv.skills.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          <div className="card">
            <span className="section-label">Education</span>
            <ul className="timeline-list">
              {eduParsed.map((e, i) => (
                <li key={i}>
                  <span className="timeline-title">{e.title}</span>
                  <span className="timeline-detail">{e.institution}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Funding highlights */}
          {cv.fundingAwards.length > 0 && (
            <div className="card">
              <span className="section-label">Selected Grants</span>
              <ul className="timeline-list">
                {cv.fundingAwards.slice(0, 4).map((f, i) => (
                  <li key={i}>
                    <span className="timeline-detail">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* ── Main content ──────────────────────────────────────────── */}
        <main style={{ display: 'grid', gap: '1.4rem' }}>

          {/* Selected Publications */}
          {selectedPubs.length > 0 && (
            <section className="content-section">
              <h2>Selected Publications</h2>
              <p className="section-note">
                {cv.publications.length} peer-reviewed articles · 17 as first author.
                {cv.contact.scholar && (
                  <> <a href={cv.contact.scholar} target="_blank" rel="noopener noreferrer" className="link-chip" style={{ display: 'inline-flex', marginLeft: '0.4rem' }}>
                    Full list on Scholar
                  </a></>
                )}
              </p>
              <ul className="pub-list">
                {selectedPubs.map((pub, i) => {
                  const year = extractYear(pub)
                  const editorial = isEditorial(pub)
                  const text = pub.replace(/^\(editorial\)\s*/i, '')
                  return (
                    <li key={i} className="pub-item">
                      <div className="pub-meta">
                        {year && <span className="pub-year">{year}</span>}
                        {editorial && <span className="pub-type">Editorial</span>}
                      </div>
                      <p className="pub-citation">{text}</p>
                    </li>
                  )
                })}
              </ul>
              {cv.publications.length > 7 && (
                <div className="link-row" style={{ marginTop: '1rem' }}>
                  <a href={cv.contact.scholar ?? '#'} target="_blank" rel="noopener noreferrer" className="link-chip">
                    +{cv.publications.length - 7} more on Google Scholar
                  </a>
                </div>
              )}
            </section>
          )}

          {/* Work in Progress */}
          {wip.length > 0 && (
            <section className="content-section">
              <h2>Work in Progress</h2>
              <p className="section-note">Manuscripts currently under review.</p>
              <ul className="pub-list">
                {wip.map((ms, i) => (
                  <li key={i} className="pub-item wip-item">
                    <div className="pub-meta">
                      <span className="pub-type">Under Review</span>
                    </div>
                    <p className="pub-citation">{ms}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Teaching */}
          {cv.teaching.length > 0 && (
            <section className="content-section">
              <h2>Teaching &amp; Supervision</h2>
              <ul className="timeline-list">
                {cv.teaching.map((t, i) => (
                  <li key={i}>
                    <span className="timeline-detail">{t}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </Layout>
  )
}
