<template>
  <div class="user-profile">
    <div class="user-profile__basic-info">
      <div class="user-profile__basic-info-view">
        <div class="user-profile__basic-info-image">
          <img class="user-profile__basic-info-img" 
          src="@/img/profiles/profile-avatar.png" 
          :alt="$store.state.user.firstName">
          <h1 class="user-profile__basic-info-name">
            {{$store.state.user.firstName}} {{$store.state.user.lastName}}
          </h1>
          <h2>
            {{$store.state.user.login}}
          </h2>
        </div>
      </div>
      <div class="user-profile__additional-info">
        <div class="user-profile__additional-info-wrap">
          <div class="user-profile__sex">
            <p>
              <span class="user-profile__sex-inscription">
                Sex:
              </span>
              {{$store.state.user.sex}}
            </p>
          </div>
          <div class="user-profile__age">
            <p>
              <span class="user-profile__age-inscription">
                Age:
              </span>
              {{$store.state.user.age}}
            </p>
          </div>
          <div class="user-profile__address">
            <p>
              <span class="user-profile__address-inscription">
                Address:
              </span>
              {{$store.state.user.address}}
            </p>
          </div>
          <div class="user-profile__shippingAddress">
            <span class="user-profile__shippingAddress-inscription">
              Shipping address:
            </span>
            {{$store.state.user.shippingAddress}}
          </div>
          <div class="user-profile__paymentCard">
            <p>
              <span class="user-profile__paymentCard-inscription">
                Payment card:
              </span>
              {{$store.state.user.paymentCard}}
            </p>
          </div>
          <div class="user-profile__password">
            <p>
              <span class="user-profile__password-inscription">
                Password:
              </span>
              {{$store.state.user.password}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import axios from 'axios'
import { IUser } from '@/interfaces'

@Options({
  mounted() {
    axios
      .get(`http://localhost:3000/users?login_like=${this.$store.state.user.login}`)
      .then((response) => {
        this.$store.commit('setUserData', response.data[0]);
      });
  }
})

export default class UserProfile extends Vue {
    
}
</script>

<style lang="scss" scoped>

</style>
