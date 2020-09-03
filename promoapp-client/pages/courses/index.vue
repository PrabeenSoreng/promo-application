<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">All Courses</h1>
        <div class="columns is-multiline">
          <div
            v-for="course in courses"
            :key="course._id"
            class="column is-one-quarter"
          >
            <v-popover offset="16" trigger="hover" placement="right-start">
              <CourseCard :course="course" />
              <template slot="popover">
                <CourseCardTooltip
                  :title="course.title"
                  :subtitle="course.category.name"
                  :description="course.subtitle"
                  :wsl="course.wsl"
                />
              </template>
            </v-popover>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CourseCard from "~/components/CourseCard";
import CourseCardTooltip from "~/components/CourseCardTooltip";
import { mapState } from "vuex";
export default {
  components: {
    CourseCard,
    CourseCardTooltip
  },
  computed: {
    ...mapState({
      courses: state => state.course.items,
      featuredBlogs: state => state.blog.blogs.featured,
      courseHero: state => state.hero.item
    })
  },
  // mounted() {
  //   console.log(this.courseHero);
  // },
  async fetch({ store }) {
    await store.dispatch("course/fetchCourses");
  }
};
</script>

<style lang="scss" scoped>
.links {
  padding-top: 15px;
}
</style>
