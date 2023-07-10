import {
  ActionIcon,
  ColorPicker,
  ColorSwatch,
  Group,
  Popover,
  SimpleGrid,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import {
  IconCheck,
  IconCircleOff,
  IconColorPicker,
  IconPalette,
  IconX,
} from "@tabler/icons-react";
import { Extension } from "@tiptap/core";
import { useState } from "react";

export type ColorOptions = {
  types: string[];
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    backColor: {
      /**
       * Set the text background color
       */
      setBackColor: (color: string) => ReturnType;
      /**
       * Unset the text background color
       */
      unsetBackColor: () => ReturnType;
    };
  }
}

export const BackColor = Extension.create<ColorOptions>({
  name: "backColor",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          backgroundColor: {
            default: null,
            parseHTML: element =>
              element.style.backgroundColor.replace(/['"]+/g, ""),
            renderHTML: attributes => {
              if (!attributes.backgroundColor) {
                return {};
              }

              return {
                style: `background-color: ${attributes.backgroundColor}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setBackColor:
        color =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", {
              backgroundColor: color,
            })
            .run();
        },
      unsetBackColor:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { backgroundColor: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

const defaultColors = [
  "#25262b",
  "#868e96",
  "#fa5252",
  "#e64980",
  "#be4bdb",
  "#7950f2",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057",
  "#82c91e",
  "#fab005",
  "#fd7e14",
];

export type BackgroundColorButtonProps = {
  colors?: string[];
};

export function BackgroundColorButton({
  colors = defaultColors,
}: BackgroundColorButtonProps) {
  const { editor, labels, unstyled } = useRichTextEditorContext();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [state, setState] = useState<"palette" | "colorPicker">("palette");
  const currentColor =
    editor?.getAttributes("textStyle").backgroundColor || "#000";

  const handleChange = (value: string, shouldClose = true) => {
    editor.chain().focus().setBackColor(value).run();

    shouldClose && close();
  };

  const handleClear = () => {
    editor.chain().focus().unsetBackColor().run();
    close();
  };

  const controls = colors.map((color, index) => (
    <ColorSwatch
      key={index}
      component="button"
      color={color}
      onClick={() => handleChange(color)}
      size={26}
      radius="xs"
      sx={{ cursor: "pointer" }}
      title={labels.colorPickerColorLabel(color)}
      aria-label={labels.colorPickerColorLabel(color)}
      unstyled={unstyled}
    />
  ));

  return (
    <Popover
      opened={opened}
      withinPortal
      trapFocus
      onClose={close}
      unstyled={unstyled}>
      <Popover.Target>
        <RichTextEditor.Control
          style={{
            backgroundColor: currentColor,
          }}
          aria-label={labels.colorPickerControlLabel}
          title={labels.colorPickerControlLabel}
          onClick={toggle}>
          <ColorSwatch color="#FFF" size={14} unstyled={unstyled} />
        </RichTextEditor.Control>
      </Popover.Target>

      <Popover.Dropdown
        sx={theme => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        })}>
        {state === "palette" && (
          <SimpleGrid cols={7} spacing={2}>
            {controls}
          </SimpleGrid>
        )}

        {state === "colorPicker" && (
          <ColorPicker
            defaultValue={currentColor}
            onChange={value => handleChange(value, false)}
            unstyled={unstyled}
          />
        )}

        <Tooltip.Group closeDelay={200}>
          <Group position="right" spacing="xs" mt="sm">
            {state === "palette" && (
              <ActionIcon
                variant="default"
                onClick={close}
                unstyled={unstyled}
                title={labels.colorPickerCancel}
                aria-label={labels.colorPickerCancel}>
                <IconX stroke={1.5} size="1rem" />
              </ActionIcon>
            )}

            <ActionIcon
              variant="default"
              onClick={handleClear}
              unstyled={unstyled}
              title={labels.colorPickerClear}
              aria-label={labels.colorPickerClear}>
              <IconCircleOff stroke={1.5} size="1rem" />
            </ActionIcon>

            {state === "palette" ? (
              <ActionIcon
                variant="default"
                onClick={() => setState("colorPicker")}
                unstyled={unstyled}
                title={labels.colorPickerColorPicker}
                aria-label={labels.colorPickerColorPicker}>
                <IconColorPicker stroke={1.5} size="1rem" />
              </ActionIcon>
            ) : (
              <ActionIcon
                variant="default"
                onClick={() => setState("palette")}
                unstyled={unstyled}
                aria-label={labels.colorPickerPalette}
                title={labels.colorPickerPalette}>
                <IconPalette stroke={1.5} size="1rem" />
              </ActionIcon>
            )}

            {state === "colorPicker" && (
              <ActionIcon
                variant="default"
                onClick={close}
                unstyled={unstyled}
                title={labels.colorPickerSave}
                aria-label={labels.colorPickerSave}>
                <IconCheck stroke={1.5} size="1rem" />
              </ActionIcon>
            )}
          </Group>
        </Tooltip.Group>
      </Popover.Dropdown>
    </Popover>
  );
}
