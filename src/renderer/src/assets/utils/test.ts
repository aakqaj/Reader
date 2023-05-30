const fs = require('fs')

function clearFiles(path: string, fileName: string) {
  const rule = new RegExp(`${fileName}$`, 'gm')
    
  let files: string[] = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach((file: string, index) => {
      let curPath = path + '/' + file
      //判断是否是文件夹
      if (fs.statSync(curPath).isDirectory()) {
        clearFiles(curPath, fileName) //递归删除文件夹
      } else if (rule.test(file)) {
        //是文件的话说明是最后一层不需要递归
        console.log(curPath, typeof file)

        // fs.unlinkSync(curPath); //删除文件
      }
    })
  }
}

clearFiles('./api', 'html')
