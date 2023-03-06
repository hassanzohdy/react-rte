import { InputBuilder } from "@mongez/moonlight";
import { RichTextEditor } from "./RichTextEditor";

export function richTextInput(name: string) {
  return new InputBuilder(name).component(RichTextEditor);
}
