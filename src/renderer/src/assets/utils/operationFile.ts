const fs = require("fs");
const rimraf = require("rimraf");

export async function readFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err: object, data: object) => {
      if (err) {
        reject(err);
      }
      resolve(data?.toString());
    });
  });
}

export function readJsonFileSync(path: string) {
  return JSON.parse(fs.readFileSync(path).toString());
}

export async function readJsonFile(path: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err: object, data: object) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data?.toString()));
    });
  });
}

export async function writeJsonFile(path: string, obj: {}) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(obj), (err: object, data: object) => {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
}

export async function writeFile(path: string, data: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err: object) => {
      if (err) {
        reject(err);
      }
      resolve("data write " + path + "; success");
    });
  });
}

export async function appendWriteFile(
  path: string,
  data: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, (err: object) => {
      if (err) {
        reject(err);
      }
      resolve("data write " + path + "; success");
    });
  });
}

export function existsSync(path: string) {
  return fs.existsSync(path);
}

export async function exists(path: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.exists(path, (yes: boolean) => {
      if (yes) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

export async function createDir(path: string) {
  return new Promise(async (resolve, reject) => {
    if (!(await exists(path))) {
      fs.mkdir(path, (err: any) => {
        if (err) {
          resolve("????????????");
        } else {
          resolve("????????????");
        }
      });
    } else {
      resolve("???????????????");
    }
  });
}

export async function deleteDir(path: string) {
  return new Promise(async (resolve, reject) => {
    if (await exists(path)) {
      rimraf(path, (err: any) => {
        if (err) {
          resolve("????????????");
        }
        resolve("????????????");
      });
    } else {
      resolve("??????????????????");
    }
  });
}

export function clearDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      //????????????????????????
      if (fs.statSync(curPath).isDirectory()) {
        // clearDir(curPath); //?????????????????????
      } else {
        //???????????????????????????????????????????????????
        fs.unlinkSync(curPath); //????????????
      }
    });
    fs.rmdirSync(path);
  }
}
