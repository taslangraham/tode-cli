import * as fs from "fs";

export function isValidProjectName(name: string) {
    //
}

/**
 * Returns a lower kebab-case representation of the name passed to a feature
 * @param arg - Name given to feature.  Example the name given to a generated projected
 */
export function formatFeatureName(name: string) {
    return name.split(" ").join("-").toLocaleLowerCase();
}

export function isDirectoryExist(path: string) {
    return (fs.existsSync(path));
}

