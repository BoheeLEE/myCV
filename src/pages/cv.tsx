import Layout from '../components/Layout'
import site from '../content/site'
import cv from '../content/cvGenerated'

export default function CVPage() {
  return (
    <Layout title="CV">
      <div className="cv-header-bar">
        <h1 className="cv-title">Curriculum Vitae</h1>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <a href={site.cvUrl} download={site.cvDownloadName} className="btn btn-primary">
            Download PDF
          </a>
          <a href={site.cvUrl} target="_blank" rel="noopener noreferrer" className="btn">
            Open in New Tab
          </a>
        </div>
      </div>

      <div className="cv-viewer">
        <div className="cv-embed-shell">
          <object data={site.cvUrl} type="application/pdf">
            <div className="cv-fallback">
              <p>PDF preview is not available in this browser.</p>
              <a href={site.cvUrl} download={site.cvDownloadName} className="btn btn-primary">
                Download CV PDF
              </a>
              <a href={site.cvUrl} target="_blank" rel="noopener noreferrer" className="btn">
                Open in new tab
              </a>
            </div>
          </object>
        </div>

        {/* Quick info below embed */}
        <div style={{ marginTop: '1.4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div className="card" style={{ borderTop: '4px solid var(--accent)' }}>
            <span className="section-label">Current Position</span>
            <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.55 }}>
              <strong>{cv.currentPosition.title}</strong><br />
              {cv.currentPosition.institution}<br />
              <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{cv.currentPosition.period}</span>
            </p>
          </div>
          <div className="card">
            <span className="section-label">Contact</span>
            <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.7 }}>
              {cv.contact.email && (
                <><a href={`mailto:${cv.contact.email}`} style={{ color: 'var(--accent)' }}>{cv.contact.email}</a><br /></>
              )}
              {cv.contact.website && (
                <a href={cv.contact.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                  Imperial Profile
                </a>
              )}
            </p>
          </div>
          <div className="card">
            <span className="section-label">Research Output</span>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7 }}>
              31 peer-reviewed articles<br />
              17 as first author<br />
              H-index: {cv.contact.hindex ?? '13'}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
