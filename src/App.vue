<script setup lang="ts">
import AfterAssignments from './components/AfterAssignments.vue';
import HomeTreatment from './components/HomeTreatment.vue';
import Recommendation from './components/Recommendation.vue';
import SessionAssignments from './components/SessionAssignments.vue'
</script>

<template>
  <div class="flex justify-center items-center mx-8 my-6 relative">
    <h2 class="absolute left-0 text-xl mb-0">Сеанс гемодиализа</h2>
    <span class="text-lg">№ месяце: 4</span>
  </div>
  <div class="p-8 relative flex flex-col gap-4">
  <SessionAssignments />
  <AfterAssignments />
  <HomeTreatment />
  <Recommendation/>
</div>
</template>
