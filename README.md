# Rich Text Editor (Moonlight)

A powerful Rich Text Editor using Tiptap and Mantine, powered by Moonlight as well.

## Installation

`npm i @mongez/react-rte`

OR

`yarn add @mongez/react-rte`

OR

`pnpm install @mongez/react-rte`

The package requires peer dependencies, so you need to install them as well:

`yarn add @mongez/moonlight`

## Usage

```tsx
import { RichTextEditor } from '@mongez/react-rte';

<RichTextEditor
    value={value}
    onChange={setValue}
/>
```

The Component by default uses the following:

- Color Selector
- Text Highlighter
- Text Aligner
- Youtube Embedder
- Image Uploader (Drag & Drop)
- Link
- Font Style
- Lists

## Using as reactive form component

Simply use `richTextInput` function to get the Rich Text Editor as a form component.

```tsx
import { richTextInput } from '@mongez/react-rte';
import { createReactiveForm, textInput } from "@mongez/moonlight";

createReactiveForm(reactiveForm => {
    reactiveForm.setInputs([
        textInput('title'),
        richTextInput('content'),
    ]);
})
```
