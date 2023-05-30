import {
  readJsonFileSync,
  writeJsonFile,
  existsSync,
  readJsonFile,
} from "./operationFile";

export async function pushReplaceRule(
  bookname: string,
  source: string,
  replace: string = ""
) {
  const path = `./static/bookshelf/${bookname}/replaceReg.json`;
  if (!existsSync(path)) {
    await writeJsonFile(path, []);
  }

  let replaceRegList = await readReplaceRule(bookname);

  if (!replaceRegList.some((val: any) => val.source === source)) {
    console.log("push", source, replace);

    replaceRegList.push({ source, replace });
  } else {
    console.log("有此元素");
  }

  console.log(replaceRegList);

  await writeJsonFile(path, replaceRegList);
}

export async function readReplaceRule(bookname: string) {
  const path = `./static/bookshelf/${bookname}/replaceReg.json`;
  if (!existsSync(path)) {
    await writeJsonFile(path, []);
    return [{ source: "无替换净化规则", replace: "" }];
  }

  return await readJsonFile(path);
}

export function removeReg(bookname: string, source: string) {
  const path = `./static/bookshelf/${bookname}/replaceReg.json`;
  if (existsSync(path)) {
    const replaceRegList = readJsonFileSync(path);
    let resultRegList = replaceRegList.filter(
      (item: any) => item.source !== source
    );
    writeJsonFile(path, resultRegList);
  }
}

export async function replceContentByRegSource(
  bookname: string,
  content: string
) {
  const path = `./static/bookshelf/${bookname}/replaceReg.json`;
  if (existsSync(path)) {
    const replaceRegList: [] = await readReplaceRule(bookname);
    let result = content;

    replaceRegList.map((item: any) => {
      result = result.replace(new RegExp(item.source, "gm"), item.replace);
    });

    return result;
  }

  return content;
}

// export async function _pushReplaceRule(
//   bookname: string,
//   source: string,
//   replace: string = "",
//   index: number
// ) {
//   const path = `./static/bookshelf/${bookname}/replaceReg.json`;
//   if (!existsSync(path)) {
//     await writeJsonFile(path, []);
//   }

//   let replaceRegList = await readReplaceRule(bookname);
//   console.log(replaceRegList, index);
//   console.log("push", source, replace);

//   if (!replaceRegList.some((val: any) => val.source === source)) {
//     replaceRegList.push({ source, replace });

//     await writeJsonFile(path, replaceRegList);
//   } else {
//     console.log("有此元素");
//   }
// }
