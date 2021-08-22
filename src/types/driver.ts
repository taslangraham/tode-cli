export interface Driver {
  sourceDir: string;
  destination: string;
  files: DriverFile[];
  dependencies: string[];
  devDependencies: string[];
}

interface DriverFile {
  name: string;
  source: string;
  destination: string;
}
