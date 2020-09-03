<template>
  <div class="container">
    <ErrorView
      :title="'Oooops, page you are trying to access the page doesn\'t exist'"
      :status="'404'"
      :navigateToPage="'/'"
      :navigateToText="'Navigate to Home Page'"
    />
  </div>
</template>

<script>
import ErrorView from "@/components/shared/ErrorView";
export default {
  components: {
    ErrorView
  }
};
</script>

<style scoped></style>
