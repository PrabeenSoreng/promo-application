<template>
  <!-- Finish handling of URL -->
  <div>
    <InstructorHeader title="Write your blog" exitLink="/instructor/blogs">
      <!-- TODO: Check if blog status is active -->
      <template v-if="blog.status === 'active'" #actionMenu>
        <div class="full-page-takeover-header-button">
          <Modal
            @opened="checkBlogValidity"
            @submitted="updateBlogStatus($event, 'published')"
            openTitle="Publish"
            openBtnClass="button is-success is-medium is-inverted is-outlined"
            title="Review Details"
          >
            <div>
              <div class="title">
                Once you publish blog you cannot change url to a blog.
              </div>
              <!-- Check for error -->
              <div v-if="!publishedError">
                <div class="subtitle">
                  This is how url to blog post will look like after publish :
                </div>
                <article class="message is-success">
                  <div class="message-body">
                    <strong>{{ getCurrentUrl() }}/blogs/{{ slug }}</strong>
                  </div>
                </article>
              </div>
              <article v-else class="message is-danger">
                <div class="message-body">{{ publishedError }}</div>
              </article>
            </div>
          </Modal>
        </div>
      </template>
      <template v-else #actionMenu>
        <div class="full-page-takeover-header-button">
          <Modal
            @submitted="updateBlogStatus($event, 'active')"
            openTitle="Unpublish"
            openBtnClass="button is-success is-medium is-inverted is-outlined"
            title="Unpublish Blog"
          >
            <div>
              <div class="title">
                Unpublish blog so it's no longer displayed in blogs page
              </div>
            </div>
          </Modal>
        </div>
      </template>
    </InstructorHeader>
    <div class="blog-editor-container">
      <div class="container">
        <editor
          @editorMounted="initBlogContent"
          @editorUpdated="updateBlog"
          :isSaving="isSaving"
          ref="editor"
        />
      </div>
    </div>
  </div>
</template>
<script>
import slugify from "slugify";
import Editor from "~/components/editor";
import InstructorHeader from "~/components/shared/Header";
import Modal from "~/components/shared/Modal";
import { mapState } from "vuex";
export default {
  layout: "instructor",
  components: {
    Editor,
    InstructorHeader,
    Modal
  },
  data() {
    return {
      publishedError: "",
      slug: ""
    };
  },
  computed: {
    ...mapState({
      blog: ({ instructor }) => instructor.blog.blog,
      isSaving: ({ instructor }) => instructor.blog.isSaving
    }),
    editor() {
      return this.$refs.editor;
    }
  },
  async fetch({ params, store }) {
    await store.dispatch("instructor/blog/fetchBlogById", params.id);
  },
  methods: {
    initBlogContent(initContent) {
      if (this.blog && this.blog.content) {
        initContent(this.blog.content);
      }
    },
    updateBlog(blogData) {
      if (!this.isSaving) {
        this.$store
          .dispatch("instructor/blog/updateBlog", {
            data: blogData,
            id: this.blog._id
          })
          .then(_ =>
            this.$toasted.success("Blog updated successfully!", {
              duration: 2000
            })
          )
          .catch(error =>
            this.$toasted.error("Blog update error!", { duration: 2000 })
          );
      }
    },
    updateBlogStatus({ closeModal }, status) {
      const blogContent = this.editor.getContent();
      blogContent.status = status;

      const message =
        status === "published"
          ? "Blog has been published!"
          : "Blog has been unpublished";

      this.$store
        .dispatch("instructor/blog/updateBlog", {
          data: blogContent,
          id: this.blog._id
        })
        .then(_ => {
          this.$toasted.success(message, { duration: 3000 });
          closeModal();
        })
        .catch(error =>
          this.$toasted.error("Blog cannot be published!", { duration: 3000 })
        );
    },
    checkBlogValidity() {
      const title = this.editor.getNodeValueByName("title");
      this.publishedError = "";
      this.slug = "";
      if (title && title.length > 12) {
        this.slug = this.slugify(title);
      } else {
        this.publishedError =
          "Cannot publish! Title needs to be longer than 12 characters!";
      }
    },
    getCurrentUrl() {
      return process.client && window.location.origin;
    },
    slugify(text) {
      return slugify(text, {
        replacement: "-",
        remove: null,
        lower: true
      });
    }
  }
};
</script>
