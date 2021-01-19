import '@curveball/core';

declare module '@curveball/core' {

  interface BaseContext {
    params: Record<string, string>;
  }
  interface Context {
    params: Record<string, string>;
  }

}
