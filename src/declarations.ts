import '@curveball/kernel';

declare module '@curveball/kernel' {

  interface Context {
    params: Record<string, string>;
    router?: {
      matchedRoute: string;
    };
  }

}
