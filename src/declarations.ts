import '@curveball/core';

declare module '@curveball/core' {

  interface Context {
    params: Record<string, string>;
    router: {
      matchedRoute: string;
    };
  }

}
