<template>
  <h1 class="text-xl">Рекомендации</h1>

  <a-form
    :hideRequiredMark="true"
    name="recommendations"
    autocomplete="off"
    :model="recommendation"
    class="flex gap-3"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      name="text"
      class="w-min"
      v-model:value="recommendation.text"
      :rules="[{ required: true, message: `Пожалуйста вибирите напишите рекомендацию пациенту`}]"
    >
      <a-input v-model:value="recommendation.text" size="large" placeholder="Tекст рекомендации пациенту" class="w-[300px]" />
    </a-form-item>

    <a-form-item>
      <a-button
        html-type="submit"
        size="large"
        :icon="h(PlusOutlined)"
        class="flex items-center justify-center"
      />
    </a-form-item>
  </a-form>
  <div class="border min-h-[120px] w-full md:w-1/2 rounded p-6">
    <ul class="divide-y">
       <li v-for="item in data" class="flex gap-8 flex-wrap py-2 ">
        {{ item }}
      </li>
    </ul>
  </div>
  <div class="flex gap-3 items-center">
    <span class="flex items-center gap-2"
      ><CalendarOutlined /> {{ dayjs().format('DD/MM/YYYY HH:mm') }}</span
    >
    <span class="flex items-center gap-2"><UserOutlined /> ФИО лечащего врача</span>
    <span class="flex items-center gap-2">Должность</span>
  </div>
  <a-button class="w-[300px]" size="large">Сохранить назначения</a-button>
</template>
<script setup lang="ts">
import { h, reactive } from 'vue'
import { PlusOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { useRecommendationStore } from '@/stores/Recommendation';
import { storeToRefs } from 'pinia';

const store = useRecommendationStore()
const { data } = storeToRefs(store)
const { setData } = store

const recommendation = reactive({
  text: ''
})

const onFinish = (values: any) => {
    setData(values.text)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:')
}
</script>
