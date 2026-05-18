import {
	DocsPage, H2, H3, P, UL, Pre, Callout, DocsTable, InlineCode, ExtLink, TocEntry,
} from '@ui-modules';

const toc: TocEntry[] = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'motivation', label: 'Motivation' },
	{ id: 'usage', label: 'Usage' },
	{ id: 'files', label: 'Files', depth: 3 },
	{ id: 'use-flow-manager', label: 'useFlowManager', depth: 3 },
	{ id: 'code-examples', label: 'Code examples', depth: 3 },
];

const startFlow = `const onStartBuyFlow = async () => {
  const { startFlow } = useFlowManagerApi(navigate);

  startFlow(
    flowsTypes.flowTypes.COP,
    (flowsTypes as TypesConfig).stepTypes.DEVICE_GALLERY.name,
    true,
  );
};`;

const nextStep = `const onMiniCartContinue = async () => {
  const { moveToNextStep } = useFlowManagerApi(navigate);

  moveToNextStep();
};`;

export default function ClientFlowManagerPage() {
	return (
		<DocsPage
			title="Flow Manager"
			description="Drive multi-step flows with a state machine under the hood."
			toc={toc}
		>
			<section>
				<H2 id="overview">Overview</H2>
				<P>
					Flow Manager helps you manage flow information by determining the current step,
					the next step, and the set of conditions that satisfy each step. Under the hood
					it uses{' '}
					<ExtLink href="https://github.com/davidkpiano/xstate">XState</ExtLink>{' '}
					to calculate where you currently are in the flow and where you need to go.
				</P>
				<Callout type="note" title="Harmony 2.0 Flow Manager">
					Harmony 2.0 ships with Flow Manager by default — it is ready to use without any
					additional setup.
				</Callout>
			</section>

			<section>
				<H2 id="motivation">Motivation</H2>
				<P>
					<InlineCode>redux-flow-manager</InlineCode> was built to help you manage
					applications with complex flows. In a flow diagram each <strong>color</strong>{' '}
					represents a sub-flow, and the green and red steps are the start and end of the
					flow. Flow Manager helps you decide where you are and where you need to go next.
				</P>
				<img
					src={`${import.meta.env.BASE_URL}assets/flow-manager-diagram.png`}
					alt="Flow manager diagram"
					className="w-full rounded-lg border border-black/10 dark:border-white/10"
				/>
			</section>

			<section>
				<H2 id="usage">Usage</H2>

				<H3 id="files">Files</H3>
				<P>
					In Harmony there are a few files and folders to get familiar with in order to use
					Flow Manager:
				</P>
				<UL>
					<li>
						<InlineCode>src/config/flow-manager</InlineCode> — contains the flow, sub-flow
						and types definitions.
					</li>
					<li>
						<InlineCode>src/modules/sdk/hooks/flow-manager</InlineCode> — contains the
						hooks and conditions used to manage the flow.
					</li>
				</UL>

				<H3 id="use-flow-manager">useFlowManager</H3>
				<P>
					This is the main hook you will use to manage the flow in your application.
				</P>
				<DocsTable
					columns={[
						{ key: 'method', header: 'Method', className: 'whitespace-nowrap font-mono text-xs' },
						{ key: 'description', header: 'Description' },
					]}
					rows={[
						{ method: 'getFlowInformation()', description: 'Retrieves the current flow information: flow type, sub-flow type, current step, next step and steps.' },
						{ method: 'startFlow(flowType, currentStep, isMoveToStep)', description: 'Starts the flow with the specified type and initial step. Optionally moves to the specified step.' },
						{ method: 'endFlow()', description: 'Ends the current flow and clears all data from the flow manager.' },
						{ method: 'moveToNextStep(step?, isUpdateInformation)', description: 'Moves to the next step in the flow. Optionally updates the flow information.' },
						{ method: 'moveToPrevStep(step, isUpdateInformation)', description: 'Moves to the previous step in the flow. Optionally updates the flow information.' },
						{ method: 'isLastStep()', description: 'Checks if the current step is the last step.' },
						{ method: 'isFirstStep(steps, currentStep)', description: 'Checks if the current step is the first step in the flow.' },
						{ method: 'isStepIncludedInFlow(stepName)', description: 'Checks if the specified step is included in the current flow.' },
						{ method: 'calculatePreviousStep(steps, chosenStep)', description: 'Calculates the previous step based on the current steps and the chosen step.' },
					]}
				/>

				<H3 id="code-examples">Code examples</H3>
				<P>Start the <InlineCode>COP</InlineCode> flow with its first step:</P>
				<Pre lang="tsx">{startFlow}</Pre>
				<P>Move to the next step in the flow:</P>
				<Pre lang="tsx">{nextStep}</Pre>
			</section>
		</DocsPage>
	);
}
