<template>
  <div>
    <Hero />
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Courses</h1>
        <div class="columns">
          <div class="column is-one-quarter">
            <CourseCard />
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Articles</h1>
        <div class="columns">
          <div class="column is-one-quarter">
            <BlogCard />
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
export default {
  components: {
    Hero,
    CourseCard,
    BlogCard
  }
};
</script>

<style lang="scss" scoped>
.links {
  padding-top: 15px;
}
</style>
