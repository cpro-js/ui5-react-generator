import chalk from "chalk";
import Generator from "yeoman-generator";
import yosay from "yosay";
import pkg from "../../package.json";
import staticFiles from "./StaticFiles";
import templateFiles from "./TemplateFiles";

interface Answers {
  appId: string;
  appTitle: string;
  defaultLanguage: string;
  serverUrl: string;
  odataServicePath: string;
  semanticObject: string;
  action: string;
  bspContainer: string;
  package: string;
  transportNo: string;
  sapClientForDev: number;
  sapClientForDeployment: number;
  fullServiceUrl: string;
}

export class Ui5ReactGenerator extends Generator {
  private answers: Answers;

  public constructor(args: any, opts: any) {
    super(args, opts);
  }

  public initializing() {
    this.log(yosay(`Welcome to the ${chalk("UI5 React App generator")} (${pkg.version})`));
  }

  public async prompting() {
    this.answers = await this.prompt<Answers>([
      {
        type: "input",
        name: "appId",
        message: "The technical app id used in manifest.json, package.json and ui5 artefacts:",
      },
      {
        type: "input",
        name: "appTitle",
        message: "Human readable app title:",
      },
      {
        type: "input",
        name: "defaultLanguage",
        default: "en",
        message: "Default language to use for translations and i18n settings, e.g. en, de, fr:",
      },
      {
        type: "input",
        name: "serverUrl",
        default: "https://services.odata.org",
        message: "Server URL (starting with http(s) and ending with the host without any path):",
      },
      {
        type: "input",
        name: "odataServicePath",
        default: "TripPinRESTierService",
        message: "Absolute path to the OData service (without protocol and host):",
      },
      {
        type: "input",
        name: "semanticObject",
        message: "The semantic object used for Fiori Launchpad config (underscores allowed, no hyphens, no dots):",
      },
      {
        type: "input",
        name: "action",
        default: "display",
        message: "The action used for Fiori Launchpad config:",
      },
      {
        type: "input",
        name: "bspContainer",
        message: "Name of the BSP container, e.g. 'ZEWM_MY_APP' (max 15 chars):",
      },
      {
        type: "input",
        name: "package",
        message: "The ABAP package to which this app should belong when being deployed:",
      },
      {
        type: "input",
        name: "transportNo",
        message: "The transport number used for deployment:",
      },
      {
        type: "input",
        name: "sapClientForDeployment",
        default: "100",
        message: "Sap client to use for deployment:",
      },
      {
        type: "input",
        name: "sapClientForDev",
        default: "200",
        message: "Sap client to use for development (OData consumption):",
      },
    ]);

    const odataPath = this.answers.odataServicePath.startsWith("/")
      ? this.answers.odataServicePath.substring(1)
      : this.answers.odataServicePath;

    this.answers.fullServiceUrl = `${this.answers.serverUrl}/${odataPath}`;
  }

  public writing() {
    // .gitignore needs special treatment
    this.fs.copy(this.templatePath("gitignore"), this.destinationPath(".gitignore"));

    // Copy all static files as they are
    staticFiles.forEach((staticFile) => {
      this.fs.copy(this.templatePath(staticFile), this.destinationPath(staticFile));
    });

    // Copy all template files and replace placeholders with values from answers
    templateFiles.forEach((templateFile) => {
      this.fs.copyTpl(this.templatePath(templateFile), this.destinationPath(templateFile), this.answers);
    });
  }

  public end() {
    this.spawnCommandSync("npm", ["run", "gen-odata"]);

    this.log("");
    this.log("");
    this.log("Thanks for using the ui5-react generator!");
    this.log("Have fun creating great UI5 apps with React under the hood...");
  }
}
