import { Command, flags } from '@oclif/command';
import * as chalk from 'chalk';
import rimraf = require('rimraf');
import {
  copyFile,
  createFolder,
  getRootDir,
  getTemplateDriver,
  isExist,
  kebabToCamelCase,
  kebabToPascal,
  replaceFileSubstring,
} from '../../libs';
import { Driver } from '../../types/driver';

const SERVICE_NAME = 'service_name';

export default class Service extends Command {
  public static description = 'adds a new service';
  public static strict = true;

  public static flags = {
    help: flags.help({ char: 'h' }),
  };

  public static aliases = ['as'];

  public static args = [{
    name: SERVICE_NAME,
    description: 'Name of service to create',
    required: true,
  }];

  public static examples = [`tode add:service ${SERVICE_NAME}`];
  private driver: Driver = getTemplateDriver('service');

  public async run() {
    const { driver } = this;
    const { args } = this.parse(Service);

    const serviceName = args[SERVICE_NAME] as string;
    const isServicesFolderExist = isExist(driver.destination);
    const destinationFolder = `${driver.destination}/${serviceName}`.toLocaleLowerCase();

    // Create the services folder if it does not exist
    if (!isServicesFolderExist) {
      createFolder(driver.destination);
    }

    // Create folder to house controller file
    const { success, message } = createFolder(destinationFolder);

    if (!success) {
      throw new Error(`Operation Failed - ${message}`);
    }

    // Copy each file defined the files section of the driver
    for (const { name } of driver.files) {

      const fileDestination = `${destinationFolder}/${name}`;

      const copyResult = copyFile(
        `${getRootDir()
        }/${driver.sourceDir}/${name}`,
        fileDestination);

      if (copyResult.stderr && copyResult.code !== 0) {
        throw new Error(`Failed to create Service \n${copyResult.stderr}`);
      }

      // look for kebabs defined in files and replace them with appropriate text (service name etc)
      const serviceNameReplacement = replaceFileSubstring(
        fileDestination,
        /ServiceName/g,
        kebabToCamelCase(serviceName),
      );

      const classNameReplacement = replaceFileSubstring(
        fileDestination,
        /ServiceClassName/g,
        `${kebabToPascal(serviceName)}Service`,
      );

      if (!(serviceNameReplacement.success && classNameReplacement.success)) {
        rimraf.sync(destinationFolder);
        throw new Error('Created service but failed to update its contents. \n Reverting changes!');
      }

      this.log(`${chalk.green(`Created service - ${chalk.yellow(`${serviceName}`)}`)}`);
    }
  }
}
