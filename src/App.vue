<script setup lang="ts">
import HeaderNav from './components/HeaderNav.vue'
import IntroSection from './components/IntroSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'
import AiChatWidget from './components/AiChatWidget.vue'
</script>

<template>
  <div class="page-container">
    <HeaderNav />
    <main>
      <IntroSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </main>
    <AiChatWidget />
  </div>
  
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background: var(--bg);
  color: var(--fg);
}
main {
  scroll-behavior: smooth;
}
</style>
