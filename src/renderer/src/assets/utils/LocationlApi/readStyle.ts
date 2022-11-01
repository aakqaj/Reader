import { BookStyle } from "../../interface/Style";
import { readJsonFile, writeJsonFile } from "../operationFile";

const path = "./static/configs/Style.json";

export async function getFontSize() {
  let data: BookStyle = await readJsonFile(path);
  return { titleSize: data.Font.TitleSize, contentSize: data.Font.ContentSize };
}

export async function setFontSize(
  targetType: "TitleSize" | "ContentSize",
  size: number
) {
  let data: BookStyle = await readJsonFile(path);
  data.Font[targetType] = size;

  writeJsonFile(path, data);
}

export async function getThems() {
  let data: BookStyle = await readJsonFile(path);
  console.log(data.Thems);
}
