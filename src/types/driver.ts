export interface Driver {
  sourceDir: string;
  destination: string;
  files: DriverFile[];
  dependencies: string[];
  devDependencies: string[];
  routes?: string[];
}

export interface DriverFile {
  name: string;
  source: string;
  destination: string;
}
