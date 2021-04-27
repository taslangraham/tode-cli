import { Command, flags } from '@oclif/command';
import chalk = require('chalk');
import * as rimraf from 'rimraf';
import * as shell from 'shelljs';
import { starterTemplateRepo, SUCCESS_EXIT_CODE } from '../../config';
import { formatFeatureName, isDirectoryExist } from '../../libs';
// tslint:disable-next-line: no-console
const Log = console.log;

export default class CreateProject extends Command {
  public static strict = true;
  public static examples = ['tode create-project myNewProject'];
  public static flags = {
    help: flags.help({ char: 'h' }),
  };

  public static description = 'Scaffolds a fresh Tode project';
  public static args = [{
    name: 'project name',
    description: 'Name of project to create',
    required: true,
  }];

  public async run() {
    const { args } = this.parse(CreateProject);
    const projectName = formatFeatureName(args['project name']);

    if (isDirectoryExist(projectName)) {
      throw new Error(chalk.red(`There's already a Project with the name '${projectName}'`));
    }

    Log(chalk.green(`Generating Project - ${chalk.yellow(projectName)} ....`));

    const creation = await shell.exec(`git clone ${starterTemplateRepo} ${projectName}`,
      {
        silent: false,
        timeout: 1500,
      });

    if (creation.code !== SUCCESS_EXIT_CODE) {
      throw new Error('Failed to create project. Please ensure you have an internet connection.');
    }

    rimraf.sync(`${projectName}/.git`);

    Log(chalk.green(`Installing dependencies ....`));
    await shell.exec(`cd ${projectName} && npm i`, { silent: false });

    Log(chalk.green(`Project generated successfully`));
    Log(chalk.green('-------------------------------'));
    Log(`run 'cd ${chalk.yellow(projectName)}' to enter project folder`);

  }

  public async catch(error: Error) {
    this.error(error);
  }
}
