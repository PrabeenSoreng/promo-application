<template>
  <div>
    <InstructorHeader title="Manage your Blogs" exitLink="/" />
    <div class="instructor-blogs">
      <div class="container">
        <div class="section">
          <div class="header-block">
            <h2>Your Stories</h2>
            <div class="title-menu">
              <button
                @click="$router.push('/instructor/blog/editor')"
                class="button"
              >
                Write a story
              </button>
            </div>
          </div>
          <div class="tabs">
            <ul>
              <li @click="activeTab = 0">
                <a :class="{ 'is-active': activeTab === 0 }">Drafts</a>
              </li>
              <li @click="activeTab = 1">
                <a :class="{ 'is-active': activeTab === 1 }">Published</a>
              </li>
            </ul>
          </div>
          <div class="blogs-container">
            <template v-if="activeTab === 0">
              <div v-if="drafts && drafts.length > 0">
                <div v-for="dBlog in drafts" :key="dBlog._id" class="blog-card">
                  <h2>{{ displayBlogTitle(dBlog) }}</h2>
                  <div class="blog-card-footer">
                    <span>Last Edited {{ dBlog.updatedAt | formatDate }}</span>
                    <Dropdown
                      :items="draftsOptions"
                      @optionChanged="handleOption($event, dBlog)"
                    />
                  </div>
                </div>
              </div>
              <!-- In case of no drafts blogs  -->
              <div v-else class="blog-error">
                No Drafts Blogs :(
              </div>
            </template>

            <template v-if="activeTab === 1">
              <div v-if="published && published.length > 0">
                <div
                  v-for="pBlog in published"
                  :key="pBlog._id"
                  class="blog-card"
                >
                  <h2>{{ displayBlogTitle(pBlog) }}</h2>
                  <div class="blog-card-footer">
                    <span>Last Edited {{ pBlog.updatedAt | formatDate }}</span>
                    <Dropdown
                      :items="publishedOptions"
                      @optionChanged="handleOption($event, pBlog)"
                    />
                  </div>
                </div>
              </div>
              <!-- In case of no drafts blogs  -->
              <div v-else class="blog-error">
                No Published Blogs :(
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import InstructorHeader from "~/components/shared/Header";
import Dropdown from "~/components/shared/Dropdown";
import {
  createPublishedOptions,
  createDraftsOptions,
  commands
} from "~/pages/instructor/options";
export default {
  layout: "instructor",
  components: { InstructorHeader, Dropdown },
  data() {
    return {
      activeTab: 0
    };
  },
  computed: {
    ...mapState({
      published: ({ instructor }) => instructor.blog.blogs.published,
      drafts: ({ instructor }) => instructor.blog.blogs.drafts
    }),
    publishedOptions() {
      return createPublishedOptions();
    },
    draftsOptions() {
      return createDraftsOptions();
    }
  },
  async fetch({ store }) {
    await store.dispatch("instructor/blog/fetchUserBlogs");
  },
  methods: {
    handleOption(command, blog) {
      if (command === commands.EDIT_BLOG) {
        this.$router.push(`/instructor/blog/${blog._id}/edit`);
      }
      if (command === commands.DELETE_BLOG) {
        this.displayDeleteWarning(blog);
      }
    },
    displayDeleteWarning(blog) {
      const isConfirm = confirm("Are you sure you want to delete blog ?");
      if (isConfirm) {
        this.$store.dispatch("instructor/blog/deleteBlog", blog).then(_ =>
          this.$toasted.success("Blog was successfully deleted!", {
            duration: 2000
          })
        );
      }
    },
    displayBlogTitle(blog) {
      return (
        blog.title || blog.subtitle || "Blog without Title and Subtitle :("
      );
    }
  }
};
</script>

<style scoped lang="scss">
.is-active {
  border-bottom-color: #363636;
  color: #363636;
}
.blog-error {
  font-size: 35px;
}
.blog-card {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  > h2 {
    font-size: 30px;
    font-weight: bold;
  }
  &-footer {
    color: rgba(0, 0, 0, 0.54);
  }
  &.featured {
    border-left: 5px solid #3cc314;
    padding-left: 10px;
    transition: border ease-out 0.2s;
  }
}
.header-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  > h2 {
    font-size: 40px;
    font-weight: bold;
  }
  .title-menu {
    margin-left: auto;
  }
}
</style>
