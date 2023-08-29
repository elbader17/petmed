import { ref, onMounted } from 'vue';

export const useCheckScreen = () => {

  const mobile = ref(null);
  const mobileL = ref(null);
  const mobileNav = ref(null);

  const toggleMobileNav = () => {
    mobileNav.value = !mobileNav.value;
  }

  onMounted(() => {
    window.addEventListener('resize', checkScreen);
    checkScreen();
  })
  
  const checkScreen = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 1024 && windowWidth > 768) {
      mobileL.value = true;
      mobile.value = false;
      return;
    }
    if (windowWidth <= 768) {
      mobileL.value = true;
      mobile.value = true;
      return;
    }
    mobile.value = false;
    mobileL.value = false;
    mobileNav.value = false;
    return;
  }

  return {
    mobile,
    mobileL,
    mobileNav,
    toggleMobileNav
  }
}