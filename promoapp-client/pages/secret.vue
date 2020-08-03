<template>
  <div>
    <h1>I'm super secret page.</h1>
  </div>
</template>
<script>
export default {
  middleware: "auth",
};
</script>