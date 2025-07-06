

// -----------------------------------------------------------------------------
export class Str {
  // -----------------------------------------------------------------------------
  static RemoveAccents(str: string) {
    let arr = str.split("");
    for(let i = 0; i < str.length; i++) {
      let c = str[i];
      if (c == "á" || c == "à" || c == "ã" || c == "â" || c == "ä") {
        arr[i] = "a";
      }
      else if (c == "é" || c == "è" || c == "ê" || c == "ë") {
        arr[i] = "e";
      }
      else if (c == "í" || c == "ì" || c == "î" || c == "ï") {
        arr[i] = "i";
      }
      else if (c == "ó" || c == "ò" || c == "õ" || c == "ô" || c == "ö") {
        arr[i] = "o";
      }
      else if (c == "ú" || c == "ù" || c == "û" || c == "ü") {
        arr[i] = "u";
      }
      else if (c == "ç") {
        arr[i] = "c";
      }
      else if (c == "ñ") {
        arr[i] = "n";
      }
      else if (c == "Á" || c == "À" || c == "Ã" || c == "Â" || c == "Ä") {
        arr[i] = "A";
      }
      else if (c == "É" || c == "È" || c == "Ê" || c == "Ë") {
        arr[i] = "E";
      }
      else if (c == "Í" || c == "Ì" || c == "Î" || c == "Ï") {

        arr[i] = "I";
      }
      else if (c == "Ó" || c == "Ò" || c == "Õ" || c == "Ô" || c == "Ö") {
        arr[i] = "O";
      }
      else if (c == "Ú" || c == "Ù" || c == "Û" || c == "Ü") {
        arr[i] = "U";
      }
      else if (c == "Ç") {
        arr[i] = "C";
      }
      else if (c == "Ñ") {
        arr[i] = "N";
      }
    }

    return arr.join("");
  }
}