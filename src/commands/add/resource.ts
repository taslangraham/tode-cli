import { Command, flags } from '@oclif/command';
import * as chalk from 'chalk';
import * as files from '../../libs';
import controller from './controller';
import model from './model';
import service from './service';

const RESOURCE_NAME = 'resource_name';

export default class Resource extends Command {
  public static description = 'adds a complete resource (mode, controller, service';
  public static strict = true;

  public static flags = {
    help: flags.help({ char: 'h' }),
  };

  public static aliases = ['rs'];

  public static args = [{
    name: RESOURCE_NAME,
    description: 'Name of resource to create',
    required: true,
  }];

  public static examples = [`tode add:resource ${RESOURCE_NAME}`];
  private serviceDriver = files.getTemplateDriver('service');
  private controllerDriver = files.getTemplateDriver('controller');
  public async run() {
    const { args } = this.parse(Resource);
    const featureName = args[RESOURCE_NAME] as string;

    // Install each resource item
    try {
      await controller.run([featureName]);
      await model.run([featureName]);
      await service.run([featureName]);
      const name = files.kebabToPascal(featureName);

      try {
        // Import model into service file
        const serviceImportStatement = `import { ${name} } from '../../models/${featureName}';\n`;

        this.addImportStatementToFile(serviceImportStatement,
          `${this.serviceDriver.destination}/${featureName}/index.ts`,
          featureName,
        );

        // Import model into service file
        // tslint:disable-next-line: max-line-length
        const controllerImportStatement = `import { ${files.kebabToCamelCase(featureName)}Service } from '../../services/${featureName}';\n`;

        this.addImportStatementToFile(controllerImportStatement,
          `${this.controllerDriver.destination}/${featureName}/index.ts`,
          featureName,
        );
      } catch (error) {
        throw new Error('Failed to create all resource files');
      }

    } catch (error) {
      //
    }
  }
  public async catch(error: Error) {
    this.error(chalk.red(error));
  }

  /**
   *
   * @param importStatement import statement
   * @param filePath file path
   *
   */
  private addImportStatementToFile(importStatement: string, filePath: string, featureName: string) {
    try {
      // Add model import statement to service file
      const file = files.getFile(filePath);
      const finalServiceFileContent = importStatement += file;

      files.writeFile(filePath, finalServiceFileContent);

      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
}
