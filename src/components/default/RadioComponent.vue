<template>
  <div class="radioComponent">
    <div class="radioComponent-btn" @click="changeRadio(propRadio.value1)">
      <input type="radio"
             id="radio1"
             v-model="value"
             :value="propRadio.value1"
             class="radioComponent-btn__radio">
      <label for="radio1" class="radioComponent-btn__label">{{propRadio.value1}}</label>
    </div>
    <div class="radioComponent-btn" @click="changeRadio(propRadio.value2)">
      <input type="radio"
             id="radio2"
             v-model="value"
             :value="propRadio.value2"
             class="radioComponent-btn__radio">
      <label for="radio2" class="radioComponent-btn__label">{{propRadio.value2}}</label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RadioComponent',
    props: {
      propRadio: {
        type: Object
      }
    },
    data() {
      return {
        value: this.propRadio.value1
      }
    },
    methods: {
      changeRadio(value) {
        this.$emit('changeRadio', value);
      }
    }
  }
</script>

<style scoped lang="less">
  .radioComponent {
    display: flex;
    margin-bottom: 30px;

    &-btn {
      &__radio {
        display: none;
      }

      &__label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 40px;
        background-color: #e4e4e4;
        cursor: pointer;
        transition: .4s;
        font-size: 20px;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        letter-spacing: 1.2px;
        color: #434343;
      }

      &__radio:checked + &__label {
        background-color: #343434;
        color: #e4e4e4;
      }
    }
  }
</style>
