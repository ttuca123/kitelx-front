import { RouteTypes, ScullyConfig } from '@scullyio/scully';

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "material",
  outDir: './dist/pages/',
  routes: {
    '/login': {
      type: 'json'
      
  }
  }
};