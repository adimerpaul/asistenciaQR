<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black" bordered>
      <q-toolbar>
        <q-btn
          flat
          color="primary"
          :icon="leftDrawerOpen ? 'keyboard_double_arrow_left' : 'keyboard_double_arrow_right'"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          unelevated
        />
        <q-toolbar-title>
          <span class="text-caption text-bold">
            {{ $version }}
          </span>
        </q-toolbar-title>

        <div>
          <q-btn-dropdown flat unelevated no-caps dropdownIcon="expand_more">
            <template v-slot:label>
              <q-avatar rounded>
<!--                <q-icon name="account_circle" />-->
                <q-img :src="`${$url}uploads/${$store.user.avatar}`" width="40px" height="40px" v-if="$store.user.avatar" />
                <pre>asa</pre>
              </q-avatar>
              <div class="text-center" style="line-height: 1">
                <div style="width: 100px; white-space: normal; overflow-wrap: break-word;">
                  {{ $store.user.name }}
                </div>
              </div>
            </template>
            <q-item clickable v-ripple @click="logout" v-close-popup>
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Salir</q-item-label>
              </q-item-section>
            </q-item>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      show-if-above
      :width="200"
      :breakpoint="500"
      class="bg-primary text-white"
    >
      <q-list>
        <q-item-label header class="text-center">
<!--          <template v-if="$store.user.agencia" >-->
            <q-img src="/logo-light.png" width="100px"  />
<!--          </template>-->
        </q-item-label>

        <template v-for="link in filteredLinks" :key="link.title">
          <q-item clickable :to="link.link" exact
                  class="text-black"
                  active-class="menu"
                  dense
                  v-close-popup
          >
            <q-item-section avatar>
              <q-icon :name="$route.path === link.link ? 'o_' + link.icon : link.icon"
                      :class="$route.path === link.link ? 'text-black' : ''" />
            </q-item-section>
            <q-item-section>
              <q-item-label :class="$route.path === link.link ? 'text-black text-bold' : ''">
                {{ link.title }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <q-item clickable class="text-black" @click="logout" v-close-popup>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Salir</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, getCurrentInstance, ref } from 'vue'

const { proxy } = getCurrentInstance()

const linksList = [
  {title: 'Principal', icon: 'home', link: '/', can: 'Todos'},
  {title: 'Usuarios', icon: 'people', link: '/usuarios', can: 1},
  {title: 'Productos', icon: 'inventory', link: '/productos', can: 2},
  {title: 'Ventas', icon: 'shopping_cart', link: '/ventas', can: 4},
  {title: 'Crear Ventas', icon: 'add_shopping_cart', link: '/ventas/add', can: 3},
  {title: 'Mascotas', icon: 'pets', link: '/mascotas', can: 6},
  {title: 'Crear Mascota', icon: 'group_add', link: '/mascotas/create', can: 5},
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  proxy.$alert.dialog('¿Desea salir del sistema?')
    .onOk(() => {
      proxy.$store.isLogged = false
      proxy.$store.user = {}
      localStorage.removeItem('tokenAsistencia')
      proxy.$router.push('/login')
    })
}

const filteredLinks = computed(() => {
  const userPermissions = proxy.$store.user.userPermisos || []

  const permissionIds = userPermissions.map(p => p.permisoId)

  return linksList.filter(link => {
    if (link.can === 'Todos') {
      return true
    }
    return permissionIds.includes(link.can)
  })
})
</script>

<style>
.menu {
  background-color: #fff;
  color: #000 !important;
  border-radius: 10px;
  margin: 5px;
  padding: 5px
}
</style>
