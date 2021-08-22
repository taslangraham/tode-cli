import { Command, flags } from '@oclif/command';
import * as chalk from 'chalk';
import cli from 'cli-ux'
import * as  mkdirp from 'mkdirp';
import { exec } from 'shelljs';

import {
  copyFile,
  getProjectRoot,
  getTemplateDriver,
} from '../../libs';
import { Driver } from '../../types/driver';

/**
 * Command to implement JWT based authentication into an
 * existing tode project
 */
export default class Auth extends Command {
  public static description = 'add authentication';
  public static flags = {
    help: flags.help({ char: 'h' }),
  };

  public static aliases = ['aa'];
  private driver: Driver = getTemplateDriver(`auth`);

  public async run() {
    const { driver } = this;
    // Copy each file defined in the files section of the driver
    for (const file of driver.files) {
      // create folder
      mkdirp.sync(file.destination);
      // Store file there
      const copyResult = copyFile(`${getProjectRoot()}${file.source}`, file.destination);

      if (copyResult.stderr && copyResult.code !== 0) {
        throw new Error(`Failed to create file\n${copyResult.stderr}`);
      }

      this.log(`${chalk.green(`Added - ${chalk.yellow(`${file.destination.replace('src/', '')}`)}`)}`);
    }


    // Install dependecies
    const dependecies = driver.dependencies;
    const devDependencies = driver.devDependencies;
    const totalDependencies = dependecies.length + devDependencies.length;
    let current = 0;

    // start the spinner
    dependecies.forEach((d) => {
      current += 1;
      cli.action.start(`Installing Dependencies ${current}/${totalDependencies}`);
      exec(`npm i ${d} --save`, { silent: true });
    });

    devDependencies.forEach((d) => {
      current += 1;
      cli.action.start(`Installing Dependencies ${current}/${totalDependencies}`);
      exec(`npm i ${d}`, { silent: true });
    });
    cli.action.stop('Completed');
  }

  public async catch(error: Error) {
    this.error(chalk.red(error));
  }
}
