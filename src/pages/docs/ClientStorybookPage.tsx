import {
	DocsPage, H2, H3, P, Pre, Callout, InlineCode, ExtLink, TocEntry,
} from '@ui-modules';

const toc: TocEntry[] = [
	{ id: 'generate-story', label: 'Generate a story' },
	{ id: 'base-decorator', label: 'Base story decorator' },
	{ id: 'create-component-story', label: 'Component story via CLI' },
	{ id: 'create-container-story', label: 'Container story via CLI' },
];

const componentStory = `// MyComponentName.stories.tsx
import React from 'react';
import { BaseStorybookDecorator } from '@base/features/base-decorator';
import { ComponentStory, Meta } from '@storybook/react';
import DeviceCard, { Props as DeviceCardProps } from './index';

export default {
  title: 'Design System/Business Components/Device Card',
  component: DeviceCard,
  argTypes: {
    quantity: {
      description: 'Number of this item in the cart. When greater than 1, the button becomes disabled and the label becomes "remove".',
    },
  },
  decorators: [BaseStorybookDecorator],
  parameters: {
    docs: { source: { type: 'dynamic', excludeDecorators: true } },
  },
} as Meta;

const Template: ComponentStory<typeof DeviceCard> = (args) => (
  <DeviceCard {...args} />
);

export const Default = Template.bind({});
Default.args = {} as DeviceCardProps;`;

const containerStory = `// ErrorPage.stories.tsx
import React from 'react';
import { BaseStorybookDecorator } from '@base/features/base-decorator';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ComponentStory, Meta } from '@storybook/react';
import { ErrorPage, Props as ErrorPageProps } from './index';

export default {
  title: 'Design System/Containers/ErrorPage',
  component: (props: ErrorPageProps) => <ErrorPage {...(props as any)} />,
  argTypes: {},
  decorators: [BaseStorybookDecorator],
  parameters: {
    docs: { source: { type: 'dynamic', excludeDecorators: true } },
  },
} as Meta;

const Template: ComponentStory<typeof ErrorPage> = (args) => {
  const ErrorPageContainer = baseConnect<any, any, ErrorPageProps>(
    ErrorPage,
    () => ({ ...args }),
  );

  return <ErrorPageContainer {...args} />;
};

export const Default = Template.bind({});
Default.args = {} as ErrorPageProps;`;

export default function ClientStorybookPage() {
	return (
		<DocsPage
			title="Storybook"
			description="Document components and containers with first-class Storybook support."
			toc={toc}
		>
			<P>
				Harmony includes Storybook out of the box. While most of the usage matches the
				official{' '}
				<ExtLink href="https://storybook.js.org/">Storybook documentation</ExtLink>, there
				are a few things you may want to know about Storybook inside Harmony to make your
				life easier.
			</P>

			<section>
				<H2 id="generate-story">Generate a story</H2>
				<P>
					Every time you create a component you can also generate a story for it. When
					running the Harmony component generator, a <InlineCode>.stories.tsx</InlineCode>{' '}
					file is created automatically.
				</P>
			</section>

			<section>
				<H2 id="base-decorator">Base story decorator</H2>
				<P>
					Harmony provides <InlineCode>BaseStorybookDecorator</InlineCode> which connects
					stories to the Redux store. This means you can test not only dumb components,
					but also containers that require data from the store.
				</P>
			</section>

			<section>
				<H2 id="create-component-story">Component story via CLI</H2>
				<P>
					Most of the time all you need to do is fill the{' '}
					<InlineCode>Default.args</InlineCode> object:
				</P>
				<Pre lang="bash">{'gulp createStory --name MyComponentName --storyTitle "Business Components/MyComponentName"'}</Pre>

				<H3 id="component-example">Example</H3>
				<Pre lang="tsx">{componentStory}</Pre>
			</section>

			<section>
				<H2 id="create-container-story">Container story via CLI</H2>
				<P>
					A container story is the same as a normal story, but it is connected to the
					store. You can inject <InlineCode>args</InlineCode> as if they came from the
					store, and the container will work with those values via{' '}
					<InlineCode>mapStateToProps</InlineCode>.
				</P>
				<Pre lang="bash">{'gulp createStoryContainer --name MyComponentName --storyTitle "Business Components/MyComponentName"'}</Pre>

				<H3 id="container-example">Example</H3>
				<Pre lang="tsx">{containerStory}</Pre>

				<Callout type="tip" title="Big data required from the store">
					Try to keep components with small prop requirements. When a container really
					needs a lot of store data, copy the real environment store into a mock file, then
					spread it into your <InlineCode>args</InlineCode>.
				</Callout>
			</section>
		</DocsPage>
	);
}
