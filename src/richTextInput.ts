import { InputBuilder } from "@mongez/moonlight";
import { RichTextEditor } from "./RichTextEditor";

export class RichTextInput extends InputBuilder {
  /**
   * Set component height
   */
  height(height: number) {
    this.componentProps.height = height;

    return this;
  }
}

export function richTextInput(name: string) {
  return new RichTextInput(name).component(RichTextEditor);
}
