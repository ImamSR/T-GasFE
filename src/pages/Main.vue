<script lang="ts">
  import {ref, onMounted} from "vue";
  import {Product} from "@/interfaces/product";
  import Nav from "@/components/Nav.vue";

  export default {
    name: "Main",
    components: {Nav},
    setup(){
      const products = ref([] as Product[]);

      onMounted(async () => {
        const response =  await fetch('http://localhost:8000/api/products');

        products.value = await response.json();
      });

      const like = async (id: number) =>{

        await fetch(`http://localhost:8000/api/products/${id}/like`,{
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
        });

        products.value = products.value.map(
            (p: Product) => {
              if (p.id === id) {
              p.likes++;
              }
              return p;
            }
        );
      }

      return{
        products,
        like
      }
    }
  };
</script>

<template>
  <main role="main">
    <Nav />
    <div class="pt-3 pb-2 mb-3 border-bottom">
      <div class="btn-toolbar mb-2 mb-md-0">
        <router-link to="/Admin/Product" class="btn btn-sm btn-outline-secondary">Admin View</router-link>
      </div>
    </div>


    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-md-4" v-for="product in products" :key="product.id">
            <div class="card mb-4 shadow-sm">
              <img :src="product.image" height="100" />
              <div class="card-body">
                <p class="card-text">{{ product.id }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-secondary" @click="like(product.id)">Add to chart</button>
                  </div>
                  <small class="text-muted">{{ product.likes }} Stok</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

</template>
