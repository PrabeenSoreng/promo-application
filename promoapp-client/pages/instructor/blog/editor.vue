<template>
  <div>
    <InstructorHeader title="Write your Blogs" exitLink="/instructor/blogs" />
    <div class="blog-editor-container">
      <div class="container">
        <Editor />
        <!-- Editor Component here! -->
      </div>
    </div>
  </div>
</template>

<script>
import InstructorHeader from "~/components/shared/Header";
import Editor from "~/components/editor";
export default {
  layout: "instructor",
  components: {
    InstructorHeader,
    Editor
  }
};
</script>
<style lang="scss">
.blog-editor-container {
  padding-top: 60px;
}
</style>
