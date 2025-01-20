import React, { useEffect, useRef } from "react";
import { BiBold, BiItalic, BiUnderline, BiListUl, BiListOl } from "react-icons/bi";
import "./TextEditor.css"; // Import the CSS file

interface TextEditorProps {
  value: string;
  onChange: (text: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.value = value; // Update the textarea value whenever the prop changes
    }
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value); // Update the parent component state
  };

  const handleBold = () => {
    document.execCommand("bold"); // Apply bold formatting
  };

  const handleItalic = () => {
    document.execCommand("italic"); // Apply italic formatting
  };

  const handleUnderline = () => {
    document.execCommand("underline"); // Apply underline formatting
  };

  const handleListUl = () => {
    document.execCommand("insertUnorderedList"); // Insert unordered list
  };

  const handleListOl = () => {
    document.execCommand("insertOrderedList"); // Insert ordered list
  };

  return (
    <div className="text-editor-container">
      <textarea
        ref={editorRef}
        className="text-editor"
        value={value}
        onChange={handleInputChange} // Handle textarea input changes
        placeholder="Description"
        maxLength={300}
      ></textarea>

      <div className="bottom-bar">
        <div className="toolbar">
          <button className="toolbar-button" onClick={handleBold} title="Bold">
            <BiBold size={18} />
          </button>
          <button className="toolbar-button" onClick={handleItalic} title="Italic">
            <BiItalic size={18} />
          </button>
          <button className="toolbar-button" onClick={handleUnderline} title="Underline">
            <BiUnderline size={18} />
          </button>
          <button className="toolbar-button" onClick={handleListUl} title="Unordered List">
            <BiListUl size={18} />
          </button>
          <button className="toolbar-button" onClick={handleListOl} title="Ordered List">
            <BiListOl size={18} />
          </button>
        </div>

        <div className="character-count">{value.length}/300 characters</div>
      </div>
    </div>
  );
};

export default TextEditor;
