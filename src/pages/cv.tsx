import Layout from '../components/Layout'

const PDF_PATH = '/myCV/cv.pdf'

export default function CVPage() {
  return (
    <Layout title="CV">
      <div style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 88px)', /* subtract brand-bar + sticky nav */
        minHeight: '480px',
      }}>
        <iframe
          src={PDF_PATH}
          title="Bohee Lee — Curriculum Vitae"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    </Layout>
  )
}
