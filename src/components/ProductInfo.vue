<template>
  <div class="product">
    <Section :headerName="sectionName" class="product__section">
      <div class="product__wrap">
        <div class="product__product-image-wrap">
          <div class="product__image-inscription">
            Product image
          </div><br>
          <img :src="require('@/img/products/' + product.productImagePath)" alt="Product image" 
          class="product__image">
          <div class="product__image-field">
            Image 
            <input class="product__image-input" type="file" accept="image/*" 
            @input="setImageName">
          </div>
          <div class="product__description-field">
            Description 
            <textarea class="product__description-input" :placeholder="'Enter description'" 
            @input="setDescription" v-model="product.productDescription"/>
          </div>
          <div class="product__announcement-field">
            Announcement date 
            <Input class="product__input product__announcement-input" 
            :inputType="'date'" :placeholder="'Enter country'" 
            :content="product.announcementDate"
            @input-event="setAnnouncementDate"/>
          </div>
        </div>
        <div class="product__product-info">
          <div class="product__information-inscription">
            Information
          </div>
          <div class="product__product-fields">
            <div class="product__field">
              Id 
              <Input class="product__input" :placeholder="'Enter product id'" 
              :content="product.id"
              :inputType="'number'" @input-event="setId"/>
            </div>
            <div class="product__field">
              Name 
              <Input class="product__input" :placeholder="'Enter product name'" 
              :content="product.productName"
              @input-event="setName"/>
            </div>
            <div class="product__field">
              Genre 
              <Input class="product__input" :placeholder="'Enter categories'" 
              :content="product.productGenre"
              @input-event="setGenre"/>
            </div>
            <div class="product__field">
              Price 
              <Input class="product__input" :placeholder="'Enter price'" :inputType="'number'"
              :content="product.productPrice" @input-event="setPrice"/>
            </div>
            <div class="product__field">
              Publisher 
              <Input class="product__input" :placeholder="'Enter publisher'"
               :content="product.publisher" @input-event="setPublisher"/>
            </div>
            <div class="product__field">
              Country 
              <Input class="product__input" :placeholder="'Enter country'"
              :content="product.country" @input-event="setCountry"/>
            </div>
            <div class="product__field">
              Edition 
              <Input class="product__input" :placeholder="'Enter edition'"
              :content="product.edition" @input-event="setEdition"/>
            </div>
            <div class="product__field">
              Creation date 
              <Input class="product__input" :inputType="'date'" :placeholder="'Enter creation date'"
              :content="product.creationDate" @input-event="setCreationDate"/>
            </div>
            <div class="product__field">
              Tags 
              <Input class="product__input" :placeholder="'Enter tags'"
              :content="product.tags" @input-event="setTags"/>
            </div>
            <div class="product__requirements">
              System requirements 
              <textarea class="product__requirements-input" v-model="product.systemRequirements"
              :placeholder="'Enter system requirements'" @input="setRequirements"/>
            </div>
            <div class="product__platform-field">
              Platform
              <div class="product__platform-checkboxes">
                <div class="product__platform-checkbox">
                  <input class="product__platform-input" type="checkbox" 
                  v-model="product.categoryId" :value="Number(1)">
                  PC
                </div>
                <div class="product__platform-checkbox">
                  <input class="product__platform-input" type="checkbox" 
                  v-model="product.categoryId" :value="Number(2)">
                  PS
                </div>
                <div class="product__platform-checkbox">
                  <input class="product__platform-input" type="checkbox" 
                  v-model="product.categoryId" :value="Number(3)">
                  Xbox
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
      <div class="product__buttons">
        <router-link to="/admin/products" class="product__button-link">
          <button class="product__cancel-button">
            Cancel
          </button>
        </router-link>
        <button class="product__confirm-button" @click="confirmAdding">
          Confirm
        </button>
      </div>
    </Section>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import Section from '@/components/Section.vue';
import Alert from '@/components/Alert.vue';
import { IProduct } from '@/interfaces';
import Input from '@/components/Input.vue';

enum AlertMessages {
  errorMessage = 'There were errors in the process :(',
  alreadyExixstMessage = 'Product with this id already exists',
  successMessage = 'Success!'
}

enum ErrorMessages {
  emptyId = 'The "Id" field is empty or incorrect',
  emptyName = 'The "Name" field is empty',
  emptyCategory = 'The "Platforms" field is empty',
  emptyDescription = 'The "Description" field is empty',
  emptyPrice = 'The "Price" field has null-value',
  emptyGenre = 'The "Genre" field is empty',
  emptyImage = 'The "Image path" field is empty',
  emptyCreationDate = 'The "Creation date" field is empty',
  emptyPublisher = 'The "Publisher" field is empty',
  emptyCountry = 'The "Country" field is empty',
  emptyEdition = 'The "Edition" field is empty',
  emptyAnnouncementDate = 'The "Announcement date" field is empty',
  emptyTags = 'The "Tags" field is empty',
  emptySystemRequirements = 'The "System requirements" field is empty',
}

@Options({
  components: {
    Section,
    Input,
    Alert
  },
  props: {
    productId: {
      type: String,
      default: '-1'
    },
    sectionName: {
      type: String,
      default: 'Products'
    }
  },
  mounted() {
    if (this.productId !== '-1') {
      this.isEditing = true;
      axios
        .get(`http://localhost:3000/products/${this.productId}`)
        .then((response) => {
          this.product = response.data;
        })
    }
  }
})

export default class AdminAdd extends Vue {
  requirementsValue = '';
  isEditing = false;

  alertMessage = {
    isSuccess: false,
    message: ''
  }
  
  product: IProduct = {
    id: -1,
    categoryId: [1],
    productName: '',
    productDescription: '',
    productPrice: 0,
    productGenre: '', 
    productRating: 0,
    productImagePath: 'defaultImage.png',
    creationDate: '',
    publisher: '',
    country: '',
    edition: '',
    announcementDate: '',
    tags: '',
    systemRequirements: ''
  };

  setId(value) {
    this.product.id = value;
  }

  setName(value) {
    this.product.productName = value;
  }

  setGenre(value) {
    this.product.productGenre = value;
  }

  setImageName(event) {
    this.product.productImagePath = event.target.files[0].name;
  }

  setPrice(value) {
    this.product.productPrice = value;
  } 

  setPublisher(value) {
    this.product.publisher = value;
  }

  setCountry(value) {
    this.product.country = value;
  }

  setEdition(value) {
    this.product.edition = value;
  }
  setTags(value) {
    this.product.tags = value;
  }

  setAnnouncementDate(value) {
    this.product.announcementDate = value;
  }

  setCreationDate(value) {
    this.product.creationDate = value;
  }

  setRequirements(event) {
    this.product.systemRequirements = event.target.value;
  }

  setDescription(event) {
    this.product.productDescription = event.target.value;
  }

  checkFields() {
    if (!this.product.id || this.product.id < 1) {
      this.alertMessage.message = ErrorMessages.emptyId;
      return false;
    }

    if (this.product.categoryId.length === 0) {
      this.alertMessage.message = ErrorMessages.emptyCategory;
      return false;
    }

    if (!this.product.productName) {
      this.alertMessage.message = ErrorMessages.emptyName;
      return false;
    }

    if (!this.product.productDescription) {
      this.alertMessage.message = ErrorMessages.emptyDescription;
      return false;
    }

    if (this.product.productPrice === 0) {
      this.alertMessage.message = ErrorMessages.emptyPrice;
      return false;
    }

    if (!this.product.productGenre) {
      this.alertMessage.message = ErrorMessages.emptyGenre;
      return false;
    }

    if (!this.product.productImagePath) {
      this.alertMessage.message = ErrorMessages.emptyImage;
    }

    if (!this.product.creationDate) {
      this.alertMessage.message = ErrorMessages.emptyCreationDate;
      return false;
    }

    if (!this.product.publisher) {
      this.alertMessage.message = ErrorMessages.emptyPublisher;
      return false;
    }

    if (!this.product.country) {
      this.alertMessage.message = ErrorMessages.emptyCountry;
      return false;
    }

    if (!this.product.edition) {
      this.alertMessage.message = ErrorMessages.emptyEdition;
      return false;
    }

    if (!this.product.announcementDate) {
      this.alertMessage.message = ErrorMessages.emptyAnnouncementDate;
      return false;
    }

    if (!this.product.tags) {
      this.alertMessage.message = ErrorMessages.emptyTags;
      return false;
    }

    if (!this.product.systemRequirements) {
      this.alertMessage.message = ErrorMessages.emptySystemRequirements;
      return false;
    }

    this.alertMessage.isSuccess = true;
    this.alertMessage.message = AlertMessages.successMessage;
    return true;
  }

  confirmAdding() {
    if (this.checkFields()) {
      axios
        .get(`http://localhost:3000/products?id_like=${this.product.id}`)
        .then((response) => {
          if (!this.isEditing && response.data.length === 0) {
            this.sortCategories();
            axios
              .post('http://localhost:3000/products', this.product)
              .catch((error) => {
                this.catchRequestError(error);
              })
              .then(() => {
                this.$emit('confirmation', this.alertMessage);
                this.alertMessage.isSuccess = false;
              });
          } else if (this.isEditing && response.data.length < 2) {
            axios
              .put(`http://localhost:3000/products/${this.product.id}`, this.product)
              .catch((error) => {
                this.catchRequestError(error);
              })
              .then(() => {
                this.$emit('confirmation', this.alertMessage);
                this.alertMessage.isSuccess = false;
              });
          } else {
            this.alertMessage.message = AlertMessages.alreadyExixstMessage;
            this.alertMessage.isSuccess = false;
            this.$emit('confirmation', this.alertMessage)
          }
        })
    } else {
      this.alertMessage.isSuccess = false;
      this.$emit('confirmation', this.alertMessage);
    }
  }

  catchRequestError(error) {
    if (error) {
      this.alertMessage.isSuccess = false;
      this.alertMessage.message = AlertMessages.errorMessage;
    } else {
      this.alertMessage.isSuccess = true;
      this.alertMessage.message = AlertMessages.successMessage;
    }
  }

  sortCategories() {
    this.product.categoryId.sort((a, b) => Number(a) - Number(b));
  }
}
</script>

<style lang="scss" scoped>
.product {

  &__section {
    width: 65%;
  }

  &__wrap {
    display: flex;
    justify-content: space-evenly;
  }

  &__product-image-wrap {
    width: 30%;
    text-align: center;
  }

  &__image {
    object-fit: cover;
    width: 235px;
    height: 296px;
    border: 5px solid $color-orange;
    border-radius: 15px;
  }

  &__image-inscription {
    font-size: 30px;
    color: $color-orange;
    text-align: left;
  }

  &__product-info {
    width: 45%;
  }

  &__information-inscription {
    font-size: 30px;
    color: $color-orange;
    text-align: left;
  }

  &__product-fields {
    width: 90%;
    float: right;
  }

  &__field {
    display: flex;
    justify-content: space-between;
    font-size: 27px;
    color: $color-pink;
    margin-top: 10px;
    line-height: 40px;
  }

  &__input {
    width: 50%;
    height: 40px;
    font-size: 23px;
    margin-right: 50px;
  }

  &__requirements {
    display: flex;
    font-size: 27px;
    color: $color-pink;
    margin-top: 10px;
  }

  &__description-input,
  &__requirements-input {
    height: 200px;
    width: 62%;
    resize: none;
    font-size: 20px;
    border: 2px solid $color-black;
    border-radius: 15px;
    background: $color-orange;
    
    &::placeholder {
      color: $placeholder;
    }
  }

  &__requirements-input {
    width: 100%;
  }

  &__platform-checkboxes {
    display: flex;
    justify-content: space-between;
  }

  &__platform-checkbox {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 30px;
    color: $color-orange;
  }

  &__platform-field {
    font-size: 27px;
    color: $color-pink;
    margin-top: 10px;
  }

  &__platform-input {
    width: 25px;
    height: 25px;
  }

  &__description-field,
  &__image-field {
    font-size: 27px;
    text-align: left;
    color: $color-pink;
    margin-top: 10px;
  }

  &__description-input {
    width: 100%;
  }

  &__image-input {
    width: 100%;
    font-size: 20px;
    border: 2px solid black;
    background: $color-orange;

  }
  
  &__announcement-field {
    font-size: 27px;
    text-align: left;
    color: $color-pink;
  }

  &__announcement-input {
    width: 60%;
  }

  &__buttons {
    display: flex;
    justify-content: right;
    margin-top: 40px;
  }

  &__button-link {
    width: 18%;
    margin: 10px;
    margin-left: 80px;
  }

  &__confirm-button {
    width: 18%;
    margin: 10px;
    margin-left: 80px;
    height: 50px;
    border: 2px solid $color-black;
    border-radius: 15px;
    font-size: 25px;
    background: $color-pink;
    cursor: pointer;
  }

  &__cancel-button {
    width: 100%;
    height: 50px;
    border: 2px solid $color-black;
    border-radius: 15px;
    font-size: 25px;
    background: $color-pink;
    cursor: pointer;
  }

  &__cancel-button:hover {
    transition: background 0.5s;
    background: $color-orange;
  }

  &__confirm-button {
    background: $color-orange;

    &:hover {
      transition: background 0.5s;
      background: $color-pink;
    }
  }
}
</style>
