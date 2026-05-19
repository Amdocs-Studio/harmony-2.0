import { Card, CardContent, Typography, Chip } from '@mui/material';
import {
	DocsPage, H2, H3, P, Lead, UL, Pre, Callout, InlineCode, ExtLink, TocEntry,
} from '@ui-modules';

const toc: TocEntry[] = [
	{ id: 'what-is-it', label: 'What is the Harmony MCP?' },
	{ id: 'endpoint', label: 'Endpoint' },
	{ id: 'add-to-cursor', label: 'Add to Cursor' },
	{ id: 'add-to-claude', label: 'Add to Claude Desktop' },
	{ id: 'http-usage', label: 'Use over plain HTTP' },
	{ id: 'tools', label: 'Available tools' },
	{ id: 'harmony-chat', label: 'harmony_chat', depth: 3 },
	{ id: 'harmony-analyze-code', label: 'harmony_analyze_code', depth: 3 },
	{ id: 'harmony-generate-code', label: 'harmony_generate_code', depth: 3 },
	{ id: 'harmony-get-guidance', label: 'harmony_get_guidance', depth: 3 },
	{ id: 'example-prompts', label: 'Example prompts' },
];

const MCP_URL = 'https://harmony2-gemini-mcp.vercel.app/mcp';

const cursorConfig = `{
  "mcpServers": {
    "harmony2": {
      "url": "https://harmony2-gemini-mcp.vercel.app/mcp"
    }
  }
}`;

const claudeConfig = `{
  "mcpServers": {
    "harmony2": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://harmony2-gemini-mcp.vercel.app/mcp"
      ]
    }
  }
}`;

const initRequest = `curl -X POST https://harmony2-gemini-mcp.vercel.app/mcp \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {}
  }'`;

const toolsListRequest = `curl -X POST https://harmony2-gemini-mcp.vercel.app/mcp \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'`;

const toolCallRequest = `curl -X POST https://harmony2-gemini-mcp.vercel.app/mcp \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "harmony_get_guidance",
      "arguments": {
        "topic": "flow manager"
      }
    }
  }'`;

const chatSchema = `{
  "message": "How do I scaffold a new UI module?",
  "context": {
    "currentFile": "src/ui-modules/my-widget/index.ts",
    "projectStructure": "SPA"
  }
}`;

const analyzeSchema = `{
  "code": "export const Foo = (props) => <Bar {...props} />;",
  "language": "typescript"
}`;

const generateSchema = `{
  "description": "A Redux Toolkit slice for a cart with add/remove reducers",
  "componentType": "service"
}`;

const guidanceSchema = `{
  "topic": "flow manager"
}`;

type Tool = {
	id: string;
	name: string;
	chip: 'chat' | 'analyze' | 'generate' | 'guidance';
	summary: string;
	required: string[];
	optional?: string[];
};

const tools: Tool[] = [
	{
		id: 'harmony-chat',
		name: 'harmony_chat',
		chip: 'chat',
		summary: 'Chat with the Harmony 2.0 Master Agent. Ask questions about Harmony 2.0, get guidance, or request help with development tasks.',
		required: ['message'],
		optional: ['context'],
	},
	{
		id: 'harmony-analyze-code',
		name: 'harmony_analyze_code',
		chip: 'analyze',
		summary: 'Analyze code for Harmony 2.0 compliance and best practices. Get suggestions for improvement.',
		required: ['code'],
		optional: ['language'],
	},
	{
		id: 'harmony-generate-code',
		name: 'harmony_generate_code',
		chip: 'generate',
		summary: 'Generate code following Harmony 2.0 patterns and best practices.',
		required: ['description'],
		optional: ['componentType'],
	},
	{
		id: 'harmony-get-guidance',
		name: 'harmony_get_guidance',
		chip: 'guidance',
		summary: 'Get comprehensive guidance on a specific Harmony 2.0 topic or feature.',
		required: ['topic'],
	},
];

const chipColor: Record<Tool['chip'], 'primary' | 'secondary' | 'success' | 'warning'> = {
	chat: 'primary',
	analyze: 'warning',
	generate: 'success',
	guidance: 'secondary',
};

const IntroSection = () => (
	<section>
		<H2 id="what-is-it">What is the Harmony MCP?</H2>
		<P>
			The Harmony 2.0 MCP Server is a hosted{' '}
			<ExtLink href="https://modelcontextprotocol.io/">
				Model Context Protocol
			</ExtLink>{' '}
			server that exposes the Harmony &quot;Master Agent&quot; to any MCP-capable client —
			Cursor, Claude Desktop, Windsurf, VS Code, custom agents, or plain HTTP.
		</P>
		<Lead>
			Instead of memorizing Harmony conventions, let your agent ask Harmony directly.
		</Lead>
		<P>
			The server ships four tools to ask for guidance, analyze existing code, generate new
			code that follows Harmony conventions, or chat with the master agent for free-form
			help.
		</P>
	</section>
);

const EndpointSection = () => (
	<section>
		<H2 id="endpoint">Endpoint</H2>
		<div className="flex flex-wrap items-center gap-3">
			<Chip label="HTTP MCP" size="small" color="primary" />
			<Chip label="v1.0.0" size="small" variant="outlined" />
			<Chip label="public" size="small" variant="outlined" />
		</div>
		<Pre lang="text" label="URL">{MCP_URL}</Pre>
		<P>
			The endpoint implements the MCP HTTP transport and accepts the three standard
			JSON-RPC methods: <InlineCode>initialize</InlineCode>,{' '}
			<InlineCode>tools/list</InlineCode> and <InlineCode>tools/call</InlineCode>.
		</P>
	</section>
);

const ClientsSection = () => (
	<>
		<section>
			<H2 id="add-to-cursor">Add to Cursor</H2>
			<P>
				Add the server to <InlineCode>.cursor/mcp.json</InlineCode> (workspace-scoped) or
				to <InlineCode>~/.cursor/mcp.json</InlineCode> (user-wide):
			</P>
			<Pre lang="json" label=".cursor/mcp.json">{cursorConfig}</Pre>
			<P>
				Reload the Cursor window and the <InlineCode>harmony2</InlineCode> tools will
				become available to the agent automatically.
			</P>
			<Callout type="tip">
				You can also add the server from <strong>Settings → MCP</strong> in Cursor and
				paste the URL directly — no file editing required.
			</Callout>
		</section>

		<section>
			<H2 id="add-to-claude">Add to Claude Desktop</H2>
			<P>
				Claude Desktop currently expects MCP servers over stdio. Bridge the HTTP server
				with <InlineCode>mcp-remote</InlineCode> by adding this to{' '}
				<InlineCode>claude_desktop_config.json</InlineCode>:
			</P>
			<Pre lang="json" label="claude_desktop_config.json">{claudeConfig}</Pre>
		</section>
	</>
);

const HttpUsageSection = () => (
	<section>
		<H2 id="http-usage">Use over plain HTTP</H2>
		<P>No client? You can hit the MCP directly with <InlineCode>curl</InlineCode>.</P>

		<H3 id="initialize">Initialize</H3>
		<Pre lang="bash">{initRequest}</Pre>

		<H3 id="list-tools">List tools</H3>
		<Pre lang="bash">{toolsListRequest}</Pre>

		<H3 id="call-tool">Call a tool</H3>
		<Pre lang="bash">{toolCallRequest}</Pre>
	</section>
);

const ToolCards = () => (
	<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
		{tools.map((t) => (
			<Card
				key={t.id}
				variant="outlined"
				className="hover:shadow-md! transition-shadow!"
			>
				<CardContent className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<Chip
							size="small"
							color={chipColor[t.chip]}
							label={t.chip}
							variant="outlined"
						/>
						<Typography variant="subtitle2" className="font-mono! font-semibold!">
							{t.name}
						</Typography>
					</div>
					<Typography variant="body2" color="text.secondary">
						{t.summary}
					</Typography>
				</CardContent>
			</Card>
		))}
	</div>
);

const ToolsSection = () => (
	<section>
		<H2 id="tools">Available tools</H2>
		<P>
			The server currently exposes four tools. Each tool accepts a plain JSON object and
			returns a natural-language answer from the Harmony Master Agent.
		</P>

		<ToolCards />

		<H3 id="harmony-chat">harmony_chat</H3>
		<P>
			Chat with the Harmony 2.0 Master Agent. Ask questions about Harmony 2.0, get
			guidance, or request help with a development task.
		</P>
		<UL>
			<li><InlineCode>message</InlineCode> (string, required) — your question.</li>
			<li><InlineCode>context</InlineCode> (object, optional) — arbitrary context such as the current file or project structure.</li>
		</UL>
		<Pre lang="json" label="arguments">{chatSchema}</Pre>

		<H3 id="harmony-analyze-code">harmony_analyze_code</H3>
		<P>
			Analyze a snippet for Harmony 2.0 compliance and best practices. The agent returns
			concrete suggestions and links into the documentation when relevant.
		</P>
		<UL>
			<li><InlineCode>code</InlineCode> (string, required) — the code to analyze.</li>
			<li><InlineCode>language</InlineCode> (string, optional) — defaults to <InlineCode>javascript</InlineCode>.</li>
		</UL>
		<Pre lang="json" label="arguments">{analyzeSchema}</Pre>

		<H3 id="harmony-generate-code">harmony_generate_code</H3>
		<P>
			Generate code that follows Harmony patterns — slices, hooks, UI modules, services
			and more.
		</P>
		<UL>
			<li><InlineCode>description</InlineCode> (string, required) — what to generate.</li>
			<li><InlineCode>componentType</InlineCode> (string, optional) — defaults to <InlineCode>component</InlineCode>.</li>
		</UL>
		<Pre lang="json" label="arguments">{generateSchema}</Pre>

		<H3 id="harmony-get-guidance">harmony_get_guidance</H3>
		<P>
			Get comprehensive guidance on a specific Harmony 2.0 topic or feature — the
			equivalent of reading a documentation section out loud.
		</P>
		<UL>
			<li><InlineCode>topic</InlineCode> (string, required) — the topic you want guidance on.</li>
		</UL>
		<Pre lang="json" label="arguments">{guidanceSchema}</Pre>
	</section>
);

const ExamplesSection = () => (
	<section>
		<H2 id="example-prompts">Example prompts</H2>
		<P>Once the server is wired into your agent, try prompts like:</P>
		<UL>
			<li><em>&ldquo;Use the harmony2 MCP to explain how the flow manager calculates the next step.&rdquo;</em></li>
			<li><em>&ldquo;Analyze this component with harmony_analyze_code and suggest improvements to match Harmony conventions.&rdquo;</em></li>
			<li><em>&ldquo;Generate a Redux Toolkit slice for a shopping cart, using harmony_generate_code.&rdquo;</em></li>
			<li><em>&ldquo;Ask harmony_get_guidance about multilingual support.&rdquo;</em></li>
		</UL>

		<Callout type="note">
			The server is rate-limited per client IP. For high-volume usage, self-host the
			server and point your agent at your own URL.
		</Callout>
	</section>
);

export default function McpPage() {
	return (
		<DocsPage
			title="MCP Server"
			description="Drive Harmony 2.0 from any MCP-capable AI agent."
			toc={toc}
		>
			<IntroSection />
			<EndpointSection />
			<ClientsSection />
			<HttpUsageSection />
			<ToolsSection />
			<ExamplesSection />
		</DocsPage>
	);
}
