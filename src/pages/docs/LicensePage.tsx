import { Typography } from '@mui/material';
import { DocsPage, TocEntry } from '@ui-modules';

const toc: TocEntry[] = [{ id: 'mit', label: 'MIT License' }];

export default function LicensePage() {
	return (
		<DocsPage
			title="License"
			description="Harmony 2.0 is open-source and free to use."
			toc={toc}
		>
			<section>
				<Typography variant="h5" component="h2" id="mit" className="!font-semibold !mb-2">
					MIT License
				</Typography>
				<Typography variant="body2" color="text.secondary" component="div" className="flex flex-col gap-3">
					<p>Copyright &copy; 2017 &ndash; 2025 Harmony Framework</p>
					<p>
						Permission is hereby granted, free of charge, to any person obtaining a copy of
						this software and associated documentation files (the &quot;Software&quot;), to
						deal in the Software without restriction, including without limitation the rights
						to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
						of the Software, and to permit persons to whom the Software is furnished to do
						so, subject to the following conditions:
					</p>
					<p>
						The above copyright notice and this permission notice shall be included in all
						copies or substantial portions of the Software.
					</p>
					<p>
						THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS
						OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
						FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
						AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
						WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
						CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
					</p>
					<p className="opacity-80">
						Note &mdash; the copyright line is only required if there is a copyright comment
						block in the code itself. There is no obligation to mention us or give any
						attribution.
					</p>
				</Typography>
			</section>
		</DocsPage>
	);
}
