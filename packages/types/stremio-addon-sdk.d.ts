declare module 'stremio-addon-sdk' {
  export class addonBuilder {
    constructor(manifest: any);
    defineMetaHandler(handler: (args: any) => Promise<any>): addonBuilder;
    defineCatalogHandler(handler: (args: any) => Promise<any>): addonBuilder;
    defineResourceHandler(handler: (args: any) => Promise<any>): addonBuilder;
    defineStreamHandler(handler: (args: any) => Promise<any>): addonBuilder;
    defineSubtitlesHandler(handler: (args: any) => Promise<any>): addonBuilder;
    getInterface(): any;
    run(options?: { port?: number; cacheMaxAge?: number }): void;
  }

  export class serveHTTP {
    constructor(addonInterface: any, options?: { port?: number; cacheMaxAge?: number });
    middleware(): any;
    run(): void;
  }

  export function getRouter(addonInterface: any, options?: { cacheMaxAge?: number }): any;
}
