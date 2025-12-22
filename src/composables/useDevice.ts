import { ref, onMounted } from 'vue'

export function useDevice() {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)

  const detectDevice = () => {
    const ua = navigator.userAgent.toLowerCase()

    const tabletReg = /ipad/.test(ua) || (/android/.test(ua) && !/mobile/.test(ua));
    const mobileReg = /iphone|ipod|android|blackberry|windows phone|opera mini|mobile/.test(ua);

    if (tabletReg) {
      isTablet.value = true
      isMobile.value = false
      isDesktop.value = false
    }
    else if (mobileReg) {
      isMobile.value = true
      isTablet.value = false
      isDesktop.value = false
    }
    else {
      isDesktop.value = true
      isMobile.value = false
      isTablet.value = false
    }
  }

  onMounted(detectDevice)

  return {
    isMobile,
    isTablet,
    isDesktop
  }
}