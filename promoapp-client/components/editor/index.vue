<template>
  <div class="editor editor-squished">
    <BubbleMenu :editor="editor" />
    <EditorContent class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import {
  Heading,
  Bold,
  Code,
  Italic,
  Strike,
  Underline,
  History,
} from "tiptap-extensions";
import BubbleMenu from "~/components/editor/BubbleMenu";
export default {
  components: {
    EditorContent,
    BubbleMenu,
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
      ],
    });
  },
  beforeDestroy() {
    this.editor && this.editor.destroy();
  },
};
</script>
