import { Command, flags } from '@oclif/command';
import * as chalk from 'chalk';

export default class Add extends Command {
    public static description = 'add a new project module';

    public static flags = {
        help: flags.help({ name: 'help', char: 'h', hidden: false }),
    };

    public static args = [
        { name: 'controller', description: 'Adds a controller to the application', hidden: false },
        { name: 'model', description: 'adds a new Databse Model', hidden: false },
        { name: 'service', description: 'adds a new service', hidden: false },
        { name: 'resource', description: 'adds a complete resource (mode, controller, service', hidden: false },
        { name: 'auth', description: 'adds JWT authentication', hidden: false },
    ];

    public showHelp(): void {
        const commandId = Add.id;
        const commandArgs = Add.args;
        const commandFlags = Object.values(Add.flags);

        // parse argument config list
        const argsList = commandArgs
            .filter(arg => !arg.hidden)
            .map(arg => {
                const maxSpaces = 15;
                const numOfSpaces = maxSpaces - arg.name.length;

                return `\n\t${arg.name}${new Array(numOfSpaces + 1).join(' ')}- ${arg.description}`;
            });

        // parse option config list
        const optionList = commandFlags
            .filter(flag => !flag.hidden)
            .map(flag => {
                const maxSpaces = 8;
                const numOfSpaces = maxSpaces - flag.name.length;

                return `\n\t    --${flag.name} | -${flag.char}${new Array(numOfSpaces + 1).join(' ')}- ${flag.description}`;
            });

        this.log(`
        Usage:\nnpx ${chalk.blue('tode')} ${commandId}:<module>\n${argsList}

        Options:${optionList}
    `);
    }

    public run(): Promise<void> {
        this.showHelp();

        return Promise.resolve();
    }
}