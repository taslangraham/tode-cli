import { Driver } from '@/types/driver';
import { Command, flags } from '@oclif/command';
import * as chalk from 'chalk';
import rimraf = require('rimraf');
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
  private serviceDriver: Driver = files.getTemplateDriver('service');

  public async run() {
    const { args } = this.parse(Resource);
    const resourceName = args[RESOURCE_NAME] as string;

    // Install each resource item
    try {
      await controller.run([resourceName]);
      await model.run([resourceName]);
      await service.run([resourceName]);
      const { success } = this.importModelToServiceFile(resourceName);

      if (success) {
        throw new Error(`Failed to import model [${resourceName}] into service [${resourceName}]`);
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
   * @param name service name
   */
  private importModelToServiceFile(serviceName: string) {
    try {
      // Add model import statement to service file
      const name = files.kebabToPascal(serviceName);
      let importStatement = `import { ${name}Model } from '../../models/${serviceName}';\n`;
      const serviceFile = files.getFile(`${this.serviceDriver.destination}/${serviceName}/index.ts`);
      const finalServiceFileContent = importStatement += serviceFile;

      files.writeFile(`${this.serviceDriver.destination}/${serviceName}/index.ts`,
        finalServiceFileContent);

      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
}
