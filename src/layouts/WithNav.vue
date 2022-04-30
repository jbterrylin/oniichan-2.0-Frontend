<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">呱唧呱唧汪汪汪</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <div v-for="item in items" v-bind:key="item">
            <li class="nav-item">
              <router-link to="/shop" class="nav-link active">{{item.title}}</router-link>
              <!-- <a class="nav-link active" aria-current="page" href="#">{{item.title}}</a> -->
            </li>
          </div>
        </ul>

        <form class="d-flex">
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle navbar-text" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              其他
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><router-link to="/shop" class="dropdown-item" href="#">店铺资料</router-link></li>
              <li><router-link to="/shop" class="dropdown-item" href="#">登出</router-link></li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </nav>
  <slot />
</template>


<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: '单', path: "paper" },
          { title: '顾客', path: "customer" },
          { title: '产品', path: "item" },
        ],
        mini: true,
      }
    },
    methods: {
      route(path) {
        Turbolinks.visit(path);
      }
    }
  }
</script>