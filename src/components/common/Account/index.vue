<script lang='ts' setup>
import { computed, ref } from 'vue'
import { NModal } from 'naive-ui'
import Login from './Login.vue'

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

interface Props {
  visible: boolean
}

interface Emit {
  (e: 'update:visible', visible: boolean): void
}

const reload = ref(false)

const show = computed({
  get() {
    return props.visible
  },
  set(visible: boolean) {
    emit('update:visible', visible)
  },
})

function handleReload() {
  reload.value = true
  setTimeout(() => {
    reload.value = false
  }, 0)
}

function closeModel() {
  setTimeout(() => {
    show.value = false
  }, 1000)
}
</script>

<template>
  <NModal v-model:show="show" :auto-focus="false" :closable="false" :mask-closable="false" :close-on-esc="false" preset="dialog" title="用户认证" class="min-w-[100px]:" :z-index="100">
    <Login v-if="!reload" @update="handleReload" @closeModel="closeModel" />
  </NModal>
</template>
