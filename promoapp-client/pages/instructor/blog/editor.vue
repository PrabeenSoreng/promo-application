<template>
  <div>
    <InstructorHeader title="Write your Blogs" exitLink="/instructor/blogs" />
    <div class="blog-editor-container">
      <div class="container">
        <Editor @editorUpdated="saveBlog" />
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
    Editor,
  },
  methods: {
    saveBlog(blogData) {
      this.$store
        .dispatch("instructor/blog/createBlog", blogData)
        .then(({ data }) =>
          this.$router.push(`/instructor/blog/${data._id}/edit`)
        );
    },
  },
};
</script>
<style lang="scss">
.blog-editor-container {
  padding-top: 60px;
}
</style>
