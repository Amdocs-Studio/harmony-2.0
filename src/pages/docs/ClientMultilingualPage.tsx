import {
	DocsPage, H2, H3, P, Pre, InlineCode, ExtLink, Callout, TocEntry,
} from '@ui-modules';

const toc: TocEntry[] = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'usage-example', label: 'Usage example' },
	{ id: 'translation-index', label: 'Translation index', depth: 3 },
	{ id: 'translation-files', label: 'Translation files', depth: 3 },
	{ id: 'more-than-one-language', label: 'More than one language', depth: 3 },
	{ id: 'register-languages', label: 'Register languages', depth: 3 },
	{ id: 'inside-a-component', label: 'Inside a component', depth: 3 },
];

const indexTs = `import Devices from './DevicesMessages';

export default {
  Devices,
  AdditionsByFlags,
  Screens,
  Header,
  Common,
} as const;`;

const devicesTs = `export default {
  deviceGallery: {
    pageTitle: 'gallery',
    addToCartButton: 'add to cart',
    removeFromCartButton: 'remove',
    priceTitle: 'price',
    clearCartButton: 'clear',
    checkoutButton: 'done',
    deviceCard: {
      // you can pass a parameter to the message
      deviceName: 'device name {name}',
      devicePrice: 'device price',
      deviceDescription: 'device description',
    },
  },
  checkout: {
    pageTitle: 'done',
    totalPriceTitle: 'final price',
  },
};`;

const spTs = `import Devices from './DevicesMessages';

export default {
  Devices,
  AdditionsByFlags,
  Screens,
  Header,
  Common,
} as const satisfies MessagesStructure;`;

const localesTs = `import enMessages from './en';
import spMessages from './sp';

// This will use enMessages as the "base" messages.
// Any other language can be declared as MessagesStructure, to validate that all messages are present.
export type MessagesStructure = MatchStructure<typeof enMessages, typeof enMessages>;

export type Locales = 'sp' | 'en';

export const messages: { [key in Locales]: MessagesStructure } = {
  sp: spMessages,
  en: enMessages,
};

type MatchStructure<T, U> = {
  [K in keyof T]: K extends keyof U ? MatchStructure<T[K], U[K]> : never;
};`;

const componentUsage = `import { useAppIntl } from '@msgs';

const Devices: React.FC = () => {
  const { formatMessage } = useAppIntl();

  return (
    <Container>
      <Row>
        <h1 id="page-header">
          {formatMessage({ id: 'deviceGallery.pageTitle' })}
        </h1>
      </Row>
      <br />
      <Form className="row">
        <Form.Group>
          <Form.Control />
          <div>
            {/* Pass parameters to messages that use them */}
            {formatMessage(
              { id: 'deviceGallery.deviceCard.deviceName' },
              { name: 'iPhone 12' },
            )}
          </div>
        </Form.Group>
      </Form>
    </Container>
  );
};`;

export default function ClientMultilingualPage() {
	return (
		<DocsPage
			title="Multi-language support"
			description="Translate your Harmony app with react-intl."
			toc={toc}
		>
			<section>
				<H2 id="overview">Overview</H2>
				<P>
					i18n gives you an easy way to support multiple languages and to encapsulate all
					your titles and static strings in one place. If you are not familiar with
					internationalization in general, read{' '}
					<ExtLink href="https://en.wikipedia.org/wiki/Internationalization_and_localization">
						Internationalization and localization
					</ExtLink>
					.
				</P>
				<P>
					In our boilerplate you can easily add and use i18n powered by{' '}
					<ExtLink href="https://formatjs.github.io/docs/react-intl/">react-intl</ExtLink>.
					To use i18n, create a new locale TypeScript file and map it under{' '}
					<InlineCode>messages</InlineCode>.
				</P>
				<Callout type="tip">
					Once the mapping is done, the translator utility is injected into the app — just
					pass the ID of your message and you are done.
				</Callout>
			</section>

			<section>
				<H2 id="usage-example">Usage example</H2>

				<H3 id="translation-index">Translation index</H3>
				<P>
					Add the translation <InlineCode>index.ts</InlineCode> file (in this example we
					use <InlineCode>en.ts</InlineCode> as the main language):
				</P>
				<Pre lang="ts" label="en/index.ts">{indexTs}</Pre>

				<H3 id="translation-files">Translation files</H3>
				<P>
					Add translation files (in this example{' '}
					<InlineCode>DevicesMessages.ts</InlineCode>):
				</P>
				<Pre lang="ts" label="en/DevicesMessages.ts">{devicesTs}</Pre>

				<H3 id="more-than-one-language">More than one language</H3>
				<P>
					Once you declare a language with{' '}
					<InlineCode>satisfies MessagesStructure</InlineCode>, if any message is missing
					you will get a compile-time error.
				</P>
				<Pre lang="ts" label="sp/index.ts">{spTs}</Pre>

				<H3 id="register-languages">Register languages</H3>
				<P>
					Add the language keys (<InlineCode>&apos;en&apos;</InlineCode>,{' '}
					<InlineCode>&apos;sp&apos;</InlineCode> in this example):
				</P>
				<Pre lang="ts" label="locales.ts">{localesTs}</Pre>

				<H3 id="inside-a-component">Inside a component</H3>
				<P>The following code shows how to use messages inside a component:</P>
				<Pre lang="tsx" label="Devices.tsx">{componentUsage}</Pre>
			</section>
		</DocsPage>
	);
}
