import Text from 'components/DarkMode/Text'
import Main from 'components/Layout/Main'
import React, { useState, useCallback } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useDropzone } from 'react-dropzone'

const App: React.FC = () => {
  const [sql, setSql] = useState('')

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
            result.push(str.replace(/"/g, ''))
            return
          }
          str.split('\n').map((s) => {
            result.push(s)
          })
        })
        const arr = result
        let sql = ''
        for (;;) {
          if (arr.length <= 0) {
            break
          }
          const insert = arr.splice(0, headers.split(',').length)
          const values = insert.join(`", "`)
          sql += `INSERT INTO ${table}(${headers}) VALUES("${values}");\n`
        }
        setSql(sql)
      }
      reader.readAsText(file)
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <Main class="pb-10 pt-16 px-2 bg-top">
        <div {...getRootProps()}>
          <div className="container mx-auto h-64">
            <div className="wrapper flex flex-col justify-center w-full">
              <Text>File</Text>
              <input {...getInputProps()} />
              {isDragActive ? (
                <div className="border-light-blue-500 flex items-center justify-center w-full h-64 border-4 border-dashed">
                  <Text>Drop the files here ...</Text>
                </div>
              ) : (
                <div className="border-light-blue-500 flex items-center justify-center w-full h-64 border-4 border-dashed">
                  <Text>Drag and drop your file</Text>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container mt-16 mx-auto">
          <label className="block">
            <Text>SQL</Text>
            <CopyToClipboard text={sql} onCopy={() => alert('Copyed')}>
              <textarea
                className="form-textarea block mt-1 w-full cursor-pointer"
                rows={25}
                placeholder="ここに変換されたSQL文が表示されます。クリックでコピーできます。"
                value={sql}
                readOnly
              ></textarea>
            </CopyToClipboard>
          </label>
        </div>
      </Main>
    </>
  )
}

export default App
