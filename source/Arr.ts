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
//  File      : Arr.ts                                                        //
//  Project   : mdwasp                                                         //
//  Date      : 2025-03-24                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2025                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//----------------------------------------------------------------------------//

export class Arr
{
  // ---------------------------------------------------------------------------
  static Create(size: number, defaultValue = null)
  {
    let arr = new Array(size);
    arr.fill(defaultValue);
    return arr;
  }

  // ---------------------------------------------------------------------------
  static Create2D(h: number, w: number, defaultValue = null)
  {
    let arr: Array<any> = [];
    for (let i = 0; i < h; ++i) {
      arr.push([]);
      for (let j = 0; j < w; ++j) {
        arr[i].push(defaultValue);
      }
    }
    return arr;
  }

  //----------------------------------------------------------------------------
  static IsEmpty(arr: any) { return arr.length == 0; }

  //----------------------------------------------------------------------------
  static IndexOf(arr: any, func: any)
  {
    // @TODO(stdmatt): use js stuff...
    for (let i = 0; i < arr.length; ++i) {
      if (func(arr[i])) {
        return i;
      }
    }
    return -1;
  }

  //------------------------------------------------------------------------------
  static FindIf(arr: any, func: any)
  {
    let r = arr.find(func);
    return r;
  }

  //------------------------------------------------------------------------------
  static Contains(arr: any, func: any)
  {
    let r = arr.find(func);
    if (r == undefined) {
      return false;
    }
    return true;
  }

  //----------------------------------------------------------------------------
  static RemoveFront(arr: any) { arr = arr.splice(0, 1); }

  //----------------------------------------------------------------------------
  static RemoveLast(arr: any) { arr = arr.splice(arr.length - 1, 1); }

  //----------------------------------------------------------------------------
  static RemoveAt(arr: any, i: number) { arr = arr.splice(i, 1); }

  //----------------------------------------------------------------------------
  static Remove(arr: any, element: any)
  {
    arr = Arr.RemoveIf(arr, (other: any) => { return element == other; })
  }

  //------------------------------------------------------------------------------
  static RemoveIf(arr: any, pred: any)
  {
    for (let i = 0; i < arr.length; ++i) {
      if (pred(arr[i])) {
        Arr.RemoveAt(arr, i);
        return true;
      }
    }

    return false;
  }

  //----------------------------------------------------------------------------
  static PushFront(arr: any, e: any) { arr.unshift(e); }

  //----------------------------------------------------------------------------
  static PushBack(arr: any, e: any) { arr.push(e); }

  //----------------------------------------------------------------------------
  static PopBack(arr: any)
  {
    let e = Arr.GetBack(arr);
    arr   = arr.splice(arr.length - 1, 1);
    return e;
  }

  //----------------------------------------------------------------------------
  static PopFront(arr: any)
  {
    let e = Arr.GetFront(arr);
    arr   = arr.splice(0, 1);
    return e;
  }

  // ---------------------------------------------------------------------------
  static Get(arr: any, i: number)
  {
    if (i >= arr.length) {
      debugger;
    }

    if (i < 0) {
      i = (arr.length + i);
    }

    return arr[i];
  }

  // ---------------------------------------------------------------------------
  static GetBack(arr: any)
  {
    if (Arr.IsEmpty(arr)) {
      return null;
    }
    return arr[arr.length - 1];
  }

  // ---------------------------------------------------------------------------
  static GetFront(arr: any)
  {
    if (Arr.IsEmpty(arr)) {
      return null;
    }
    return arr[0];
  }
}
