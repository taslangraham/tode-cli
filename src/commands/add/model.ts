import { Command, flags } from '@oclif/command';
import * as chalk from 'chalk';
import rimraf = require('rimraf');
import {
  copyFile,
  createFolder,
  getProjectRoot,
  getRootDir,
  getTemplateDriver,
  isExist,
  kebabToPascal,
  replaceFileSubstring,
} from '../../libs';
import { Driver } from '../../types/driver';

const MODEL_NAME = 'model_name';

export default class Model extends Command {
  public static description = 'adds a new Databse Model';
  public static strict = true;

  public static flags = {
    help: flags.help({ char: 'h' }),
  };

  public static aliases = ['am'];

  public static args = [{
    name: MODEL_NAME,
    description: 'Name of model to create',
    required: true,
  }];

  public static examples = [`tode add:model ${MODEL_NAME}`];
  private driver: Driver = getTemplateDriver('model');

  public async run() {
    const { driver } = this;
    const { args } = this.parse(Model);

    const modelName = args[MODEL_NAME] as string;
    const isModelsFolderExist = isExist(driver.destination);
    const destinationFolder = `${driver.destination}/${modelName}`.toLocaleLowerCase();

    // Create the models folder if it does not exist
    if (!isModelsFolderExist) {
      createFolder(driver.destination);
    }

    //Create folder to house controller file
    const { success, message } = createFolder(destinationFolder);

    if (!success) {
      throw new Error(`Operation Failed - ${message}`);
    }

    // Copy each file defined the files section of the driver
    for (const { name } of driver.files) {
      // TODO create generic file copier method

      const fileDestination = `${destinationFolder}/${name}`;

      const copyResult = copyFile(
        `${getProjectRoot()
        }${driver.sourceDir}/${name}`,
        fileDestination);

      if (copyResult.stderr && copyResult.code !== 0) {
        throw new Error(`Failed to create Model \n${copyResult.stderr}`);
      }

      // look for kebabs defined in files and replace them with appropriate text (model name etc)
      const contentReplacement = replaceFileSubstring(fileDestination, 'ModelClassName',
        `${kebabToPascal(modelName)} `);

      if (!contentReplacement.success) {
        rimraf.sync(destinationFolder);
        throw new Error('Created model but failed to update its contents. \n Reverting changes!');
      }

      this.log(`${chalk.green(`Created model - ${chalk.yellow(`${modelName}`)}`)}`);
    }
  }
}













