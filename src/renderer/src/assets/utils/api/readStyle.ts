import { BookStyle } from "../../interface/Style";
import { readJsonFile, writeJsonFile } from "../operationFile";

const path = "./static/configs/Style.json";

export async function getFontSize() {
  let data: BookStyle = await readJsonFile(path);
  return { titleSize: data.Font.TitleSize, contentSize: data.Font.ContentSize };
}

export async function getFontFamily() {
  let data: BookStyle = await readJsonFile(path);
  return {
    titleFamily: data.Font.TitleFontFamily,
    contentFamily: data.Font.ContentFontFamily,
  };
}

export async function getThem() {
  let data: BookStyle = await readJsonFile(path);
  return data.Them;
}

export async function getStyle(): Promise<BookStyle> {
  return await readJsonFile(path);
}

export function setStyle(data: BookStyle) {
  writeJsonFile(path, data);
}
