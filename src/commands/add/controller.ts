import { Command, flags } from '@oclif/command';
import * as chalk from 'chalk';
import rimraf = require('rimraf');
import {
  copyFile,
  createFolder,
  getRootDir,
  getTemplateDriver,
  isExist,
  replaceFileSubstring,
} from '../../libs';

import { Driver } from '../../types/driver';
const CONTROLLER_NAME = 'controller_name';

export default class Controller extends Command {
  public static strict = true;

  public static description = 'Adds a controller to the application';

  public static flags = {
    help: flags.help({ char: 'h' }),
    // force: { char: 'f' },
  };

  public static aliases = ['ac'];

  public static args = [{
    name: CONTROLLER_NAME,
    description: 'Name of controller to create',
    required: true,
  },
  // For future development
  {
    name: 'path',
    description: 'URL path that controller will be accessed at',
    required: false,
  },
  ];

  public static examples = ['tode add:controller <controller_name>'];

  private driver: Driver = getTemplateDriver('controller');

  public async run() {
    const { driver } = this;
    const { args } = this.parse(Controller);

    const controllerName = args[CONTROLLER_NAME] as string;
    const isControllersFolderExist = isExist(driver.destination);
    const destinationFolder = `${driver.destination}/${controllerName}`.toLocaleLowerCase();

    // Create the controllers folder if it does not exist
    if (!isControllersFolderExist) {
      createFolder(driver.destination);
    }

    //Create folder to house controller file
    const { success, message } = createFolder(destinationFolder);

    if (!success) {
      throw new Error(`Operation Failed - ${message}`);
    }

    console.clear();

    // Copy each file defined the files section of the driver
    for (const { name } of driver.files) {
      // TODO create generic file copier method

      const fileDestination = `${destinationFolder}/${name}`;

      const copyResult = copyFile(
        `${getRootDir()
        }/${driver.sourceDir}/${name}`,
        fileDestination);

      if (copyResult.stderr && copyResult.code !== 0) {
        throw new Error(`Failed to create Controller\n${copyResult.stderr}`);
      }

      // look for kebabs defined in files and replace them with appropriate text (controller name etc)
      const contentReplacement = replaceFileSubstring(fileDestination, /\$controller-name/g, controllerName);

      if (!contentReplacement.success) {
        rimraf.sync(fileDestination);
        throw new Error('Created controller but failed to update its contents. \n Reverting changes!');
      }

      this.log(`${chalk.green(`Created controller - ${chalk.yellow(`${controllerName}`)}`)}`);
    }

  }

  public async catch(error: Error) {
    this.error(chalk.red(error));
  }
}
