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
  
  // 필요한 요소 가져오기
  const body = document.body;
  const swiperElement = document.getElementById('mySwiper');
  const fullscreenButton = document.getElementById('fullscreenButton');
  const fullscreenText = document.getElementById('fullscreenText');
  
  // 안드로이드 여부 확인 (UA 스니핑)
  const isAndroid = /android/i.test(navigator.userAgent);
  
  // 전체화면 상태 변수
  let isInFullscreenMode = false;
  
  // 전체화면 전환 이벤트 리스너
  fullscreenButton.addEventListener('click', toggleFullScreen);
  
  // 전체화면 토글 함수
  function toggleFullScreen() {
    if (isInFullscreenMode) {
      exitCustomFullscreen();
    } else {
      // 표준 전체화면 API 먼저 시도
      try {
        if (swiperElement.requestFullscreen) {
          swiperElement.requestFullscreen();
        } else if (swiperElement.mozRequestFullScreen) {
          swiperElement.mozRequestFullScreen();
        } else if (swiperElement.webkitRequestFullscreen) {
          swiperElement.webkitRequestFullscreen();
        } else if (swiperElement.msRequestFullscreen) {
          swiperElement.msRequestFullscreen();
        } else {
          // 표준 API 실패 시 커스텀 전체화면 사용
          enterCustomFullscreen();
        }
      } catch (error) {
        console.log("표준 전체화면 API 실패, 커스텀 방식으로 전환: ", error);
        enterCustomFullscreen();
      }
    }
  }
  
  // 커스텀 전체화면 진입
  function enterCustomFullscreen() {
    body.classList.add('fullscreen-mode');
    isInFullscreenMode = true;
    fullscreenText.textContent = '전체화면 종료';
    updateSwiperSize();
    
    // 화면 방향 변경 시 스와이퍼 업데이트
    window.addEventListener('resize', updateSwiperSize);
    window.addEventListener('orientationchange', updateSwiperSize);
    
    // 안드로이드에서는 뒤로가기 버튼을 감지해서 전체화면 종료
    if (isAndroid) {
      window.addEventListener('popstate', handleBackButton);
      // 히스토리에 상태 추가
      history.pushState({ fullscreen: true }, '');
    }
  }
  
  // 커스텀 전체화면 종료
  function exitCustomFullscreen() {
    body.classList.remove('fullscreen-mode');
    isInFullscreenMode = false;
    fullscreenText.textContent = '전체화면';
    updateSwiperSize();
    
    // 이벤트 리스너 제거
    window.removeEventListener('resize', updateSwiperSize);
    window.removeEventListener('orientationchange', updateSwiperSize);
    
    // 안드로이드 뒤로가기 이벤트 리스너 제거
    if (isAndroid) {
      window.removeEventListener('popstate', handleBackButton);
    }
  }
  
  // 안드로이드 뒤로가기 버튼 처리
  function handleBackButton(event) {
    if (isInFullscreenMode) {
      event.preventDefault();
      exitCustomFullscreen();
      history.go(1); // 뒤로가기 후 다시 앞으로 가기
    }
  }
  
  // Swiper 크기 업데이트
  function updateSwiperSize() {
    // setTimeout을 사용하여 DOM 업데이트 후 실행되도록 보장
    setTimeout(() => {
      swiper.update();
      
      // 전체화면에서 이미지가 화면에 맞게 조정되도록
      if (isInFullscreenMode) {
        const slides = document.querySelectorAll('.swiper-slide-img');
        slides.forEach(img => {
          img.style.maxHeight = window.innerHeight + 'px';
        });
      } else {
        const slides = document.querySelectorAll('.swiper-slide-img');
        slides.forEach(img => {
          img.style.maxHeight = '';
        });
      }
    }, 300);
  }
  
  // 표준 전체화면 API 상태 변경 이벤트 감지
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.addEventListener('mozfullscreenchange', handleFullscreenChange);
  document.addEventListener('MSFullscreenChange', handleFullscreenChange);
  
  // 표준 전체화면 상태 변경 처리
  function handleFullscreenChange() {
    const isStandardFullscreen = Boolean(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
    
    if (isStandardFullscreen) {
      fullscreenText.textContent = '전체화면 종료';
      updateSwiperSize();
    } else {
      // 표준 전체화면이 종료되면 커스텀 전체화면도 종료
      if (isInFullscreenMode) {
        exitCustomFullscreen();
      }
      fullscreenText.textContent = '전체화면';
      updateSwiperSize();
    }
  }
  
  // 화면 회전 시 이미지 크기 조정
  window.addEventListener('orientationchange', function() {
    setTimeout(updateSwiperSize, 300);
  });