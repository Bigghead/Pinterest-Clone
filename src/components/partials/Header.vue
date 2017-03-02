<template lang="html">
  <div class="">
    <nav class='deep-purple accent-2'>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo left">Pinterest Clone</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link :to="'/login'">Log In</router-link></li>
          <li><router-link :to="'/images'">All Images</router-link></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="css">
</style>
