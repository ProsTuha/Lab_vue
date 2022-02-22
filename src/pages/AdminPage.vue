<template>
  <div class="admin">
    <router-view>
      <div class="admin-wrap">
      <div class="admin-welcome">
        Hi, {{user.firstName}}! Let's add something new!
      </div>
      <router-link :to="routePath" class="admin-link">
        <button class="admin-button">Go products page</button>
      </router-link>
    </div>
    </router-view>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex';

@Options({
  computed: {
    ...mapState(['isAuthorized', 'user'])
  },
  mounted() {
    if (this.isAuthorized && this.user.role === 'ADMIN') this.routePath = '/admin/products' 
    else this.routePath = '/' 
  }
})

export default class AdminPage extends Vue {
  routePath = '/' || '/admin/products';
}
</script>

<style lang="scss" scoped>
.admin {
  height: 496px;
}

.admin-welcome {
  position: absolute;
  width: 100%;
  top: 20%;
  text-align: center;
  font-size: 35px;
  background: $color-orange;
  color: $color-pink;
}

.admin-button {
  position: absolute;
  top: 40%;
  left: 40%;
  border: 0;
  border-radius: 15px;
  background: $color-pink;
  font-size: 40px;
  cursor: pointer;
  box-shadow: 0 0 1px $color-white, 0 0 2px $color-pink, 0 0 4px $color-white, 
  0 0 8px $color-orange, 0 0 16px $color-orange, 0 0 20px $color-orange, 
  0 0 25px $color-orange;

  &:hover {
    background: $color-orange;
    transition: background 0.5s;
  }
}
</style>
