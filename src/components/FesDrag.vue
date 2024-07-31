<script setup lang="ts">
  interface Props {
    item: any;
  }
  const { item } = defineProps<Props>();

  function startDrag(event: DragEvent, item: any) {
    if (!event.dataTransfer) {
      return;
    }

    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("item", JSON.stringify(item));
  }
</script>

<template>
  <div
    class="flex"
    draggable="true"
    @dragstart="startDrag($event, item)"
  >
    <slot />
  </div>
</template>
