import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function MyEditor(props) {
  console.log("props", props);
  const { data, changed } = props
  const [text, setText] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  useEffect(() => {
    setText(data)
  }, [data])

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link'
  ];

  const handleTextChange = (value) => {
    setText(value);
    changed(value)
  };

  return (
    <div>
      <ReactQuill
        value={text}
        onChange={handleTextChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default MyEditor;
