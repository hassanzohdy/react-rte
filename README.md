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
import { useState } from 'react';

export function App() {
    const [value, setValue] = useState('');

    return (    
        <RichTextEditor
            value={value}
            onChange={setValue}
            placeholder="Type here..."
            label="Content"
            required
        />
    );
}
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

## Available Props

The following table shows all available props:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `''` | The value of the editor, used for controlled value |
| `onChange` | `(value: string) => void` | `() => {}` | The function to be called when the value changes |
| `placeholder` | `string` | `''` | The placeholder of the editor |
| `label` | `string` | `''` | The label of the editor |
| `required` | `boolean` | `false` | Whether the editor is required or not |
| `defaultValue` | `string` | `''` | The default value of the editor, used for uncontrolled value |
| `hint` | `string` | `''` | Display a hint message below the label |
| `toolbarProps` | `ToolbarProps` | `{}` | The props of the toolbar, see [Mantine ToolbarProps](https://mantine.dev/others/tiptap/#sticky-toolbar) |

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
