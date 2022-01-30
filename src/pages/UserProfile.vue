<template>
  <div class="user-profile">
    <div class="user-profile__basic-info">
      <div class="user-profile__basic-info-view">
          <img class="user-profile__basic-info-img" 
          src="@/img/profiles/profile-avatar.png" 
          :alt="$store.state.user.firstName">
          <div class="user-profile__basic-info-signature">
            <p class="user-profile__basic-info-name" v-if="$store.state.user.firstName">
              <span class="user-profile__name-inscription">
                First Name:
              </span>
              <span class="user-profile__edit-info">
                <span v-if="!firstNameHide">{{$store.state.user.firstName}}</span> 
                <AddInfo class="user-profile__edit-icon" :content="$store.state.user.firstName"
                v-model:hide="firstNameHide" :isEdit="true" title="Edit info" 
                @confirm="addFirstName"/>
              </span>              
            </p>
            <div class="user-profile__basic-add-name" v-else>
              <p class="user-profile__name-inscription">First Name:</p>
              <AddInfo class="user-profile__adding-plus" 
              @confirm="addFirstName" title="Add First Name"/>
            </div>
            <p class="user-profile__basic-info-surname" v-if="$store.state.user.lastName">
              <span class="user-profile__surname-inscription">
                Last Name:
              </span>
              <span class="user-profile__edit-info">
                <span v-if="!lastNameHide">{{$store.state.user.lastName}}</span> 
                <AddInfo class="user-profile__edit-icon" :content="$store.state.user.lastName"
                v-model:hide="lastNameHide" :isEdit="true" title="Edit info"
                @confirm="addLastName"/>
              </span>              
            </p>
            <div class="user-profile__basic-add-surname" v-else>
              <p class="user-profile__surname-inscription">Last Name:</p>
              <AddInfo class="user-profile__adding-plus"
              @confirm="addLastName" title="Add Last Name"/>
            </div>
            <div class="user-profile__basic-info-login">
              <span class="user-profile__login-inscription">Login:</span>
              <span class="user-profile__edit-info">
                <span v-if="!loginHide">{{$store.state.user.login}}</span>
                <AddInfo class="user-profile__edit-icon" :content="$store.state.user.login"
                v-model:hide="loginHide" :isEdit="true" title="Edit info"
                @confirm="addLogin"/>
              </span>              
            </div>
            <div class="user-profile__basic-info-password">
              <span class="user-profile__password-inscription">Password:</span>
              <span class="user-profile__edit-info">
                {{$store.state.user.password}}
                <img src="@/img/others/edit-icon.png" alt="Edit" 
                class="user-profile__edit-icon" @click="showModal = true">

                <Modal v-if="showModal" v-model:modal="showModal" :title="'Change Password'">
                  <div class="user-profile__password">
                    Enter old password:
                    <Input :inputType="'text'" 
                    :placeholder="'Enter old password'" 
                    @input-event="checkOldPassword"
                    class="user-profile__password-input"/>
                  </div>
                  <div class="user-profile__password">
                    Enter new password:
                    <Input :inputType="'text'" 
                    :placeholder="'Enter new password'" 
                    @input-event="checkNewPassword"
                    class="user-profile__password-input"/>
                  </div>
                  <div class="user-profile__password">
                    Repeat new password:
                    <Input :inputType="'text'" 
                    :placeholder="'Repeat new password'" 
                    @input-event="checkRepeatPassword"
                    class="user-profile__password-input"/>
                  </div>
                </Modal>
              </span>              
            </div>
          </div>
      </div>
    </div>
    <div class="user-profile__additional-info">
      <div class="user-profile__sex">
        <p>
          <span class="user-profile__sex-inscription">
            Sex:<br>
          </span>
          <span v-if="$store.state.user.sex">
            <span class="user-profile__edit-info">
              <span v-if="!sexHide">{{$store.state.user.sex}}</span>
              <AddInfo class="user-profile__edit-icon" :content="$store.state.user.sex"
              v-model:hide="sexHide" :isEdit="true" title="Edit info"
              @confirm="addSex"/>
            </span>            
          </span>
          <AddInfo  class="user-profile__adding-plus" 
          @confirm="addSex" title="Add info" v-if="!$store.state.user.sex"/>
        </p>
      </div>
      <div class="user-profile__age">
        <p>
          <span class="user-profile__age-inscription">
            Age:<br>
          </span>
          <span v-if="$store.state.user.age">
            <span class="user-profile__edit-info">
              <span v-if="!ageHide">{{$store.state.user.age}}</span>
              <AddInfo class="user-profile__edit-icon" :content="$store.state.user.age"
              v-model:hide="ageHide" :isEdit="true" title="Edit info"
              @confirm="addAge"/>
            </span>            
            </span>
          <AddInfo  class="user-profile__adding-plus"
          @confirm="addAge" title="Add info" v-if="!$store.state.user.age"/>
        </p>
      </div>
      <div class="user-profile__role">
        <p>
          <span class="user-profile__role-inscription">
            Role:<br>
          </span>
          <span v-if="$store.state.user.role">
            <span class="user-profile__edit-info">
              <span v-if="!roleHide">{{$store.state.user.role}}</span>
              <AddInfo class="user-profile__edit-icon" :content="$store.state.user.role"
              v-model:hide="roleHide" :isEdit="true" title="Edit info"
              @confirm="addRole"/>
            </span>            
          </span>
          <AddInfo  class="user-profile__adding-plus"
           @confirm="addRole" title="Add info" v-if="!$store.state.user.role"/>
        </p>
      </div>
      <div class="user-profile__address">
        <p>
          <span class="user-profile__address-inscription">
            Address:<br>
          </span>
          <span v-if="$store.state.user.address">
            <span class="user-profile__edit-info">
              <span v-if="!addressHide">{{$store.state.user.address}}</span>
              <AddInfo class="user-profile__edit-icon" :content="$store.state.user.address"
              v-model:hide="addressHide" :isEdit="true" title="Edit info"
              @confirm="addAddress"/>
            </span>            
          </span>
          <AddInfo  class="user-profile__adding-plus" 
          @confirm="addAddress" title="Add info" v-if="!$store.state.user.address"/>
        </p>
      </div>
      <div class="user-profile__shipping-address">
        <p>
          <span class="user-profile__shipping-address-inscription">
            Shipping address:<br>
          </span>
          <span v-if="$store.state.user.shippingAddress">
            <span class="user-profile__edit-info">
              <span v-if="!shippingAddressHide">{{$store.state.user.shippingAddress}}</span>
              <AddInfo class="user-profile__edit-icon" :content="$store.state.user.shippingAddress"
              v-model:hide="shippingAddressHide" :isEdit="true" title="Edit info"
              @confirm="addShippingAddress"/>
            </span>            
          </span>
          <AddInfo  class="user-profile__adding-plus"
          @confirm="addShippingAddress" 
          title="Add info" v-if="!$store.state.user.shippingAddress"/>
        </p>
      </div>
      <div class="user-profile__payment-card">
        <p>
          <span class="user-profile__payment-card-inscription">
            Payment card:<br>
          </span>
          <span v-if="$store.state.user.paymentCard">
            <span class="user-profile__edit-info">
              <span v-if="!paymentCardHide">{{$store.state.user.paymentCard}}</span>
              <AddInfo class="user-profile__edit-icon" :content="$store.state.user.paymentCard"
              v-model:hide="paymentCardHide" :isEdit="true" title="Edit info"
              @confirm="addPaymentCard"/>
            </span>            
          </span>
          <AddInfo  class="user-profile__adding-plus"
          @confirm="addPaymentCard" title="Add info" v-if="!$store.state.user.paymentCard"/>
        </p>
      </div>
    </div>
  </div>
  <Alert v-if="this.alert" :isError="this.error" 
  :isSuccess="!this.error" :message="this.alertMessage"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import AddInfo from '@/components/AddInfo.vue';
import Alert from '@/components/Alert.vue';
import Input from '@/components/Input.vue';
import { IUser } from '@/interfaces';
import Modal from '@/components/Modal.vue';

@Options({
  components: {
    AddInfo,
    Alert,
    Modal,
    Input
  },

  mounted() {
    axios
      .get(`http://localhost:3000/users?id_like=${this.$store.state.user.id}`)
      .then((response) => {
        this.$store.commit('setUserData', response.data[0]);
        this.userData = this.$store.state.user;
      });
  }
})

export default class UserProfile extends Vue {
  loginHide = false;
  firstNameHide = false;
  lastNameHide = false;
  sexHide = false;
  ageHide = false;
  roleHide = false;
  addressHide = false;
  shippingAddressHide = false;
  paymentCardHide = false;

  error = false;
  alertMessage = '';
  alert = false;

  showModal = false;

  userData: IUser = {
    id: -1,
    login: '',
    role: '',
    firstName: '',
    lastName: '',
    password: '',
    sex: '',
    age: 0,
    address: '',
    shippingAddress: '',
    paymentCard: ''
  };

  addLogin(value) {
    const reg = /^.+@.+\..+/;
    if (reg.test(value) === true) {
      this.userData.login = value;
      this.$store.commit('setUserData', this.userData);
      this.makeRequest();   
    } else {
      this.alertMessage = 'Invalid login!';
      this.showAlert(false);
    }
  }

  addFirstName(value) {
    this.userData.firstName = value;
    this.$store.commit('setUserData', this.userData);
    this.makeRequest();
  }

  addLastName(value) {
    this.userData.lastName = value;
    this.$store.commit('setUserData', this.userData);
    this.makeRequest();
  }

  addSex(value) {
    this.userData.sex = value;
    this.$store.commit('setUserData', this.userData);
    this.makeRequest();
  }

  addAge(value) {
    if (Number(value) > 0 && Number(value) < 121) {
      this.userData.age = value;
      this.$store.commit('setUserData', this.userData);
      this.makeRequest();
    } else {
      this.alertMessage = 'Invalid age value!';
      this.showAlert(false);
    }
  }

  addRole(value) {
    this.userData.role = value;
    this.$store.commit('setUserData', this.userData);
    this.makeRequest();
  }

  addAddress(value) {
    this.userData.address = value;
    this.$store.commit('setUserData', this.userData);
    this.makeRequest();
  }

  addShippingAddress(value) {
    this.userData.shippingAddress = value;
    this.$store.commit('setUserData', this.userData);
    this.makeRequest();
  }

  addPaymentCard(value) {
    const cardValue = value.replace(/\s+/g, '').trim();
    if (cardValue.length === 16) {
      this.userData.paymentCard = cardValue;
      this.$store.commit('setUserData', this.userData);
      this.makeRequest();
    } else {
      this.alertMessage = 'Invalid card number value!';
      this.showAlert(false);
    }
  }

  checkOldPassword(value) {
    console.log('test');
  }

  makeRequest() {
    axios
      .put(`http://localhost:3000/users/${this.$store.state.user.id}`, this.$store.state.user)
      .catch((error) => {
        if (error) {
          this.alertMessage = 'There were errors in the process :(';
          this.showAlert(false);
        }
      });
    if (!this.error) {
      this.alertMessage = 'Success!';
      this.showAlert(true);
    }
  }

  showAlert(isSuccess: boolean) {
    if (!isSuccess) {
      this.error = true;
      this.alert = true;
    } else {
      this.alert = true;
    }
    window.setTimeout(() => { 
      this.alert = false;
      this.error = false; 
    }, 2000)
  }
}
</script>

<style lang="scss">
  .user-profile {
    display: flex;
    margin-top: 5px;

    &__basic-info {
      width: 20%;
      text-align: center;
    }

    &__basic-info-view {
      margin: 0 0 5px 5px;
    }

    &__basic-info-img {
      width: 100%;
      margin-bottom: 5px;
      border-radius: 20px;
      border: 5px solid $color-black;
      background: $color-purple;
    }

    &__basic-info-signature {
      background: $color-purple;
      border-radius: 20px;
      border: 5px solid $color-black;
      width: 100%;
      font-size: 30px;
    }

    &__additional-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 76%;
      margin: 0 5px 5px 40px;
      font-size: 30px;
      border-radius: 20px;
      border: 5px solid $color-black;
      background: $color-purple;
      padding-left: 10px;
    }

    &__basic-add-name,
    &__basic-add-surname {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      text-align: center;
      padding: 0 35px;
    }

    &__role,
    &__sex,
    &__age,
    &__address,
    &__shipping-address,
    &__payment-card,
    &__password {
      width: 28%;
      margin: 5px 25px;
      text-align: center;
    }

    &__name-inscription,
    &__surname-inscription,
    &__sex-inscription,
    &__age-inscription,
    &__role-inscription,
    &__address-inscription,
    &__shipping-address-inscription,
    &__payment-card-inscription,
    &__login-inscription,
    &__password-inscription {
      font-size: 35px;
      font-weight: 600; 
    }

    &__edit-info {
      display: flex;
      justify-content: center;
    }

    &__edit-icon {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      background: $color-pink;
      margin: 5px 10px;
    }

    &__edit-icon:hover {
      background: $color-purple;
      transition: background 0.4s  ;
      cursor: pointer;
    }

    &__adding-plus {
      font-size: 40px;
      width: 46px;
      border-radius: 50px;
      background: $color-pink;
      margin: 5px auto 0;
    }

    &__adding-plus:hover {
      background: $color-purple;
      transition: background 0.4s  ;
      cursor: pointer;
    }
  }
</style>
