import Layout from '../components/Layout'
import cv from '../content/cvGenerated'
import site from '../content/site'
import Link from 'next/link'

const SELECTED_PUBS_COUNT = 6

export default function Home() {
  const selectedPubs = cv.publications.slice(0, SELECTED_PUBS_COUNT)
  const worksInProgress = cv.manuscriptsUnderReview

  return (
    <Layout>
      {/* Hero */}
      <section className="mb-10 border-b pb-8">
        <h1 className="text-3xl font-bold text-navy mb-1">{cv.name}</h1>
        <p className="text-gray-500 text-sm mb-3">{cv.credentials}</p>
        <p className="text-lg font-medium text-gray-700">
          {cv.currentPosition.title}
          {cv.currentPosition.institution && (
            <span className="text-gray-500 font-normal">
              {' '}&#8212; {cv.currentPosition.institution}
            </span>
          )}
        </p>
        {cv.currentPosition.period && (
          <p className="text-sm text-gray-500 mt-0.5">{cv.currentPosition.period}</p>
        )}

        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          {cv.contact.email && (
            <a href={`mailto:${cv.contact.email}`} className="text-blue-700 hover:underline">
              {cv.contact.email}
            </a>
          )}
          {cv.contact.website && (
            <a href={cv.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
              Imperial Profile
            </a>
          )}
          {cv.contact.scholar && (
            <a href={cv.contact.scholar} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
              Google Scholar
            </a>
          )}
          {cv.contact.hindex && (
            <span className="text-gray-600">H-index: <strong>{cv.contact.hindex}</strong></span>
          )}
          <Link href="/cv" className="text-blue-700 hover:underline">
            View Full CV &rarr;
          </Link>
        </div>
      </section>

      {/* Summary */}
      {cv.summary && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-navy mb-3">About</h2>
          <p className="text-gray-700 leading-relaxed">{cv.summary}</p>
        </section>
      )}

      {/* Research Areas */}
      {cv.skills.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-navy mb-3">Research Methods &amp; Skills</h2>
          <div className="flex flex-wrap gap-2">
            {cv.skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-50 text-blue-800 text-sm px-3 py-1 rounded-full border border-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Selected Publications */}
      {selectedPubs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-navy mb-3">
            Selected Publications
            {cv.contact.scholar && (
              <a
                href={cv.contact.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 text-sm font-normal text-blue-700 hover:underline"
              >
                View all on Google Scholar &rarr;
              </a>
            )}
          </h2>
          <ol className="space-y-3 list-none">
            {selectedPubs.map((pub, i) => (
              <li key={i} className="text-sm text-gray-700 leading-relaxed pl-4 border-l-2 border-blue-200">
                {pub}
              </li>
            ))}
          </ol>
          {cv.publications.length > SELECTED_PUBS_COUNT && (
            <p className="mt-3 text-sm text-gray-500">
              +{cv.publications.length - SELECTED_PUBS_COUNT} more publications.{' '}
              <a
                href={cv.contact.scholar ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                Full list on Google Scholar
              </a>
            </p>
          )}
        </section>
      )}

      {/* Work in Progress */}
      {worksInProgress.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-navy mb-3">Work in Progress</h2>
          <ul className="space-y-3">
            {worksInProgress.map((ms, i) => (
              <li key={i} className="text-sm text-gray-700 leading-relaxed pl-4 border-l-2 border-amber-300">
                {ms}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Download CV */}
      <section>
        <a
          href={site.cvUrl}
          download={site.cvDownloadName}
          className="inline-flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-md hover:bg-navy-light transition-colors text-sm font-medium"
        >
          Download Full CV (PDF)
        </a>
      </section>
    </Layout>
  )
}
