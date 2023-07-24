import md5 from 'spark-md5'
import axios from 'axios'

export const useChunkUpload = () => {
  const chunkSize = 1024 * 1024 * 1 // 2M
  const upload = (file: File, url: string, fileinfo: string) => {
    const chunkCount = Math.ceil(file.size / chunkSize)
    const spark = new md5.ArrayBuffer()
    const fileReader = new FileReader()
    let currentChunk = 0
    const loadNext = () => {
      const start = currentChunk * chunkSize
      const end = Math.min(file.size, start + chunkSize)
      fileReader.readAsArrayBuffer(file.slice(start, end))
    }
    fileReader.onload = (e: any) => {
      spark.append(e.target.result)
      currentChunk++
      if (currentChunk < chunkCount) {
        loadNext()
      } else {
        const md5 = spark.end()
        const formData = new FormData()
        formData.append('file', file)
        formData.append('md5', md5)
        formData.append('chunkCount', chunkCount.toString())
        formData.append('fileName', file.name)
        formData.append('fileSize', file.size.toString())
        formData.append('fileType', file.type)
        formData.append('fileinfo', fileinfo)
        axios
          .post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => {
            console.log(res)
          })
      }
    }
    loadNext()
  }
  return { upload }
}
