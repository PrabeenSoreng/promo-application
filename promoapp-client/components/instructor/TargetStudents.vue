<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Target your Students</p>
    </header>
    <div class="card-content card-section">
      <form>
        <MultiLineTextInput
          label="What will students learn"
          :lines="course.wsl"
          @addClicked="addLine('wsl')"
          @removeClicked="removeLine($event, 'wsl')"
          @valueUpdated="updateLine($event, 'wsl')"
        />
        <MultiLineTextInput
          label="What are the requirements"
          :lines="course.requirements"
          @addClicked="addLine('requirements')"
          @removeClicked="removeLine($event, 'requirements')"
          @valueUpdated="updateLine($event, 'requirements')"
        />
      </form>
    </div>
  </div>
</template>

<script>
import MultiLineTextInput from "~/components/form/MultiLineTextInput";
export default {
  components: {
    MultiLineTextInput,
  },
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addLine(field) {
      this.$store.commit("instructor/course/addLine", field);
    },
    removeLine(index, field) {
      this.$store.commit("instructor/course/removeLine", { field, index });
    },
    updateLine({ value, index }, field) {
      this.$store.dispatch("instructor/course/updateLine", {
        field,
        value,
        index,
      });
    },
  },
};
</script>