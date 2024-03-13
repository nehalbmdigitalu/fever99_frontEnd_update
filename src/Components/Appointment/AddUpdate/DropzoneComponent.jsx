import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { fileUpload } from '../dependiencies/action';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function DropzoneComponent(props) {
  const dispatch = useDispatch();
  const {uploadedFile} = props
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
      
    })));

    // console.log('acceptedFiles',acceptedFiles)

    const file = new FormData();
    file.append('file', acceptedFiles[0])

    dispatch(fileUpload(file)).then(res => {
      
      const {status, data} = res
      if(status && data != undefined) {
        uploadedFile(data)
      }
    })


  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'document/pdf'
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const handleRemoveFile = (fileToRemove) => {
    // Filter out the file to be removed from the state
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);

    // Clean up the preview URL
    URL.revokeObjectURL(fileToRemove.preview);
  };

  const thumbs = files.map(file => (
    <div key={file.name}>
      <span >{file.name}</span> <i className='fa fa-times-circle' onClick={() => handleRemoveFile(file)}></i>
    </div>
  ));

  // clean up
  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
  
  return (
    <section style={{ padding:'0px' }}>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <div className='btn btn-sm btn-success'>Attach Files</div>
      </div>
      <aside>
        {thumbs}
      </aside>
    </section>
  )
}

export default DropzoneComponent;