export interface Driver {
    sourceDir: string;
    destination: string;
    files: DriverFile[];
}

interface DriverFile {
    name: string;
    subFolderPath?: string;
}
