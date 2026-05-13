import Layout from '../components/Layout'
import site from '../content/site'

export default function CVPage() {
  return (
    <Layout title="CV">
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <h1 className="text-2xl font-bold text-navy">Curriculum Vitae</h1>
        <div className="flex gap-3 ml-auto">
          <a
            href={site.cvUrl}
            download={site.cvDownloadName}
            className="inline-flex items-center gap-1.5 bg-navy text-white px-4 py-2 rounded-md hover:bg-navy-light transition-colors text-sm font-medium"
          >
            Download PDF
          </a>
          <a
            href={site.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-navy text-navy px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Open in New Tab
          </a>
        </div>
      </div>

      <div className="w-full border rounded-lg overflow-hidden shadow-sm" style={{ height: '85vh' }}>
        <object
          data={site.cvUrl}
          type="application/pdf"
          className="w-full h-full"
        >
          <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-600 bg-gray-50 p-8">
            <p className="text-center">
              PDF preview is not available in this browser.
            </p>
            <a
              href={site.cvUrl}
              download={site.cvDownloadName}
              className="bg-navy text-white px-5 py-2 rounded-md hover:bg-navy-light transition-colors text-sm font-medium"
            >
              Download CV PDF
            </a>
            <a
              href={site.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline text-sm"
            >
              Open PDF in new tab
            </a>
          </div>
        </object>
      </div>
    </Layout>
  )
}
