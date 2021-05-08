import { memo, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default memo(function SermonContentEditor({
  value,
  onChange,
  onBlur,
}: {
  value: string;
  onChange: () => void;
  onBlur: (v: string) => void;
}) {
  const editorRef = useRef<any>();
  return (
    <Editor
      apiKey="yr0otmzf1ejt4f56lpqduov75d7rimuedtw5uneuy952rkk1"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={value}
      onChange={onChange}
      onBlur={() => onBlur(editorRef.current.getContent())}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount searchreplace",
        ],
        toolbar:
          "undo redo searchreplace | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
});
