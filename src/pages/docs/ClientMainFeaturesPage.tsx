import {
	DocsPage, H2, P, UL, Pre, TocEntry,
} from '@ui-modules';

const toc: TocEntry[] = [
	{ id: 'mobile-ready', label: 'Mobile ready' },
	{ id: 'seo-friendly', label: 'SEO friendly' },
];

const seoSnippet = `const HomePage = ({ currentOffer }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    id: window?.location?.href,
    sku: '11112222',
    name: 'Samsung Galaxy Z Flip6 5G',
    color: 'Silver',
    brand: {
      '@type': 'Brand',
      name: 'Samsung',
    },
  };

  return (
    <>
      <title>My Override Title</title>
      <meta name="description" content="My cool APP built with Harmony" />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      {/* Page content */}
    </>
  );
};

export default HomePage;`;

export default function ClientMainFeaturesPage() {
	return (
		<DocsPage
			title="Main Features"
			description="The defaults you get out of the box with a fresh Harmony 2.0 client."
			toc={toc}
		>
			<section>
				<H2 id="mobile-ready">Mobile ready</H2>
				<P>
					The starter kit is designed with mobile-first principles, ensuring your
					application looks and feels consistent whether your users are on a smartphone,
					tablet, or desktop.
				</P>
				<P>Key features include:</P>
				<UL>
					<li>
						<strong>Responsive layouts</strong> — automatically adjust to different screen
						sizes and orientations.
					</li>
					<li>
						<strong>Cross-platform compatibility</strong> — consistent look and feel across
						various devices and operating systems.
					</li>
					<li>
						<strong>Mobile-specific enhancements</strong> — mobile navigation menus, swipe
						gestures and more.
					</li>
				</UL>
			</section>

			<section>
				<H2 id="seo-friendly">SEO friendly</H2>
				<P>
					The starter kit is built on React 19, giving you first-class support for the new{' '}
					<code>&lt;title&gt;</code>, <code>&lt;meta&gt;</code> and{' '}
					<code>&lt;script&gt;</code> elements directly inside any component. This lets you
					create SEO-friendly web applications that rank higher in search engine results —
					without a separate document head library.
				</P>
				<Pre lang="jsx" label="HomePage.jsx">{seoSnippet}</Pre>
			</section>
		</DocsPage>
	);
}
