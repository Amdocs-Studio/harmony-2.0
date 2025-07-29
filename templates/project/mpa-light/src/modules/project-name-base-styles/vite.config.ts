import * as path from "path";
import { getBaseConfig } from "../../../vite.config.lib";

export default getBaseConfig({
  entry: path.resolve(__dirname, "src/style.css"),
  name: "BaseStyles",
  fileName: "project-name-styles",
});
