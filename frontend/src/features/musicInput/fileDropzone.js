//@flow
import React, {useCallback, useContext} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from "axios";


type FileDropzoneProps = {
  fileFilters: Array<string>,
  onDropFile: (string, ArrayBuffer) => void,
}

const FileDropzone = (props: FileDropzoneProps) => {
  const { fileFilters, onDropFile } = props;
  const onDrop = useCallback(acceptedFiles => {
    console.log("on drop files: ", acceptedFiles);

    //only accept one file
    const file = acceptedFiles[0];
    if (fileFilters.findIndex(filter => file.name.endsWith(filter)) < 0) {
      return;
    }

    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      onDropFile && onDropFile(file.name, reader.result);
    }
    reader.readAsArrayBuffer(file);
  }, [fileFilters, onDropFile]);

  const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDrop});
  let acceptedFileName = null;
  if (acceptedFiles.length > 0) {
    acceptedFileName = acceptedFiles[0].name;
    if (fileFilters.findIndex(filter => acceptedFileName.endsWith(filter)) < 0) {
      acceptedFileName = null;
    }
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p style={{color: '#A9A9A9'}}>Drop the file here ...</p> :
          <p style={{color: `${acceptedFileName? 'white' : 'grey'}`}}>
            {"Drag 'n drop your file here! ...or click to upload" || 'File load success!  ('+acceptedFileName+')'}
          </p>
      }
    </div>
  )
}

export default FileDropzone;