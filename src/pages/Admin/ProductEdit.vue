<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "ProductEdit",
  setup() {
    const title = ref('');
    const image = ref('');
    const likes = ref('');
    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      const response = await fetch(`http://localhost:8000/api/products/${route.params.id}`);
      const product = await response.json();
      title.value = product.title;
      image.value = product.image;
      likes.value = product.likes;
    });

    const submit = async () => {
      await fetch(`http://localhost:8000/api/products/${route.params.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: title.value,
          image: image.value,
          likes: likes.value,
        })
      });
      await router.push('/Admin/Product');
    };

    return {
      title,
      image,
      likes,
      submit
    };
  }
};
</script>

<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label>Description</label>
      <input v-model="title" class="form-control" name="title">
    </div>
    <div class="form-group">
      <label>IMAGE</label>
      <input v-model="image" class="form-control" name="image">
    </div>
    <div class="form-group">
      <label>STOK</label>
      <input v-model="likes" class="form-control" name="image">
    </div>
    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>
