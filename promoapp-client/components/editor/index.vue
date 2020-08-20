<template>
  <div class="editor editor-squished">
    <BasicMenu :editor="editor" />
    <BubbleMenu :editor="editor" />
    <EditorContent class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import BubbleMenu from "~/components/editor/BubbleMenu";
import BasicMenu from "~/components/editor/BasicMenu";
import {
  Heading,
  Bold,
  Code,
  Italic,
  Strike,
  Underline,
  History,
  Blockquote,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  CodeBlockHighlight,
} from "tiptap-extensions";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
export default {
  components: {
    EditorContent,
    BubbleMenu,
    BasicMenu,
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Heading({ levels: [1, 2, 3] }),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Blockquote(),
        new HorizontalRule(),
        new OrderedList(),
        new BulletList(),
        new ListItem(),
        new CodeBlockHighlight({
          languages: {
            javascript,
            css,
          },
        }),
      ],
    });
  },
  beforeDestroy() {
    this.editor && this.editor.destroy();
  },
};
</script>
