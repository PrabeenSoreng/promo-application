<template>
  <div class="editor course-editor">
    <CourseMenu :editor="editor" />
    <EditorContent class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import CourseMenu from "~/components/editor/CourseMenu";
import {
  Bold,
  Italic,
  History,
  OrderedList,
  BulletList,
  ListItem
} from "tiptap-extensions";
export default {
  components: {
    EditorContent
  },
  props: {
    initialContent: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Bold(),
        new Italic(),
        new History(),
        new OrderedList(),
        new BulletList(),
        new ListItem()
      ],
      onUpdate: () => {
        this.emitUpdate();
      }
    });
    this.initialContent && this.editor.setContent(this.initialContent);
  },
  beforeDestroy() {
    this.editor && this.editor.destroy();
  },
  methods: {
    emitUpdate() {
      const content = this.editor.getHTML();
      this.$emit("editorUpdated", content);
    }
  }
};
</script>

<style lang="scss">
.course-editor {
  * {
    &:focus {
      outline: none;
    }
  }
  border: 1px solid gray;
  .editor__content {
    padding: 0 20px 20px 20px;
  }
}
</style>
