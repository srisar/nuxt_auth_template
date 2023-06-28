<script setup lang="ts">

const authenticated = useState('authenticated')

console.log('authenticated: ', authenticated.value);


</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-5">About page</h1>

    <p>{{ authenticated }}</p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium amet corporis
      cum eius eum expedita fugit hic ipsa nisi perferendis provident quod repudiandae sed similique
      sit unde voluptas, voluptatibus.
    </p>
  </div>
</template>

<style scoped></style>
