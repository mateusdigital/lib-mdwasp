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
//  File      : GitUtils.ts                                                   //
//  Project   : mdwasp                                                         //
//  Date      : 2025-03-24                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2025                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//----------------------------------------------------------------------------//
import {execSync} from 'child_process';

// -----------------------------------------------------------------------------
export function GitGetCommitSHA()
{
  try {
    const sha = execSync('git rev-parse HEAD').toString().trim();
    return sha;
  }
  catch (error) {
    return null;
  }
}

// -----------------------------------------------------------------------------
export function GitGetTags()
{
  try {
    const cmd    = "git tag --sort=-version:refname";
    const result = execSync(cmd).toString().trim().split("\n");
    return result;
  }
  catch (error) {
    return null;
  }
}

// -----------------------------------------------------------------------------
export function GitGetLatestTag()
{
  const tags = GitGetTags();
  if (tags == null) {
    return null;
  }

  return tags[0];
}
