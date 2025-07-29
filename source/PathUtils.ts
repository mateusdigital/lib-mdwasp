import { Arr } from "./Arr";

export class PathUtils {

  // ---------------------------------------------------------------------------
  static GetExtension(path: string): string {
    return path.split('.').pop() || "";
  }


  // ---------------------------------------------------------------------------
  static GetDirname(p: string,
    options: { pathSeparator: string, forceForward: boolean } = {
      pathSeparator: "/", forceForward: false
    }) {

    //
    if (options.forceForward) {
      p = PathUtils.ForwardSlash(p);
    }

    const comps = p.split(options.pathSeparator);
    if (comps.length < 2) {
      return p;
    }

    comps.pop();

    p = comps.join(options.pathSeparator);
    return p;
  }

  // ---------------------------------------------------------------------------
  static GetFilename(p: string,
    options: { pathSeparator: string, forceForward: boolean } = {
      pathSeparator: "/", forceForward: false
    }) {
    //
    if (options.forceForward) {
      p = PathUtils.ForwardSlash(p);
    }

    const comps = p.split(options.pathSeparator);
    if (comps.length < 2) {
      return p;
    }

    p = Arr.GetBack(comps);
    return p;
  }

  // ---------------------------------------------------------------------------
  static ForwardSlash(path: string) {
    return path.replaceAll("\\", "/");
  }

  // ---------------------------------------------------------------------------
  static BackSlash(path: string) {
    return path.replaceAll("/", "\\");
  }

  static PathToUrl(path: string): string {
    if (typeof window === "undefined") {
      return pathToFileURL(path).toString();
    } else {
      return new URL(path, window.location.origin).toString();
    }
  }

  static Join(...paths: string[]): string {
    if (paths.length === 0) {
      return "";
    }

    // Normalize paths
    paths = paths.map(p => PathUtils.ForwardSlash(p));

    // Join paths
    let joinedPath = paths.join("/");

    // Remove trailing slash if exists
    if (joinedPath.endsWith("/")) {
      joinedPath = joinedPath.slice(0, -1);
    }

    return joinedPath;
  }
}