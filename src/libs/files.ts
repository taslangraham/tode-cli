import * as fs from 'fs';
import * as pathjs from 'path';
import * as shell from 'shelljs';
import { OPTION_RECURSIVE, SUCCESS_EXIT_CODE } from '../config';
import { UTF8 } from '../constants/variables';
import { rootDir } from '../settings';
import { Driver } from '../types/driver';
import { FileOperationRespose } from '../types/files';



/**
 * Returns the driver file of a template
 * @param templateName Name of template folder
 */
export function getLastFileInFolder(folderPath: string) {
  // return require(`${getProjectRoot()}folderPath`);

  const files = orderRecentFiles(folderPath);
  return files.length > 0 ? files[0] : undefined;
}

function orderRecentFiles(dir: string) {
  return fs.readdirSync(dir)
    .filter((file) => fs.lstatSync(pathjs.join(dir, file)).isFile())
    .map((file) => ({ file, mtime: fs.lstatSync(pathjs.join(dir, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
}

/**
 * reates a Folder at the given path
 * @param path Path to create Folder
 * @param overwrite Replace folder and its contents if folder already exists
 */
export function createFolder(path: string, overwrite = false) {
  const result = {} as FileOperationRespose;
  let isAlreadyExist = isExist(path);

  if (isAlreadyExist && overwrite) {
    // Delete existing folder
    shell.exec(`rm -rf ${path}`);
    isAlreadyExist = false;
  }

  const operation = shell.mkdir(path);
  const success = operation.code === SUCCESS_EXIT_CODE;
  result.success = success;
  result.message = success ? operation.stdout : operation.stderr;

  return result;
}

export function getRootDir() {
  return rootDir;
}

// TODO Update this method to return the files resposne type
/**
 * Copies files from one location to another
 * @param source source files/folders
 * @param destination destination path
 * @param options
 * Available options
 *              `-f`: force (default behavior)
 *               `-n`: no-clobber
 *              `-u`: only copy if source is newer than dest
 *              `-r`, `-R`: recursive
 *              `-L`: follow symlinks
 *              `-P`: don't follow symlinks
 */
export function copyFile(source: string, destination: string, options = OPTION_RECURSIVE) {
  return shell.cp(options, source, destination);
}

/**
 * Determines if a file or folder exists
 * @param path Path to check for
 */
export function isExist(path: string) {
  return fs.existsSync(path);
}

export function getFile(path: string) {
  return fs.readFileSync(path, UTF8);
}

/**
 * Reads in a file and replace all occurrence of a substring within the given string
 * @param filePath filePath Path of the file to be updated
 * @param pattern pattern String pattern to look for and replace
 * @param newString aram newString String to replace matched patterns with
 */
export function replaceFileSubstring(filePath: string, pattern: string | RegExp, newString: string) {
  const result = {} as FileOperationRespose;

  try {
    const updatedFileContents = fs.readFileSync(filePath, UTF8)
      .replace(pattern, newString);
    result.success = true;

    fs.writeFileSync(filePath, updatedFileContents, UTF8);
  } catch (error) {
    result.success = false;
  }

  return result;
}

/**
 * Reads in a file and updates its content with the given string
 * @param filePath filePath Path of the file to be updated
 * @param content file content
 */
export function writeFile(filePath: string, content: string) {
  const result = {} as FileOperationRespose;

  try {
    fs.writeFileSync(filePath, content, UTF8);
    result.success = true;
  } catch (error) {
    result.success = false;
  }

  return result;
}
/**
 * Accepts a string and converts it to PascalCase
 * @param rawName unformatted class name
 */
export function kebabToPascal(rawName: string) {
  const pascalCase = rawName
    .split('-')
    .map((word) => {
      const firstLetter = word[0];

      // Capitalize the first letter of each word and return it
      return word.replace(firstLetter, firstLetter.toLocaleUpperCase());
    })
    .join('');

  return pascalCase;
}

/**
 * Accepts a string and converts it to camelCase
 * @param rawString unformatted string
 */
export function kebabToCamelCase(rawString: string) {
  const stringParts = rawString.split('-');
  const firstWord = stringParts[0];

  const camelCase = firstWord + stringParts
    .slice(1)
    .map((word) => {
      const firstLetter = word[0];

      // Capitalize the first letter of each word and return it
      return word.replace(firstLetter, firstLetter.toLocaleUpperCase());
    })
    .join('');

  return camelCase;
}

/**
 * Description: determine if is root directory of rdvue project
 */
function isRootDirectory(location: string | null = null): boolean {
  let isRoot = false;
  try {
    let paths = [];
    let testLocation = location;
    if (location === null) {
      testLocation = process.cwd();
    }

    if (testLocation !== null) {
      paths = testLocation.split(pathjs.sep);
      if (paths.length > 0 && paths[1] === '') {
        isRoot = true;
      }
    }
  } catch (error) {
    // tslint:disable-next-line:no-console
    throw new Error('Error checking root directory');
  }

  return isRoot;
}

/**
 * Description: determine the root of the current project
 */
export function getProjectRoot() {
  const configFolderName = '.tode';
  const maxTraverse = 20;

  let currentPath = process.cwd();
  let currentTraverse = 0;
  let projectRoot = null;
  let back = './';

  while (true) {
    currentPath = pathjs.join(process.cwd(), back);
    back = pathjs.join(back, '../');
    currentTraverse += 1;

    if (isExist(pathjs.join(currentPath, configFolderName))) {
      projectRoot = currentPath;
      break;
    } else if (isRootDirectory(currentPath)) {
      projectRoot = null;
      break;
    } else if (currentTraverse > maxTraverse) {
      projectRoot = null;
      break;
    }
  }

  return projectRoot;
}

/**
 * Returns the driver file of a template
 * @param templateName Name of template folder
 */
export function getTemplateDriver(templateName: string) {
  return require(`${getProjectRoot()}.tode\\.template\\${templateName}\\driver.json`) as Driver;
}

export function appendFile(path: string, content: string) {
  fs.appendFileSync(path, content);
}
