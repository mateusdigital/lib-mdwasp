import { sep } from "path";
import { Arr } from "./Arr";
import { Assert } from "./Assert";

//
//
//

// -----------------------------------------------------------------------------
export class PathUtils {
  // ---------------------------------------------------------------------------
  static JoinPath(
    base: string,
    ...paths: string[]
  ) {
    Assert(base, "Base path can't be null");
    Assert(paths.length > 0, "Paths can't be empty");

    const joined = base + "/" + paths.join("/");
    return joined;
  }

  // ---------------------------------------------------------------------------
  static GetExtension(path: string): string {
    return path.split('.').pop() || "";
  }


  // ---------------------------------------------------------------------------
  static GetDirname(
    p: string,
    options: { pathSeparator?: string, forceForward?: boolean }
  ) {
    //
    if (options.forceForward) {
      p = PathUtils.ForwardSlash(p);
    }

    const separator = options.pathSeparator || "/";
    const comps = p.split(separator);
    if (comps.length < 2) {
      return p;
    }

    comps.pop();

    p = comps.join(separator);
    return p;
  }

  // ---------------------------------------------------------------------------
  static GetFilename(p: string,
    options: { pathSeparator: string, forceForward: boolean } = {
      pathSeparator: "/",
      forceForward: false
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

  // ---------------------------------------------------------------------------
  static PathToUrl(path: string): string {
    if (typeof window === "undefined") {
      return pathToFileURL(path).toString();
    } else {
      return new URL(path, window.location.origin).toString();
    }
  }

  // ---------------------------------------------------------------------------
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