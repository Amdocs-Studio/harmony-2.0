import * as path from "path";
import { getBaseConfig } from "../../../vite.config.lib";

export default getBaseConfig({
  entry: path.resolve(__dirname, "src/index.ts"),
  name: "ProjectNameCommonComponents",
  fileName: "project-name-common-components",
});
