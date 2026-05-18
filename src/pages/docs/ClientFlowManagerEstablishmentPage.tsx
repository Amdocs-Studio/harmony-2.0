import { Link } from 'react-router';
import {
	DocsPage, H2, H3, P, UL, Pre, Callout, DocsTable, InlineCode, ExtLink, TocEntry,
} from '@ui-modules';
import { Routes } from '@sdk';

const toc: TocEntry[] = [
	{ id: 'install', label: 'Install' },
	{ id: 'usage', label: 'Usage' },
	{ id: 'store-structure', label: 'Store structure' },
	{ id: 'initial-flow-manager', label: 'Initial Flow Manager' },
	{ id: 'start-and-end-flow', label: 'Start and end flow' },
	{ id: 'steps-actions', label: 'Steps actions' },
	{ id: 'selectors', label: 'Selectors' },
	{ id: 'flows-configuration', label: 'Flows configuration' },
	{ id: 'steps-configuration', label: 'Steps configuration' },
	{ id: 'xstate', label: 'XState' },
];

const reducerSnippet = `import { combineReducers } from 'redux';
import { flowManagerReducer } from 'redux-flow-manager';

const reducers = {
  // ...
  flowManagerFlows: flowManagerReducer,
};

const rootReducer = combineReducers(reducers);`;

const storeSnippet = `// sdk/store.ts
import { CreateFlowManager } from './utils';

export const flowManager = CreateFlowManager(store);`;

const utilsSnippet = `// ./store.flow.manager.utils.ts
import CreateFlowManager, { parseSubFlowsJSON } from 'redux-flow-manager';
import { subFlowsConfig, flowsConfig } from '@config';
import { flowsConditions } from '../hooks/flow-manager';

export default (Store: any) => CreateFlowManager(
  Store,
  'flowManagerFlows',
  parseSubFlowsJSON(subFlowsConfig, flowsConditions),
  flowsConfig,
);`;

const stateShape = `interface FlowManagerState {
  flowType: string;
  subFlowTypes: Array<string>;
  currentStep: string;
  nextStep: string;
  steps: Array<string>;
}`;

const flowsConfigSample = `const flowsConfig = [
  {
    flowName: 'defaultScenario',
    color: '#9b9b9b',
    conditions: [
      {
        conditionName: 'defaultSuccessCondition',
        onCheck: 'defaultSuccessCondition',
        displayName: 'Default Success',
        description: 'Return Always Success to be used for every Flow as Default Scenario',
      },
    ],
  },
  {
    flowName: 'multipleDevices',
    conditions: [
      {
        conditionName: 'multipleDevicesCondition',
        onCheck: 'multipleDevicesCondition',
        displayName: 'Multiple Devices COP',
        description: 'Return success if there are multiple devices in the cart',
      },
    ],
    runInFlowTypes: ['COP'],
    color: '#3133a4',
  },
];`;

const stepsConfigSample = `const stepsConfig = {
  COP: {
    multipleDevices: {
      id: '43da9488-07a0-4c36-aa76-587bc62707ff6',
      steps: ['DEVICE_GALLERY', 'DEVICE_DETAILS', 'REVIEW_BASKET'],
      description: 'Generic COP flow for multiple devices in the cart',
    },
    defaultScenario: {
      id: '374323dd-d091-4164-993a-3dcce359bca3',
      steps: ['DEVICE_GALLERY', 'REVIEW_BASKET'],
      description: 'Generic COP flow for one device in the cart',
    },
  },
};`;

const UsageSection = () => (
	<section>
		<H2 id="usage">Usage</H2>
		<P>
			Check out the examples in <InlineCode>app.ts</InlineCode> and{' '}
			<InlineCode>flowManger.browser.ts</InlineCode> in the{' '}
			<ExtLink href="https://github.com/refaelok/redux-flow-manager/tree/master/test">
				redux-flow-manager test folder
			</ExtLink>
			.
		</P>

		<P><strong>Step 1.</strong> Add the Flow Manager reducer to your project:</P>
		<Pre lang="ts">{reducerSnippet}</Pre>

		<P>
			<strong>Step 2.</strong> Create a <em>steps</em> configuration file — it defines the
			set of steps for each sub-flow type. Explained below in{' '}
			<a href="#steps-configuration">Steps configuration</a>.
		</P>

		<P>
			<strong>Step 3.</strong> Create a <em>flows</em> configuration file — it defines the
			sub-flow types and the conditions that must succeed to make the sub-flow valid. See{' '}
			<a href="#flows-configuration">Flows configuration</a>.
		</P>

		<P>
			<strong>Step 4.</strong> Call <InlineCode>CreateFlowManager</InlineCode> with your
			store, reducer slice name, flows configuration and steps configuration.
		</P>
		<Pre lang="ts">{storeSnippet}</Pre>

		<P>
			<strong>Step 5.</strong> <InlineCode>CreateFlowManager</InlineCode> returns an
			instance of Flow Manager with all the helpers you need to manage flows in your app.
		</P>
		<Pre lang="ts">{utilsSnippet}</Pre>
	</section>
);

const InitialSection = () => (
	<section>
		<H2 id="initial-flow-manager">Initial Flow Manager</H2>
		<H3 id="create-flow-manager-api">
			CreateFlowManager(store, sliceName, flowsConfig, stepsConfig)
		</H3>
		<P>Creates a new instance of Flow Manager.</P>
		<DocsTable
			columns={[
				{ key: 'property', header: 'Property', className: 'font-mono whitespace-nowrap text-xs' },
				{ key: 'type', header: 'Type', className: 'font-mono whitespace-nowrap text-xs' },
				{ key: 'required', header: 'Required' },
				{ key: 'description', header: 'Description' },
			]}
			rows={[
				{ property: 'store', type: 'object', required: 'Required', description: 'Pass in the Redux store.' },
				{ property: 'sliceName', type: 'string', required: 'Required', description: 'The name of the reducer slice.' },
				{ property: 'flowsConfig', type: 'SubFlowsConfig', required: 'Required', description: 'See Flows configuration.' },
				{ property: 'stepsConfig', type: 'StepsConfig', required: 'Required', description: 'See Steps configuration.' },
			]}
		/>
	</section>
);

const StartEndSection = () => (
	<section>
		<H2 id="start-and-end-flow">Start and end flow</H2>

		<H3 id="start-flow">startFlow(flowType, autoUpdate, currentStep)</H3>
		<P>
			Initializes the main flow type in the store. That flow type represents a set of
			sub-flow types in your <a href="#flows-configuration">flows configuration</a>.
		</P>
		<DocsTable
			columns={[
				{ key: 'property', header: 'Property', className: 'font-mono whitespace-nowrap text-xs' },
				{ key: 'type', header: 'Type', className: 'font-mono whitespace-nowrap text-xs' },
				{ key: 'required', header: 'Required' },
				{ key: 'description', header: 'Description' },
			]}
			rows={[
				{ property: 'flowType', type: 'string', required: 'Required', description: 'The flow type that represents a set of sub-flow types.' },
				{ property: 'currentStep', type: 'string', required: 'Required', description: 'Initial specific step when starting the flow, instead of the first step defined in the steps array.' },
				{ property: 'autoUpdate', type: 'boolean', required: 'Optional', description: 'When true, automatically runs the state machine calculator on any change in the store.' },
			]}
		/>

		<H3 id="end-flow">endFlow()</H3>
		<P>Ends the flow. Clears all the data from Flow Manager.</P>
	</section>
);

const StepsSection = () => (
	<section>
		<H2 id="steps-actions">Steps actions</H2>

		<H3 id="update-information">updateInformation()</H3>
		<P>
			Runs the state machine to calculate the sub-flows conditions and update the steps
			and sub-flows information.
		</P>
		<Callout type="note">
			If you call <InlineCode>startFlow</InlineCode> with{' '}
			<InlineCode>autoUpdate: true</InlineCode>, this method is invoked automatically for
			every change in the store — you rarely need to call it yourself.
		</Callout>

		<H3 id="next-step">nextStep(step?)</H3>
		<P>
			Updates <InlineCode>currentStep</InlineCode> to the next step and recomputes the new{' '}
			<InlineCode>nextStep</InlineCode>. Returns the new next step value.
		</P>
		<Callout type="tip">
			To get the most up-to-date result, call <InlineCode>updateInformation</InlineCode>{' '}
			first.
		</Callout>

		<H3 id="is-last-step">isLastStep()</H3>
		<P>Returns whether the current step is the last step.</P>
	</section>
);

const SelectorsSection = () => (
	<section>
		<H2 id="selectors">Selectors</H2>
		<P>
			Each selector returns the corresponding value from the store. It is
			<strong> not recommended</strong> to use selectors directly — use the async step
			actions to get the most recent result before navigation.
		</P>
		<UL>
			<li><InlineCode>getFlowType()</InlineCode></li>
			<li><InlineCode>getSubFlowTypes()</InlineCode></li>
			<li><InlineCode>getCurrentStep()</InlineCode></li>
			<li><InlineCode>getSteps()</InlineCode></li>
			<li><InlineCode>getNextStep()</InlineCode></li>
		</UL>
	</section>
);

const FlowsConfigSection = () => (
	<section>
		<H2 id="flows-configuration">Flows configuration</H2>
		<P>
			Flows config is an array of objects — each object defines a sub-flow that may exist
			in your application. Each flow object has a <InlineCode>conditions</InlineCode> array
			containing callbacks. A callback can check anything related to the condition:
			resolve if it passes, reject if it fails.
		</P>
		<P>
			If all conditions of a sub-flow pass, that sub-flow is added to the{' '}
			<InlineCode>subFlowTypes</InlineCode> array.
		</P>
		<P>Flow object properties:</P>
		<UL>
			<li><InlineCode>flowName: string</InlineCode> — unique name of the sub-flow type.</li>
			<li><InlineCode>conditions: array</InlineCode> — an array of condition objects.</li>
			<li><InlineCode>conditionName: string</InlineCode> — the name of the condition.</li>
			<li><InlineCode>onCheck: function</InlineCode> — a <em>promise</em> function that resolves on success and rejects on failure.</li>
			<li><InlineCode>mandatory: boolean</InlineCode> — optional; whether to remove the sub-flow from the array if the condition fails. Defaults to <InlineCode>true</InlineCode>.</li>
		</UL>
		<Callout type="warning" title="Order matters">
			The order of flow objects in the array is significant — checks run in that order.
		</Callout>
		<Pre lang="ts">{flowsConfigSample}</Pre>
	</section>
);

const StepsConfigSection = () => (
	<section>
		<H2 id="steps-configuration">Steps configuration</H2>
		<P>
			Steps configuration defines, for each flow and sub-flow, the set of steps the user
			needs to complete.
		</P>
		<P>Step object properties:</P>
		<UL>
			<li><InlineCode>key: flowType</InlineCode> (example: <InlineCode>COP</InlineCode>) — represents the flow type.</li>
			<li><InlineCode>key: subFlowType</InlineCode> (example: <InlineCode>planOnlyFlow</InlineCode>) — represents the sub-flow type.</li>
			<li><InlineCode>steps: array</InlineCode> — set of steps for this flow and sub-flow.</li>
		</UL>
		<Callout type="warning" title="Sub-flows order">
			The order of sub-flow objects matters — checks run in that order. For example, if you
			put <InlineCode>defaultScenario</InlineCode> before{' '}
			<InlineCode>multipleDevices</InlineCode>, <InlineCode>defaultScenario</InlineCode>{' '}
			will always be set before <InlineCode>multipleDevices</InlineCode>.
		</Callout>
		<Pre lang="ts">{stepsConfigSample}</Pre>
	</section>
);

const XStateSection = () => (
	<section>
		<H2 id="xstate">XState</H2>
		<H3 id="get-machine-flow-config">getMachineFlowConfig()</H3>
		<P>
			Returns an XState config you can paste into the XState visualizer to see the state
			machine created from your config.
		</P>
		<P>
			<ExtLink href="https://xstate.js.org/viz/?gist=cebc9af156574bc7eea62b99292e3f56">
				Open in XState Visualizer
			</ExtLink>
		</P>
		<img
			src={`${import.meta.env.BASE_URL}assets/state-machine.png`}
			alt="XState generated state machine"
			className="w-full rounded-lg border border-black/10 dark:border-white/10"
		/>
	</section>
);

export default function ClientFlowManagerEstablishmentPage() {
	return (
		<DocsPage
			title="Flow Manager Installation & Establishment"
			description="Wire the Flow Manager from scratch — step by step."
			toc={toc}
		>
			<P>
				Flow Manager helps you manage flow information by determining the current step,
				the next step, and the set of conditions that satisfy each step. It uses{' '}
				<ExtLink href="https://github.com/davidkpiano/xstate">XState</ExtLink>{' '}
				to calculate where you are and where you need to go.
			</P>

			<Callout type="note" title="Harmony 2.0 Flow Manager">
				Harmony 2.0 contains the flow manager by default and is ready to use. See the{' '}
				<Link to={Routes.DOCS_CLIENT_FLOW_MANAGER}>usage guide</Link> for day-to-day usage.
			</Callout>

			<section>
				<H2 id="install">Install</H2>
				<Pre lang="bash">{'npm install --save redux-flow-manager'}</Pre>
			</section>

			<UsageSection />

			<section>
				<H2 id="store-structure">Store structure</H2>
				<Pre lang="ts">{stateShape}</Pre>
			</section>

			<InitialSection />
			<StartEndSection />
			<StepsSection />
			<SelectorsSection />
			<FlowsConfigSection />
			<StepsConfigSection />
			<XStateSection />
		</DocsPage>
	);
}
