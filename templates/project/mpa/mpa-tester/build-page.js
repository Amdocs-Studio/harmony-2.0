import fs from "fs";
import { fileURLToPath } from 'url';
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function readJsonFile(filePath) {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } else {
    console.error(`File '${filePath}' does not exist.`);
    return null;
  }
}

function replaceTokensInString(str, tokens) {
  let result = str;
  for (const [key, value] of Object.entries(tokens)) {
    result = result.replace(new RegExp(key, 'g'), value);
  }
  return result;
}

export function buildPage(url) {
  const pageConfig = readJsonFile(path.join(__dirname, 'pages-config.json'))[url];
  if (pageConfig) {
    const pageWidgetsScripts = [];
    const loadPageWidgets = [];
    const pageWidgetsDivs = [];
    pageConfig.widgets.forEach(widget => {
      pageWidgetsScripts.push(`<script type="module" crossorigin src="../src/modules/${widget.package}/dist/${widget.package}.umd.js"></script>`);
      loadPageWidgets.push(`loadWidget('${widget.library}', '${widget.component}', '${widget.package}');`);
      pageWidgetsDivs.push(`<div id="${widget.package}" style="height: 100%"></div>`);
    });
    const tokens = {
      '##PAGE_WIDGETS_SCRIPS##': pageWidgetsScripts.join('\n'),
      '##LOAD_PAGE_WIDGETS##': loadPageWidgets.join('\n'),
      '##PAGE_WIDGETS_DIVS##': pageWidgetsDivs.join('\n'),
      '##PAGE_TITLE##': pageConfig.pageTitle,
    };
    const pageTemplate = fs.readFileSync(path.join(__dirname, 'page-template.html'), 'utf8');
    return replaceTokensInString(pageTemplate, tokens);
  }
}