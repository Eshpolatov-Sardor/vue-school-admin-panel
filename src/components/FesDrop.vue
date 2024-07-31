<script setup lang="ts">
  interface Emits {
    (event: "drop", item: any): void;
  }

  const emit = defineEmits<Emits>();
  defineSlots<{
    default: object;
    panel: object;
  }>();

  const isOverDropZone = ref<boolean>(false);

  function dragOver() {
    isOverDropZone.value = true;
  }

  function dragLeave() {
    isOverDropZone.value = false;
  }

  function onDrop(event: DragEvent) {
    isOverDropZone.value = false;
    if (!event.dataTransfer) {
      return;
    }

    const item = JSON.parse(event.dataTransfer.getData("item") ?? "{}");

    if (!item) {
      return;
    }
    emit("drop", item);
  }
</script>

<template>
  <div
    class="mx-auto w-full rounded-md"
    :class="[
      isOverDropZone ? 'border-2 border-dashed border-gray-500 ' : 'border-2 border-transparent',
    ]"
    @drop.prevent="onDrop"
    @dragenter.prevent
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
  >
    <slot />
  </div>
</template>
