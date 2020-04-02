const zerorpc = require("zerorpc")
let client = new zerorpc.Client()
client.connect("tcp://127.0.0.1:4242")

let previewButton = document.querySelector('#previewButton')
let resultPreview = document.querySelector('#outputPreview')
let renameButton = document.querySelector('#renameButton')

renameButton.addEventListener('click', () => {
  invokeRemote('rename', true)
})

previewButton.addEventListener('click', () => {
  invokeRemote('previewRename')
})

function invokeRemote (methodName, updateInput=false) {
  if (!fileInput.textContent || !editor.doc.getValue()) {
    console.log('no input')
    return
  }
  client.invoke(methodName, fileInput.textContent, editor.doc.getValue(), (error, res) => {
    console.log(res)
    if(error) {
      console.error(error)
    } else {
      if (updateInput) {
        fileInput.textContent = res
      }
      resultPreview.textContent = res
    }
  })
}



let fileInput = document.getElementById('dropTarget');
const ignore = () => { return false }
fileInput.ondragover = ignore
fileInput.ondragleave = ignore
fileInput.ondragend = ignore

fileInput.ondrop = (e) => {
    e.preventDefault();

    fileInput.textContent = Array.from(e.dataTransfer.files).map(f => f.path).join('\n')
    return false;
};
