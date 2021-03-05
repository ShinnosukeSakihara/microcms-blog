import Main from 'components/Layout/Main'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const App: React.FC = () => {
  const onDrop = useCallback(async (acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader()
      reader.onload = function (e) {
        const text = e.target.result
        const table = file.path.split('.')[0]

        if (text instanceof ArrayBuffer) {
          return
        }
        const headers = text.split(/\r\n|\r|\n/)[1]
        const contents = text.match(/((.*?)(\r\n|\r|\n)){2}([\s\S]*)/)[4] // 2行目以降を抽出
        const data = contents.split(',')
        const result = []
        data.map((str) => {
          if (str[0] === '"') {
            result.push(str.replace('"', ''))
            return
          }
          str.split('\n').map((s) => {
            result.push(s)
          })
        })
        const arr = result
        for (;;) {
          if (arr.length <= 0) {
            break
          }
          const insert = arr.splice(0, headers.split(',').length)
          const values = insert.join(`","`)
          const sql = `INSERT INTO ${table}(${headers}) VALUES("${values}");\n`
          console.log(sql)
        }
      }
      reader.readAsText(file)
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <Main class="px-2 bg-top">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="container mx-auto pt-14 h-64">
            <div className="wrapper flex justify-center">
              {isDragActive ? (
                <div className="border-light-blue-500 flex items-center justify-center w-96 h-64 border-4 border-dashed">
                  <p>Drop the files here ...</p>
                </div>
              ) : (
                <div className="border-light-blue-500 flex items-center justify-center w-96 h-64 border-4 border-dashed">
                  <p>Drag and drop your file</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}

export default App
