<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <div class="btn-toolbar mb-2 mb-md-0">
      <router-link to="/Admin/Product/ProductCreate" class="btn btn-sm btn-outline-secondary">Add</router-link>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th>#</th>
        <th>Image</th>
        <th>Title</th>
        <th>Stok</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td><img :src="product.image" height="50"/></td>
        <td>{{ product.title }}</td>
        <td>{{ product.likes }}</td>
        <td>
          <div class="btn-group mr-2">
            <router-link :to="`/Admin/Product/${product.id}/ProductEdit`" class="btn btn-sm btn-outline-secondary">Edit</router-link>
            <a href="#" class="btn btn-sm btn-outline-secondary" @click="del(product.id)">Delete</a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "Product",
  setup() {
    const products = ref([]);

    onMounted(async () => {
      const response = await fetch('http://localhost:8000/api/products');
      products.value = await response.json();
    });

    const del = async (id) => {
      if (confirm('Are you sure you want to delete')) {
        await fetch(`http://localhost:8000/api/products/${id}`, {
          method: 'DELETE'
        });

        products.value = products.value.filter((p) => p.id !== id);
      }
    };

    return {
      products,
      del
    };
  }
};
</script>
