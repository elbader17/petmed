import { ref, onMounted, onUnmounted } from 'vue';

export const useCheckScreen = () => {
  const mobile = ref(false);
  const mobileL = ref(false);
  const mobileNav = ref(false);

  const toggleMobileNav = () => {
    mobileNav.value = !mobileNav.value;
  }

  const checkScreen = () => {
    const windowWidth = window.innerWidth;
    mobileL.value = windowWidth <= 1024;
    mobile.value = windowWidth <= 768;
    if (windowWidth > 1024) {
      mobileNav.value = false;
    }
  }

  onMounted(() => {
    window.addEventListener('resize', checkScreen);
    checkScreen();
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreen);
  })

  return {
    mobile,
    mobileL,
    mobileNav,
    toggleMobileNav
  }
}