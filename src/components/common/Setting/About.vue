<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import { NButton, NInput, NSpin, useMessage } from 'naive-ui'
import { fetchChatConfig } from '@/api'
import { useUserStore } from '@/store'
import type { UserInfo } from '@/store/modules/user/helper'
import { t } from '@/locales'

interface ConfigState {
  timeoutMs?: number
  reverseProxy?: string
  apiModel?: string
  socksProxy?: string
}

const ms = useMessage()

const loading = ref(false)

const config = ref<ConfigState>()

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

const apikey = ref(userInfo.value.apikey ?? '')

const apiaccesstoken = ref(userInfo.value.apiaccesstoken ?? '')

function updateUserInfo(options: Partial<UserInfo>) {
  userStore.updateUserInfo(options)
  ms.success(t('common.success'))
}

async function fetchConfig() {
  try {
    loading.value = true
    const { data } = await fetchChatConfig<ConfigState>()
    config.value = data
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchConfig()
})
</script>

<template>
  <NSpin :show="loading">
    <div class="p-4 space-y-5 min-h-[200px]">
      <div class="space-y-6">
        <div class="p-2 space-y-2 rounded-md bg-neutral-100 dark:bg-neutral-700">
          <p>
            <strong>需要账号的可联系站长购买（qq群：636038548）</strong>
          </p>
          <p>
            两种模式，<strong>请2选1</strong>，如两种都填写，会优先使用Key模式
          </p>
          <p>
            <strong>Key模式</strong>： 基于官方的API接口 <a href="https://platform.openai.com/overview" target="_blank" class="text-blue-500">[获取Key]</a>
          </p>
          <p>
            <strong>AccessToken模式</strong>： 直接同步官方网页版 <a href="https://chat.openai.com/api/auth/session" target="_blank" class="text-blue-500">[获取accessToken]</a>
          </p>
        </div>
      </div>
      <div class="space-y-6">
        <div class="flex items-center space-x-4">
          <span class="flex-shrink-0 w-[100px]">{{ $t('setting.apikey') }}</span>
          <div class="flex-1">
            <NInput v-model:value="apikey" placeholder="" />
          </div>
          <NButton size="tiny" text type="primary" @click="updateUserInfo({ apikey })">
            {{ $t('common.save') }}
          </NButton>
        </div>
        <div class="flex items-center space-x-4">
          <span class="flex-shrink-0 w-[100px]">{{ $t('setting.apiAccessToken') }}</span>
          <div class="flex-1">
            <NInput v-model:value="apiaccesstoken" placeholder="" />
          </div>
          <NButton size="tiny" text type="primary" @click="updateUserInfo({ apiaccesstoken })">
            {{ $t('common.save') }}
          </NButton>
        </div>
      </div>
    </div>
  </NSpin>
</template>
