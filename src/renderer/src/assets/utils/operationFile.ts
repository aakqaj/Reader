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
          resolve("创建失败");
        } else {
          resolve("创建成功");
        }
      });
    } else {
      resolve("文件夹存在");
    }
  });
}

export async function deleteDir(path: string) {
  return new Promise(async (resolve, reject) => {
    if (await exists(path)) {
      rimraf(path, (err: any) => {
        if (err) {
          resolve("删除失败");
        }
        resolve("删除成功");
      });
    } else {
      resolve("文件夹不存在");
    }
  });
}

export function clearDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      //判断是否是文件夹
      if (fs.statSync(curPath).isDirectory()) {
        // clearDir(curPath); //递归删除文件夹
      } else {
        //是文件的话说明是最后一层不需要递归
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}
