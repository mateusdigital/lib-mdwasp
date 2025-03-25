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
//  Project   : mdweb                                                         //
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
import path from "path"
// -----------------------------------------------------------------------------
import {Assert} from "./Assert";
import {Error_CriticalError} from "./ErrorUtils/Exceptions";
import {ThrowCriticalErrorIf} from "./ErrorUtils/ThrowIf";

// -----------------------------------------------------------------------------
export class FileUtils
{
  // ---------------------------------------------------------------------------
  static Stat(filename: string) { return fs.statSync(filename); }

  // ---------------------------------------------------------------------------
  static EnsurePath(dirPath: string, isDir = false)
  {
    const base_path = path.dirname(dirPath);
    fs.mkdirSync(base_path, {recursive : true});
  }

  // ---------------------------------------------------------------------------
  static ReadAllFile(filepath: string): string
  {
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
  static WriteAllFile(filepath: string, content: string)
  {
    try {
      fs.writeFileSync(filepath, content, 'utf-8');
    }
    catch (error) {
      throw Error_CriticalError.FromCatchClauseError(error);
    }
  }

  // ---------------------------------------------------------------------------
  static FileExists(filepath: string): boolean { return fs.existsSync(filepath) }

  // ---------------------------------------------------------------------------
  static RemoveFile(fullpath: string)
  {
    if (FileUtils.FileExists(fullpath)) {
      fs.unlinkSync(fullpath);
    }
  }
}

// -----------------------------------------------------------------------------
export default FileUtils;
