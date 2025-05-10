<template>
  <q-layout class="bg-green-blue">
    <q-page-container>
      <q-page class="">
        <div class="row">
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-8 q-mt-lg">
            <q-card flat bordered class="q-ma-lg q-pa-none">
              <q-card-section class="q-pa-none">
                <div class="row">
                  <div class="col-12 col-md-6">
                    <div class="bg-fondo">
                      <q-carousel
                        v-model="slide"
                        transition-prev="scale"
                        transition-next="scale"
                        swipeable
                        animated
                        infinite
                        autoplay
                        control-color="white"
                        navigation
                        padding
                        arrows
                        :height="$q.screen.gt.sm ? '400px' : '270px'"
                        class="text-white shadow-1 rounded-borders bg-fondo"
                      >
                        <q-carousel-slide
                          v-for="(slide, index) in slides"
                          :key="index"
                          :name="slide.name"
                          class="column no-wrap flex-center"
                        >
                          <q-icon :name="slide.icon" size="56px" />
                          <div class="text-center">
                            <div class="q-mb-xs text-bold">{{ slide.title }}</div>
                            <p class="text-caption">{{ slide.description }}</p>
                          </div>
                        </q-carousel-slide>
                        <template v-slot:control>
                          <q-carousel-control
                            position="top-left"
                            :offset="[18, 18]"
                            class="text-white rounded-borders"
                          >
                            <img src="logo-light.png" width="140" />
                          </q-carousel-control>
                        </template>
                      </q-carousel>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="row q-ma-lg">
                      <div class="col-12">
                        <div class="text-grey">Bienvenido a</div>
                        <div class="text-h5 text-bold">Educacion</div>
                      </div>
                      <div class="col-12">
                        <label class="text-subtitle">Usuario</label>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-2"></div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      autoplay: true,
      slide: 'math',
      slides: [
        { name: 'math', icon: 'calculate', title: 'Matemáticas', description: 'Desarrolla el pensamiento lógico y la resolución de problemas.' },
        { name: 'science', icon: 'science', title: 'Ciencia', description: 'Explora el mundo a través de la experimentación y el descubrimiento.' },
        { name: 'book', icon: 'menu_book', title: 'Lectura', description: 'Fomenta la comprensión, la creatividad y el pensamiento crítico.' },
        { name: 'computer', icon: 'computer', title: 'Tecnología', description: 'Aprende habilidades digitales esenciales para el futuro.' },
        { name: 'sports', icon: 'sports_soccer', title: 'Educación Física', description: 'Promueve la salud, el trabajo en equipo y la disciplina.' },
      ],
    };
  },
  methods: {
    // Define your methods here
  },
};
</script>
<style>
.bg-green-blue {
  background-image:
    linear-gradient(to bottom right, rgba(12, 202, 176, 0.7), rgba(64, 81, 137, 0.7)),
    url('./../cover-pattern.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}
.bg-fondo {
  background-image:
    linear-gradient(to bottom right,rgba(64, 81, 137, 0.7)),
    url('./../auth-one-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

</style>
