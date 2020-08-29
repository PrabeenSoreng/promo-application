<template>
  <div>
    <Hero
      :title="courseHero.title"
      :subtitle="courseHero.subtitle"
      :image="courseHero.image"
      :promoLink="courseHero.product.productLink"
    />
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Courses</h1>
        <div class="columns is-multiline">
          <div
            v-for="course in courses"
            :key="course._id"
            class="column is-one-quarter"
          >
            <CourseCard :course="course" />
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Articles</h1>
        <div class="columns is-multiline">
          <div
            v-for="blog in featuredBlogs"
            :key="blog._id"
            class="column is-one-quarter"
          >
            <BlogCard :blog="blog" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Hero from "~/components/shared/Hero";
import CourseCard from "~/components/CourseCard";
import BlogCard from "~/components/BlogCard";
import { mapState } from "vuex";
export default {
  components: {
    Hero,
    CourseCard,
    BlogCard
  },
  computed: {
    ...mapState({
      courses: state => state.course.items,
      featuredBlogs: state => state.blog.blogs.featured,
      courseHero: state => state.hero.item[1]
    })
  },
  mounted() {
    console.log(this.courseHero);
  },
  async fetch({ store }) {
    // await store.dispatch("hero/fetchHero");
    await store.dispatch("course/fetchCourses");
    await store.dispatch("blog/fetchFeaturedBlogs", {
      "filter[featured]": true
    });
  }
};
</script>

<style lang="scss" scoped>
.links {
  padding-top: 15px;
}
</style>
