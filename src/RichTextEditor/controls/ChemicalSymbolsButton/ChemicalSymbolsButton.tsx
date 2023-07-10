import { Popover, SimpleGrid } from "@mantine/core";
import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { useStateDetector } from "@mongez/react-hooks";

const symbolsList = [
  "↔️",
  "→",
  "←",
  "⇌",
  "⇾",
  "⇝",
  "⇢",
  "⇄",
  "⊕",
  "⊖",
  "∆",
  "∞",
  "⚠️",
  "H₂O",
  "CO₂",
  "O₂",
  "NH₃",
  "CH₄",
  "C₆H₁₂O₆",
  "NaCl",
  "HCl",
  "H₂SO₄",
  "H₂O₂",
  "Fe",
  "Cu",
  "Ag",
  "Au",
  "Pt",
  "C",
  "N",
  "O",
  "S",
  "Cl",
  "Br",
  "I",
  "Mg",
  "Ca",
  "K",
  "F",
  "He",
  "Ne",
  "Ar",
  "Kr",
  "⥀",
  "⇛",
  "⤑",
  "⤒",
  "∴",
  "≈",
  "≡",
  "≠",
  "℃",
  "Å",
  "μ",
  "%",
  "mol",
  "g",
  "cm",
  "s",
  "Hz",
  "h",
  "ℏ",
];

export function ChemicalSymbolsButton() {
  const { editor } = useRichTextEditorContext();
  const [opened, setOpened] = useStateDetector(false);
  const insertSymbol = symbol => () => {
    editor?.commands.insertContent(symbol);

    setOpened(false);
  };

  return (
    <Popover
      withArrow
      opened={opened}
      onClose={() => setOpened(false)}
      onOpen={() => setOpened(true)}>
      <Popover.Target>
        <RichTextEditor.Control
          onClick={() => setOpened(!opened)}
          aria-label="Insert Symbol"
          title="Insert Symbol">
          ∆
        </RichTextEditor.Control>
      </Popover.Target>

      <Popover.Dropdown p="xl">
        <SimpleGrid cols={10} spacing={0}>
          {symbolsList.map((symbol, index) => (
            <RichTextEditor.Control
              onClick={insertSymbol(symbol)}
              key={index}
              aria-label={symbol}
              title={symbol}>
              {symbol}
            </RichTextEditor.Control>
          ))}
        </SimpleGrid>
      </Popover.Dropdown>
    </Popover>
  );
}
