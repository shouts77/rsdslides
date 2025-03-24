  // Swiper 초기화
  var swiper = new Swiper(".mySwiper", {
    // 기본 설정
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    
    // 자동 재생
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    
    // 페이지네이션
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    
    // 네비게이션 버튼
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    
    // 효과
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
  });
  
  // 전체화면 기능
  const swiperElement = document.getElementById('mySwiper');
  const fullscreenButton = document.getElementById('fullscreenButton');
  const fullscreenText = document.getElementById('fullscreenText');
  
  fullscreenButton.addEventListener('click', toggleFullScreen);
  
  function toggleFullScreen() {
    if (!document.fullscreenElement && 
        !document.mozFullScreenElement && 
        !document.webkitFullscreenElement && 
        !document.msFullscreenElement) {
      // 전체화면 모드로 전환
      if (swiperElement.requestFullscreen) {
        swiperElement.requestFullscreen();
      } else if (swiperElement.msRequestFullscreen) {
        swiperElement.msRequestFullscreen();
      } else if (swiperElement.mozRequestFullScreen) {
        swiperElement.mozRequestFullScreen();
      } else if (swiperElement.webkitRequestFullscreen) {
        swiperElement.webkitRequestFullscreen();
      }
      fullscreenText.textContent = '전체화면 종료';
    } else {
      // 전체화면 종료
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      fullscreenText.textContent = '전체화면';
    }
  }
  
  // 전체화면 상태 변경 이벤트 감지
  document.addEventListener('fullscreenchange', updateFullscreenButtonText);
  document.addEventListener('webkitfullscreenchange', updateFullscreenButtonText);
  document.addEventListener('mozfullscreenchange', updateFullscreenButtonText);
  document.addEventListener('MSFullscreenChange', updateFullscreenButtonText);
  
  function updateFullscreenButtonText() {
    if (document.fullscreenElement || 
        document.mozFullScreenElement || 
        document.webkitFullscreenElement || 
        document.msFullscreenElement) {
      fullscreenText.textContent = '전체화면 종료';
    } else {
      fullscreenText.textContent = '전체화면';
    }
  }