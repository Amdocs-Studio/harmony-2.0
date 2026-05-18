import {
	DocsPage, H2, P, UL, Pre, InlineCode, TocEntry,
} from '@ui-modules';

const toc: TocEntry[] = [
	{ id: 'concept', label: 'Concept' },
	{ id: 'actions', label: 'RBA actions' },
	{ id: 'rbac-component', label: 'RBAC component' },
];

const permissionsShape = `{
  "rba": {
    "permissions": {
      "shipment": "hidden",
      "searchInput": "disabled",
      "addToCart": "disabled"
    }
  }
}`;

const rbacUsage = `import RBAC from '@base/features/base-rba/components/RBAC';

<RBAC id="searchInput">
  <Form.Control
    type="text"
    data-automation-id="filter-input"
    placeholder="Search"
    onChange={(e) => this.setState({ searchValue: e.target.value.toLowerCase() })}
  />
</RBAC>`;

export default function ClientRbaPage() {
	return (
		<DocsPage
			title="RBA"
			description="Role-based access control wired directly into the Redux store."
			toc={toc}
		>
			<section>
				<H2 id="concept">Concept</H2>
				<P>
					RBA is a built-in feature in Harmony that lets you store a{' '}
					<InlineCode>permissions</InlineCode> list in the Redux store — typically right
					after login — and use it to control what each user can see or do.
				</P>
			</section>

			<section>
				<H2 id="actions">RBA actions</H2>
				<P>
					RBA is a base feature and is not imported automatically into a Harmony project.
					You can find it under{' '}
					<InlineCode>src/base/features/base-rba</InlineCode>.
				</P>
				<UL>
					<li>
						<InlineCode>RBAStatus</InlineCode> — enum with the possible statuses of each
						permission:
						<UL>
							<li><InlineCode>hidden</InlineCode></li>
							<li><InlineCode>disabled</InlineCode></li>
							<li><InlineCode>secured</InlineCode></li>
						</UL>
					</li>
					<li>
						<InlineCode>loadRBAData</InlineCode> — async call to the RBA API, stores the
						result in the rba slice in the store. Typically called once the user logs in.
					</li>
					<li>
						<InlineCode>cleanRBAData</InlineCode> — clears RBA permissions from the store.
						Typically called on logout.
					</li>
					<li>
						<InlineCode>getPermissions</InlineCode> — selector that returns the
						permissions object from the store.
					</li>
				</UL>
				<P>
					After the mapping process, the permissions object looks like this:
				</P>
				<Pre lang="json">{permissionsShape}</Pre>
			</section>

			<section>
				<H2 id="rbac-component">RBAC component</H2>
				<P>
					To use the RBAC component to wrap a UI element, import it and wrap the protected
					child:
				</P>
				<Pre lang="tsx">{rbacUsage}</Pre>
				<P>
					The component looks up the <InlineCode>id</InlineCode> in the permissions slice
					and renders, hides, or disables the child accordingly.
				</P>
			</section>
		</DocsPage>
	);
}
