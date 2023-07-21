<template>
  <div flex justify-center flex-col h-full>
    <div w-400px mb-50px>
      <slot />
    </div>
    <router-link to="/">
      <el-button type="primary">回到首页</el-button>
    </router-link>
  </div>
</template>
