declare module 'path-match' {

  type Options = {
    sensitive: boolean,
    strict: boolean,
    end: boolean,
  };

  type Route = (path: string) => Match;
  type Match = (path: string) => false | { [s:string]: string };

  export default function pathMatch(options?: Options): Route; 

}
