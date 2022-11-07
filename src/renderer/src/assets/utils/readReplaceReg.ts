import { readJsonFileSync, writeJsonFile, existsSync } from "./operationFile";

export async function pushReplaceRule(
  bookname: string,
  source: string,
  replace: string = ""
) {
  const path = `./static/bookshelf/${bookname}/replaceReg.json`;
  if (!existsSync(path)) {
    await writeJsonFile(path, []);
  }

  const replaceRegList = readJsonFileSync(path);

  if (!replaceRegList.some((val: any) => val.source === source)) {
    replaceRegList.push({ source, replace });
  } else {
    console.log("有此元素");
  }

  writeJsonFile(path, replaceRegList);
}

export function readReplaceRule(bookname: string) {
  const path = `./static/bookshelf/${bookname}/replaceReg.json`;
  if (!existsSync(path)) {
    return [{ source: "无替换净化规则", replace: "" }];
  }

  return readJsonFileSync(path);
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

export function replceContentByRegSource(bookname: string, content: string) {
  const path = `./static/bookshelf/${bookname}/replaceReg.json`;
  if (existsSync(path)) {
    const replaceRegList: [] = readReplaceRule(bookname);
    let result = content;

    replaceRegList.map((item: any) => {
      result = result.replace(new RegExp(item.source, "gm"), item.replace);
    });

    return result;
  }

  return content;
}
