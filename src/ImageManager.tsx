import { Button, Flex, Modal, SimpleGrid, Text } from "@mantine/core";
import { trans } from "@mongez/localization";
import { SwitchInput, TextInput } from "@mongez/moonlight";
import { Form, getForm } from "@mongez/react-form";
import Image from "@tiptap/extension-image";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";

export function ImageManagerComponent({
  node,
  updateAttributes,
  editor,
  extension,
}: any) {
  const [opened, setOpened] = useState(false);
  const [image, setImage] = useState<HTMLImageElement>();
  const imageRef = useRef<HTMLImageElement>();
  const [attributes, setAttributes] = useState<any>({});
  const [originalDimensions, setOriginalDimensions] = useState<any>({
    width: node.attrs.width,
    height: node.attrs.height,
  });

  const componentWrapper = extension.options.inline ? "span" : "div";

  const [imageDimensions, setImageDimensions] =
    useState<any>(originalDimensions);

  const getCurrentForm = (): Form => {
    const form = getForm("image-manager-form");

    return form as Form;
  };

  useEffect(() => {
    // now we want to check if user double clicked on an image
    // if so then display the image manager popup
    if (!imageRef.current) return;

    const handleDblClick = (e: any) => {
      const { target } = e;

      if (target.tagName === "IMG") {
        const src = target.getAttribute("src");

        if (!src) return;

        const dimensions = {
          width: target.width,
          height: target.height,
        };

        setOriginalDimensions(dimensions);
        setImageDimensions(dimensions);

        setOpened(true);

        setImage(target);
      }
    };

    imageRef.current.addEventListener("dblclick", handleDblClick);
  }, []);

  const updateImageAttributes = () => {
    const form = getForm("image-manager-form");

    if (!form) return;

    const { autoRatio, ...attributes } = form.values();

    setAttributes(attributes);
    updateAttributes(attributes);
    setOpened(false);
  };

  const change = (key: string) => (value: any) => {
    const form = getCurrentForm();

    if (form.value("autoRatio")) {
      const ratio = originalDimensions.width / originalDimensions.height;

      if (key === "width") {
        setImageDimensions({
          width: value,
          height: Math.round(value / ratio),
        });
      } else {
        setImageDimensions({
          width: Math.round(value * ratio),
          height: value,
        });
      }
    }
  };

  return (
    <>
      <Modal
        centered
        trapFocus={false}
        title={
          <Text fw="bold" fz="xl">
            {trans("rte.editImage")}
          </Text>
        }
        opened={opened}
        onClose={() => setOpened(false)}>
        <Form id="image-manager-form">
          <SimpleGrid cols={2}>
            <TextInput
              name="width"
              label={trans("rte.imageWidth")}
              placeholder={trans("rte.imageWidth")}
              value={imageDimensions.width}
              onChange={change("width")}
              autoFocus
            />
            <TextInput
              name="height"
              label={trans("rte.imageHeight")}
              placeholder={trans("rte.imageHeight")}
              value={imageDimensions.height}
              onChange={change("height")}
            />
            <TextInput
              name="alt"
              label={trans("rte.imageAlt")}
              placeholder={trans("rte.imageAlt")}
              defaultValue={image?.alt}
            />
            <TextInput
              name="title"
              label={trans("rte.imageTitle")}
              placeholder={trans("rte.imageTitle")}
              defaultValue={image?.title}
            />
            <SwitchInput
              name="autoRatio"
              label={trans("rte.autoRatioImage")}
              defaultChecked
            />
          </SimpleGrid>
          <Flex mt="sm" align="center" justify="center">
            <Button
              type="button"
              onClick={() => setOpened(false)}
              color="red"
              variant="light">
              {trans("rte.cancel")}
            </Button>
            <Button type="submit" onClick={updateImageAttributes} color="green">
              {trans("rte.ok")}
            </Button>
          </Flex>
        </Form>
      </Modal>
      <NodeViewWrapper as={componentWrapper}>
        <img
          style={{
            cursor: "pointer",
          }}
          ref={imageRef}
          {...node.attrs}
          {...attributes}
        />
      </NodeViewWrapper>
    </>
  );
}

export const ImageManager = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageManagerComponent);
  },
  addGlobalAttributes() {
    return [
      {
        types: ["image"],
        attributes: {
          width: {
            default: null,
            renderHTML: (attributes: any) => {
              if (!attributes.width) return {};

              return {
                style: `width: ${String(attributes.width).replace(
                  /px$/,
                  "",
                )}px;`,
              };
            },
          },
          height: {
            default: null,
            renderHTML: (attributes: any) => {
              if (!attributes.height) return {};

              return {
                style: `height: ${String(attributes.height).replace(
                  /px$/,
                  "",
                )}px;`,
              };
            },
          },
        },
      },
    ];
  },
});
