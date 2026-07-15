<template>
  <div class="app-shell relative min-h-screen">
    <div class="palm-background pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div class="absolute left-0 top-8 w-80 lg:w-96 palm-real opacity-30">
        <svg viewBox="0 0 300 400" class="w-full">
          <path d="M165 360 Q140 230 120 180 Q90 140 60 100 Q70 130 110 160 Q135 190 150 235 Q160 275 165 360Z" fill="rgba(74,158,107,0.24)"/>
          <path d="M160 260 C155 210 140 170 120 145 C130 165 135 190 145 220 C152 240 158 250 160 260Z" fill="rgba(74,158,107,0.18)"/>
          <path d="M160 260 C175 220 190 190 210 170 C198 182 180 205 164 232 C158 242 154 250 160 260Z" fill="rgba(45,110,71,0.16)"/>
          <path d="M148 210 Q120 138 82 110 Q100 140 130 180 Q150 210 148 210Z" fill="rgba(26,74,46,0.14)"/>
        </svg>
      </div>
      <div class="absolute right-0 top-8 w-72 lg:w-80 palm-real opacity-28 scale-x-[-1]">
        <svg viewBox="0 0 300 400" class="w-full">
          <path d="M160 360 Q135 230 115 180 Q85 140 55 100 Q65 130 105 160 Q130 190 145 235 Q155 275 160 360Z" fill="rgba(74,158,107,0.22)"/>
          <path d="M155 260 C150 210 135 170 115 145 C125 165 130 190 140 220 C147 240 153 250 155 260Z" fill="rgba(74,158,107,0.16)"/>
          <path d="M155 260 C170 220 185 190 205 170 C193 182 175 205 159 232 C153 242 149 250 155 260Z" fill="rgba(45,110,71,0.14)"/>
          <path d="M143 210 Q115 138 77 110 Q95 140 125 180 Q145 210 143 210Z" fill="rgba(26,74,46,0.12)"/>
        </svg>
      </div>
    </div>

    <router-view v-slot="{ Component, route }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>