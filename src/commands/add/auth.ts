import { Command, flags } from '@oclif/command';
import * as chalk from 'chalk';
import cli from 'cli-ux';
import * as  mkdirp from 'mkdirp';
import { exec } from 'shelljs';

import {
  copyFile,
  getFile,
  getLastFileInFolder,
  getProjectRoot,
  getTemplateDriver,
  writeFile,
} from '../../libs';
import { Driver, DriverFile } from '../../types/driver';

/**
 * Command to implement JWT based authentication into an
 * existing tode project
 */
export default class Auth extends Command {
  public static description = 'adds JWT authentication';
  public static flags = {
    help: flags.help({ char: 'h' }),
  };

  public static aliases = ['aa'];
  private driver: Driver = getTemplateDriver(`auth`);

  public async run() {
    const { driver } = this;
    // Copy each file defined in the files section of the driver
    this.copyAuthFiles(driver.files);

    // Add Migration file
    cli.action.start(`Adding Migrations`);
    this.addMigration();
    cli.action.stop();

    // Install dependecies
    this.installDepencencies(driver.dependencies, driver.devDependencies);
  }

  public async catch(error: Error) {
    this.error(chalk.red(error));
  }

  /**
   * Create migrations for auth
   */
  private addMigration() {
    const USERS_TABLE_MIGRATION = 'knex migrate:make user x ts';
    const MIGRATION_FOLDER = `src/data-access/migrations/`;
    // Get contents that should go into Migration for users table
    const userMigration = getFile(`${getProjectRoot()}.tode/.template/auth/migration.ts`);
    // Create new(partially empty) migration file
    exec(USERS_TABLE_MIGRATION, { silent: false });

    // get created migration file
    const createdMigrationName = getLastFileInFolder(getProjectRoot() + MIGRATION_FOLDER)!.file;
    const createdMigrationPath = `${getProjectRoot()}${MIGRATION_FOLDER}${createdMigrationName}`;
    const { success } = writeFile(createdMigrationPath, userMigration);

    if (!success) {
      throw new Error('Failed to Create migration file');
    }
  }

  /**
   *
   * @param dependencies
   * @param devDependencies
   */
  private installDepencencies(dependencies: string[], devDependencies: string[]) {
    const totalDependencies = dependencies.length + devDependencies.length;
    let current = 0;

    // start the spinner
    dependencies.forEach((d) => {
      current += 1;
      cli.action.start(`Installing Dependencies ${current}/${totalDependencies}`);
      exec(`npm i ${d} --save`, { silent: true });
    });

    devDependencies.forEach((d) => {
      current += 1;
      cli.action.start(`Installing Dependencies ${current}/${totalDependencies}`);
      exec(`npm i ${d}`, { silent: true });
    });

    cli.action.stop();
  }

  private copyAuthFiles(files: DriverFile[]) {
    for (const file of files) {
      // create folder
      mkdirp.sync(file.destination);
      // Store file there
      const copyResult = copyFile(`${getProjectRoot()}${file.source}`, file.destination);

      if (copyResult.stderr && copyResult.code !== 0) {
        throw new Error(`Failed to create file\n${copyResult.stderr}`);
      }

      this.log(`${chalk.green(`Added - ${chalk.yellow(`${file.destination.replace('src/', '')}`)}`)}`);
    }
  }
}
