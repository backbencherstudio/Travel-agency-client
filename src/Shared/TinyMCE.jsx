
import { Editor } from '@tinymce/tinymce-react';

const TinyMCE = ({ value, onChange, height, plugins, toolbar }) => {
  return (
    <Editor
      apiKey="87cg1pufq9d14fzlappe5kgmjxsm6u6zsgwvxigogwe80ogu"
      value={value}
      onEditorChange={onChange}
      init={{
        height: height || 500, 
        menubar: true, 
        plugins: plugins || [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | fontselect fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | blockquote | link image | code | insertdatetime media | forecolor backcolor | removeformat | fullscreen | preview', 
      }}
    />
  );
};

export default TinyMCE;
