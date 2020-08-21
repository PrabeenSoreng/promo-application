<template>
  <!-- Finish handling of URL -->
  <div>
    <InstructorHeader title="Write your blog" exitLink="/instructor/blogs">
      <!-- TODO: Check if blog status is active -->
      <template #actionMenu>
        <div class="full-page-takeover-header-button">
          <!-- TODO: Check blog validity before publishing -->
          <Modal
            openTitle="Publish"
            openBtnClass="button is-success is-medium is-inverted is-outlined"
            title="Review Details"
          >
            <div>
              <div class="title">Once you publish blog you cannot change url to a blog.</div>
              <!-- Check for error -->
              <div>
                <div class="subtitle">Current Url is:</div>
                <article class="message is-success">
                  <div class="message-body">
                    <!-- Get here actual slug -->
                    <strong>some-slug</strong>
                  </div>
                </article>
              </div>
              <!-- <article class="message is-danger">
                <div class="message-body">
                  Display error here
                </div>
              </article>-->
            </div>
          </Modal>
        </div>
      </template>
      <!-- <template v-else #actionMenu>
        <div class="full-page-takeover-header-button">
          <Modal
            openTitle="Unpublish"
            openBtnClass="button is-success is-medium is-inverted is-outlined"
            title="Unpublish Blog">
            <div>
              <div class="title">Unpublish blog so it's no longer displayed in blogs page</div>
            </div>
          </Modal>
        </div>
      </template>-->
    </InstructorHeader>
    <div class="blog-editor-container">
      <div class="container">
        <editor @editorMounted="initBlogContent" />
      </div>
    </div>
  </div>
</template>
<script>
import Editor from "~/components/editor";
import InstructorHeader from "~/components/shared/Header";
import Modal from "~/components/shared/Modal";
import { mapState } from "vuex";
export default {
  layout: "instructor",
  components: {
    Editor,
    InstructorHeader,
    Modal,
  },
  computed: {
    ...mapState({
      blog: ({ instructor }) => instructor.blog.blog,
    }),
  },
  async fetch({ params, store }) {
    await store.dispatch("instructor/blog/fetchBlogById", params.id);
  },
  methods: {
    // initBlogContent(editor) {
    //   if (this.blog && this.blog.content) {
    //     editor.setContent(this.blog.content);
    //   }
    // },
    initBlogContent(initContent) {
      if (this.blog && this.blog.content) {
        initContent(this.blog.content);
      }
    },
  },
};
</script>
