import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { useOnce } from "@mongez/react-hooks";
import { IconLayoutGrid } from "@tabler/icons-react";

export function TableButton() {
  const { editor } = useRichTextEditorContext();
  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  useOnce(() => {
    if (!editor) return;

    // now we need to check if the user presses delete button when cursor is inside the table
    // if so, we need to remove the table

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        if (editor.isActive("table")) {
          editor.chain().focus().deleteTable().run();
        }
      }
    };

    editor.view.dom.addEventListener("keydown", handleKeyDown);

    return () => {
      editor.view.dom.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <RichTextEditor.Control
      onClick={addTable}
      aria-label="Insert Table"
      title="Insert Table">
      <IconLayoutGrid stroke={1.5} size="1rem" />
    </RichTextEditor.Control>
  );
}
