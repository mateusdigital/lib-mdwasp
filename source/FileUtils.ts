//----------------------------------------------------------------------------//
//                               *       +                                    //
//                         '                  |                               //
//                     ()    .-.,="``"=.    - o -                             //
//                           '=/_       \     |                               //
//                        *   |  '=._    |                                    //
//                             \     `=./`,        '                          //
//                          .   '=.__.=' `='      *                           //
//                 +                         +                                //
//                      O      *        '       .                             //
//                                                                            //
//  File      : FileUtils.ts                                                  //
//  Project   : mdwasp                                                        //
//  Date      : 2025-03-24                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2025                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//----------------------------------------------------------------------------//

// -----------------------------------------------------------------------------
import fs from "fs";
import path from "path";
// -----------------------------------------------------------------------------
import { Assert } from "./Assert";
import { Error_CriticalError } from "./ErrorUtils/Exceptions";
import { ThrowCriticalErrorIf } from "./ErrorUtils/ThrowIf";
import { PathUtils } from "./PathUtils";
import { pathToFileURL } from "url";
// -----------------------------------------------------------------------------


//
//
//

// -----------------------------------------------------------------------------
export class FileUtils {


  // ---------------------------------------------------------------------------
  static CopyDir(src: string, dest: string, options: { force: boolean } = { force: false }) {
    Assert(src, "Source path can't be null");
    Assert(dest, "Destination path can't be null");
    Assert(src !== dest, "Source and destination paths can't be the same");
    Assert(FileUtils.DirExists(src), `Source directory does not exist: ${src}`);

    if (!options.force) {
      Assert(!FileUtils.DirExists(dest), `Destination directory already exists: ${dest}`);
    }

    fs.cpSync(src, dest, {
      recursive: true,
      force: options.force
    });
  }

  // ---------------------------------------------------------------------------
  static GetCwd() {
    const cwd = process.cwd();
    return cwd;
  }

  // ---------------------------------------------------------------------------
  static PathToUrl(path: string): string {
    const url = pathToFileURL(path);
    return url.href.toString();
  }

  // ---------------------------------------------------------------------------
  static ListDir(dirPath: string,
    options: {
      recursive?: boolean;
      fullpaths?: boolean;
      returnFiles?: boolean
      returnDirs?: boolean
    }) {

    if (options.recursive === undefined) {
      options.recursive = false;
    }
    if (options.fullpaths === undefined) {
      options.fullpaths = false;
    }
    if (options.returnFiles === undefined) {
      options.returnFiles = true;
    }
    if (options.returnDirs === undefined) {
      options.returnDirs = true;
    }


    dirPath = path.resolve(dirPath);
    let files: any = fs.readdirSync(dirPath, { recursive: options.recursive });
    if (options.fullpaths) {
      files = files.map(_name => path.join(dirPath, _name as string));
    }


    if (!options.returnFiles || !options.returnDirs) {
      files = files.filter((file:string|any) => {
        if (options.returnFiles && options.returnDirs) {
          return true; // Return all files and directories
        }

        const stat = FileUtils.Stat(file);
        if (options.returnFiles && stat?.isFile()) {
          return true;
        }
        if (options.returnDirs && stat?.isDirectory()) {
          return true;
        }

        return false; // Should not happen, but just in case
      });
    }

    return files;
  }


  // ---------------------------------------------------------------------------
  static EnsurePath(dirPath: string,
    options: { isDir: boolean } = { isDir: false }) {
    const base_path = (options.isDir)
      ? dirPath
      : PathUtils.GetDirname(dirPath, { forceForward: true });
    fs.mkdirSync(base_path, { recursive: true });
  }

  // ---------------------------------------------------------------------------
  static ReadAllFile(filepath: string): string {
    Assert(filepath, "Filepath can't be null");
    ThrowCriticalErrorIf(!FileUtils.FileExists(filepath),
      `File not found: ${filepath}`);
    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      return content;
    }
    catch (error) {
      throw Error_CriticalError.FromCatchClauseError(error);
    }
  }

  // ---------------------------------------------------------------------------
  static WriteAllFile(filepath: string, content: string) {
    try {
      fs.writeFileSync(filepath, content, 'utf-8');
    }
    catch (error) {
      throw Error_CriticalError.FromCatchClauseError(error);
    }
  }

  // ---------------------------------------------------------------------------
  static Stat(filename: string) {
    Assert(filename, "Filename can't be null");
    try {
      const stat = fs.statSync(filename);
      return stat;
    } catch {
      return null;
    }
  }

  // ---------------------------------------------------------------------------
  static FileExists(path: string): boolean {
    const stat = this.Stat(path);
    return stat !== null && stat.isFile();
  }

  // ---------------------------------------------------------------------------
  static DirExists(path: string): boolean {
    const stat = this.Stat(path);
    return stat !== null && stat.isDirectory();
  }

  // ---------------------------------------------------------------------------
  static RemoveFile(fullpath: string) {
    if (FileUtils.FileExists(fullpath)) {
      fs.unlinkSync(fullpath);
    }
  }
}