/**
 * 동래 푸르지오 에듀포레 - Main JavaScript
 * Benchmarked from official PRUGIO website interactions
 */
(function () {
  'use strict';

  /* ============================================
     AOS INIT
     ============================================ */
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });

  /* ============================================
     HEADER SCROLL BEHAVIOR
     Based on official site: transparent → white on scroll/hover
     ============================================ */
  const header = document.getElementById('header');

  function updateHeader() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header.classList.add('on');
    } else {
      header.classList.remove('on');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Hover: show white bg on hover even if at top
  header.addEventListener('mouseenter', () => {
    if (window.scrollY <= 50) header.classList.add('on');
  });
  header.addEventListener('mouseleave', () => {
    if (window.scrollY <= 50) header.classList.remove('on');
  });

  /* ============================================
     HAMBURGER NAV
     ============================================ */
  const hamburgerBtn = document.querySelector('.hamburger');
  const hamburgerNav = document.querySelector('.hamburger-nav');
  const hamburgerClose = document.querySelector('.hamburger-close');
  const hamburgerDim = document.querySelector('.hamburger-dim');

  function openMenu() {
    hamburgerNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburgerNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMenu);
  if (hamburgerClose) hamburgerClose.addEventListener('click', closeMenu);
  if (hamburgerDim) hamburgerDim.addEventListener('click', closeMenu);

  // Mobile sub-menu accordion
  document.querySelectorAll('.hamburger-inner > ul > li > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const li = this.closest('li');
      const sub = li.querySelector('ul');
      if (sub) {
        e.preventDefault();
        li.classList.toggle('open');
        // Close others
        document.querySelectorAll('.hamburger-inner > ul > li').forEach(function (other) {
          if (other !== li) other.classList.remove('open');
        });
      }
    });
  });

  /* ============================================
     HOVER_ANI - 4-Corner Border Line Animation
     Based on official site common.js
     ============================================ */
  function initHoverAni() {
    const hoverItems = document.querySelectorAll('.hover_ani');
    hoverItems.forEach(function (el) {
      // Add 4 lines
      for (let i = 0; i < 4; i++) {
        const span = document.createElement('span');
        span.className = 'line';
        el.prepend(span);
      }
      // Apply custom color and line size
      const color = el.dataset.color || 'rgba(255,255,255,0.5)';
      const lineSize = el.dataset.line || '2px';
      const lines = el.querySelectorAll('.line');
      lines.forEach(function (line) {
        line.style.background = color;
      });
      // Vertical lines (1, 3)
      lines[0].style.width = lineSize;
      lines[2].style.width = lineSize;
      // Horizontal lines (2, 4)
      lines[1].style.height = lineSize;
      lines[3].style.height = lineSize;
    });
  }
  initHoverAni();

  /* ============================================
     HERO VISUAL - SplitType-style char animation
     ============================================ */
  function splitChars(el) {
    const paragraphs = el.querySelectorAll('p');
    paragraphs.forEach(function (p) {
      const text = p.innerText;
      p.innerHTML = '';
      text.split('').forEach(function (char) {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        p.appendChild(span);
      });
    });
  }

  function animateChars(el, delay) {
    const chars = el.querySelectorAll('.char');
    chars.forEach(function (char, i) {
      setTimeout(function () {
        char.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        char.style.opacity = '1';
        char.style.transform = 'translateY(0)';
      }, delay + i * 40);
    });
  }

  function animateVisualLine(delay) {
    const line = document.querySelector('.visual-line');
    if (!line) return;
    setTimeout(function () {
      line.style.transition = 'width 1s ease';
      line.style.width = '80px';
    }, delay);
  }

  function animateVisualLogo(delay) {
    const logo = document.querySelector('.visual-logo');
    if (!logo) return;
    setTimeout(function () {
      logo.style.transition = 'opacity 1s ease, transform 1s ease';
      logo.style.opacity = '1';
      logo.style.transform = 'translateY(0)';
    }, delay);
  }

  const visualTitle = document.querySelector('.visual-title');
  if (visualTitle) {
    splitChars(visualTitle);
    // Start animation after page load
    setTimeout(function () {
      animateChars(visualTitle, 0);
      animateVisualLine(700);
      animateVisualLogo(1200);
    }, 300);
  }

  /* ============================================
     HERO CANVAS PARTICLES (부유 파티클)
     ============================================ */
  (function () {
    var canvas = document.getElementById('visualCanvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var animId;
    var heroSection = document.querySelector('.main-section-visual');

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = heroSection ? heroSection.offsetHeight : window.innerHeight;
    }
    resize();
    window.addEventListener('resize', function () {
      resize();
      initParticles();
    });

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function createParticle() {
      var isTeal = Math.random() > 0.38;
      return {
        x:       rand(0, canvas.width),
        y:       rand(0, canvas.height),
        r:       rand(0.4, 2.6),
        vx:      rand(-0.18, 0.18),
        vy:      rand(-0.55, -0.18),
        op:      rand(0.08, 0.55),
        opDir:   Math.random() > 0.5 ? 0.004 : -0.004,
        isTeal:  isTeal
      };
    }

    function initParticles() {
      particles = [];
      var count = Math.min(Math.floor(canvas.width / 20), 75);
      for (var i = 0; i < count; i++) particles.push(createParticle());
    }
    initParticles();

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var len = particles.length;
      for (var i = 0; i < len; i++) {
        var p = particles[i];
        var rgb = p.isTeal ? '120,210,200' : '255,255,255';

        /* 글로우 (방사형 그라디언트) */
        var glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4.5);
        glow.addColorStop(0, 'rgba(' + rgb + ',' + (p.op * 0.9) + ')');
        glow.addColorStop(1, 'rgba(' + rgb + ',0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        /* 코어 점 */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + rgb + ',' + Math.min(p.op * 1.8, 0.95) + ')';
        ctx.fill();

        /* 이동 */
        p.x  += p.vx;
        p.y  += p.vy;
        p.op += p.opDir;

        /* 범위 벗어나면 반대쪽으로 */
        if (p.y < -10)               { p.y = canvas.height + 10; p.x = rand(0, canvas.width); }
        if (p.x < -10)               { p.x = canvas.width + 10; }
        if (p.x > canvas.width + 10) { p.x = -10; }

        /* 투명도 반전 */
        if (p.op > 0.58) p.opDir = -Math.abs(p.opDir);
        if (p.op < 0.06) p.opDir =  Math.abs(p.opDir);
      }
      animId = requestAnimationFrame(draw);
    }

    /* 히어로가 뷰포트 밖으로 나가면 렌더 중단 (성능) */
    var heroObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        if (!animId) draw();
      } else {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }, { threshold: 0 });
    if (heroSection) heroObs.observe(heroSection);
    else draw();
  })();

  /* ============================================
     UNIT PLAN TABS (평면안내)
     ============================================ */
  document.querySelectorAll('.unit-tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      // 탭 버튼 활성화
      document.querySelectorAll('.unit-tab-btn').forEach(function (b) { b.classList.remove('on'); });
      this.classList.add('on');
      // 패널 전환
      var targetId = this.dataset.target;
      document.querySelectorAll('.unit-plan-panel').forEach(function (p) { p.classList.remove('on'); });
      var targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('on');
    });
  });

  /* ============================================
     LANDSCAPE SWIPER
     ============================================ */
  const landSlideEl = document.querySelector('.land-slide');
  if (landSlideEl) {
    new Swiper('.land-slide', {
      speed: 1000,
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        prevEl: '.land-prev',
        nextEl: '.land-next',
      },
      pagination: {
        el: '.land-pagination',
        clickable: true,
      },
    });
  }

  /* ============================================
     GREEN LOUNGE SWIPER
     ============================================ */
  let greenSwiper = null;
  const greenSlideEl = document.querySelector('.green-slide');
  if (greenSlideEl) {
    greenSwiper = new Swiper('.green-slide', {
      speed: 1000,
      loop: false,
      navigation: {
        prevEl: '.green-prev',
        nextEl: '.green-next',
      },
      on: {
        slideChange: function () {
          updateGreenCounter(this.activeIndex);
        },
        init: function () {
          updateGreenCounter(0);
        },
      },
    });
  }

  function updateGreenCounter(index) {
    const currentEl = document.querySelector('.green-current');
    const total = document.querySelectorAll('.green-slide .swiper-slide').length;
    if (currentEl) {
      currentEl.textContent = String(index + 1).padStart(2, '0');
    }
    const totalEl = document.querySelector('.green-total');
    if (totalEl) {
      totalEl.textContent = String(total).padStart(2, '0');
    }
  }

  /* ============================================
     PREMIUM CARDS - Background Switcher
     ============================================ */
  const premiumCards = document.querySelectorAll('.premium-card');
  const premiumBgs = document.querySelectorAll('.premium-bg-item');

  function setPremiumActive(index) {
    premiumCards.forEach(function (card) { card.classList.remove('active'); });
    premiumBgs.forEach(function (bg) { bg.classList.remove('active'); });
    if (premiumCards[index]) premiumCards[index].classList.add('active');
    if (premiumBgs[index]) premiumBgs[index].classList.add('active');
  }

  premiumCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      const idx = parseInt(this.dataset.index);
      setPremiumActive(idx);
    });
    card.addEventListener('click', function () {
      const idx = parseInt(this.dataset.index);
      setPremiumActive(idx);
    });
  });

  /* Auto-rotate premium cards */
  let premiumAutoIdx = 0;
  let premiumAuto = null;
  const premiumSection = document.querySelector('.main-section-premium');
  if (premiumSection) {
    premiumAuto = setInterval(function () {
      premiumAutoIdx = (premiumAutoIdx + 1) % premiumCards.length;
      setPremiumActive(premiumAutoIdx);
    }, 3000);

    premiumSection.addEventListener('mouseenter', function () {
      clearInterval(premiumAuto);
    });
    premiumSection.addEventListener('mouseleave', function () {
      premiumAuto = setInterval(function () {
        premiumAutoIdx = (premiumAutoIdx + 1) % premiumCards.length;
        setPremiumActive(premiumAutoIdx);
      }, 3000);
    });
  }

  /* ============================================
     SCROLL-TRIGGERED SECTION ANIMATIONS
     Using IntersectionObserver (like official site scrollMotion)
     ============================================ */
  const sections = document.querySelectorAll('.main-section-unit, .main-section-land, .main-section-green, .main-section-premium, .main-section-overview, .main-section-visual2, .main-section-siteplan');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  /* ============================================
     SCROLL-TRIGGERED SCROLL MOTION
     Replicate official site's scrollMotion pattern
     ============================================ */
  function scrollMotion() {
    const scrollY = window.scrollY;
    const winH = window.innerHeight;

    // Helper: get section offset
    function getOffset(selector) {
      const el = document.querySelector(selector);
      if (!el) return 9999999;
      return el.getBoundingClientRect().top + scrollY;
    }

    const unitOffset = getOffset('.main-section-unit');
    const landOffset = getOffset('.main-section-land');
    const greenOffset = getOffset('.main-section-green');
    const premiumOffset = getOffset('.main-section-premium');
    const overviewOffset = getOffset('.main-section-overview');
    const visual2Offset = getOffset('.main-section-visual2');

    // Header dark/light switching based on section
    const trigger = scrollY + winH * 0.6;

    // On dark sections → header stays white (transparent sections show white text already)
    // Logic matches official site: unit/land/green/premium → dark bg → header needs .dark treatment
    // We just keep .on (white header) which is already readable
  }

  window.addEventListener('scroll', scrollMotion, { passive: true });

  /* ============================================
     SCROLL TO TOP BUTTON
     ============================================ */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     QUICK MENU VISIBILITY
     ============================================ */
  const quickMenu = document.querySelector('.quick-menu');
  let quickVisible = false;

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    if (scrollY > 300 && !quickVisible) {
      quickVisible = true;
      if (quickMenu) {
        quickMenu.style.opacity = '1';
        quickMenu.style.transform = 'translateY(-50%)';
      }
    } else if (scrollY <= 300 && quickVisible) {
      quickVisible = false;
      if (quickMenu) {
        quickMenu.style.opacity = '0';
        quickMenu.style.transform = 'translateY(-40%)';
      }
    }
  }, { passive: true });

  // Initial state
  if (quickMenu) {
    quickMenu.style.opacity = '0';
    quickMenu.style.transform = 'translateY(-40%)';
    quickMenu.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  }

  /* ============================================
     SMOOTH SCROLL for anchor links
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
        // Close mobile menu if open
        closeMenu();
      }
    });
  });

  /* ============================================
     GALLERY IMAGE HOVER - Subtle Ken Burns on gallery items
     ============================================ */
  const galleryItems = document.querySelectorAll('.green-gallery-item');
  galleryItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      const img = this.querySelector('img');
      if (img) img.style.transform = 'scale(1.08)';
    });
    item.addEventListener('mouseleave', function () {
      const img = this.querySelector('img');
      if (img) img.style.transform = 'scale(1)';
    });
  });

  /* ============================================
     LAZY LOADING for images
     ============================================ */
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(function (img) { imageObserver.observe(img); });
  }

  /* ============================================
     STAGGER ANIMATION for overview list items
     ============================================ */
  const overviewObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.overview-list li');
          items.forEach(function (item, i) {
            setTimeout(function () {
              item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateX(0)';
            }, i * 100);
          });
          overviewObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const overviewSection = document.querySelector('.main-section-overview');
  if (overviewSection) {
    const items = overviewSection.querySelectorAll('.overview-list li');
    items.forEach(function (item) {
      item.style.opacity = '0';
      item.style.transform = 'translateX(30px)';
    });
    overviewObserver.observe(overviewSection);
  }

  /* ============================================
     VISUAL2 (BRAND) SECTION - Entrance animation
     ============================================ */
  const visual2Observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const inner = entry.target.querySelector('.visual2-inner');
          if (inner) {
            const children = inner.children;
            Array.from(children).forEach(function (child, i) {
              child.style.opacity = '0';
              child.style.transform = 'translateY(30px)';
              setTimeout(function () {
                child.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              }, 200 + i * 120);
            });
          }
          visual2Observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  const visual2Section = document.querySelector('.main-section-visual2');
  if (visual2Section) {
    visual2Observer.observe(visual2Section);
  }

  /* ============================================
     PREMIUM SECTION - Entrance animation
     ============================================ */
  const premiumObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.premium-card');
          cards.forEach(function (card, i) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(function () {
              card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 300 + i * 100);
          });
          premiumObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  const premiumEl = document.querySelector('.main-section-premium');
  if (premiumEl) {
    premiumEl.querySelectorAll('.premium-card').forEach(function (card) {
      card.style.opacity = '0';
    });
    premiumObserver.observe(premiumEl);
  }

  /* ============================================
     UNIT SECTION - Entrance animation
     ============================================ */
  const unitObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          unitObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  const unitSection = document.querySelector('.main-section-unit');
  if (unitSection) unitObserver.observe(unitSection);

  /* ============================================
     SUB SECTION TABS (인테리어 / 시스템 / 배치도)
     ============================================ */
  document.querySelectorAll('.sub-tab-wrap').forEach(function (wrap) {
    wrap.querySelectorAll('.sub-tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        // 같은 wrap 내 버튼 active 토글
        wrap.querySelectorAll('.sub-tab-btn').forEach(function (b) {
          b.classList.remove('on');
        });
        btn.classList.add('on');

        // 해당 콘텐츠 표시
        const targetId = btn.dataset.target;
        const section  = wrap.closest('section');
        if (!section) return;
        section.querySelectorAll('.sub-tab-content').forEach(function (c) {
          c.classList.remove('on');
        });
        const target = document.getElementById(targetId);
        if (target) target.classList.add('on');
      });
    });
  });



})();

     / *   = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
           M A I N   P O P U P 
           = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =   * / 
     c o n s t   m a i n P o p u p   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' m a i n P o p u p ' ) ; 
     c o n s t   p o p u p C l o s e B t n   =   d o c u m e n t . q u e r y S e l e c t o r ( ' . p o p u p - c l o s e - b t n ' ) ; 
     c o n s t   c h k T o d a y   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' c h k T o d a y ' ) ; 
 
     i f   ( m a i n P o p u p )   { 
         / /   C o o k i e   H e l p e r   F u n c t i o n s 
         f u n c t i o n   s e t C o o k i e ( n a m e ,   v a l u e ,   d a y s )   { 
             l e t   e x p i r e s   =   ' ' ; 
             i f   ( d a y s )   { 
                 c o n s t   d a t e   =   n e w   D a t e ( ) ; 
                 d a t e . s e t T i m e ( d a t e . g e t T i m e ( )   +   ( d a y s   *   2 4   *   6 0   *   6 0   *   1 0 0 0 ) ) ; 
                 e x p i r e s   =   ' ;   e x p i r e s = '   +   d a t e . t o U T C S t r i n g ( ) ; 
             } 
             d o c u m e n t . c o o k i e   =   n a m e   +   ' = '   +   ( v a l u e   | |   ' ' )     +   e x p i r e s   +   ' ;   p a t h = / ' ; 
         } 
         
         f u n c t i o n   g e t C o o k i e ( n a m e )   { 
             c o n s t   n a m e E Q   =   n a m e   +   ' = ' ; 
             c o n s t   c a   =   d o c u m e n t . c o o k i e . s p l i t ( ' ; ' ) ; 
             f o r ( l e t   i = 0 ;   i   <   c a . l e n g t h ;   i + + )   { 
                 l e t   c   =   c a [ i ] ; 
                 w h i l e   ( c . c h a r A t ( 0 ) = = '   ' )   c   =   c . s u b s t r i n g ( 1 , c . l e n g t h ) ; 
                 i f   ( c . i n d e x O f ( n a m e E Q )   = =   0 )   r e t u r n   c . s u b s t r i n g ( n a m e E Q . l e n g t h , c . l e n g t h ) ; 
             } 
             r e t u r n   n u l l ; 
         } 
 
         / /   C h e c k   i f   p o p u p   s h o u l d   b e   s h o w n 
         i f   ( g e t C o o k i e ( ' h i d e M a i n P o p u p ' )   ! = =   ' t r u e ' )   { 
             s e t T i m e o u t ( ( )   = >   { 
                 m a i n P o p u p . c l a s s L i s t . a d d ( ' s h o w ' ) ; 
             } ,   1 0 0 0 ) ;   / /   S h o w   p o p u p   1   s e c o n d   a f t e r   l o a d 
         } 
 
         / /   C l o s e   B u t t o n   E v e n t 
         i f   ( p o p u p C l o s e B t n )   { 
             p o p u p C l o s e B t n . a d d E v e n t L i s t e n e r ( ' c l i c k ' ,   ( )   = >   { 
                 i f   ( c h k T o d a y   & &   c h k T o d a y . c h e c k e d )   { 
                     s e t C o o k i e ( ' h i d e M a i n P o p u p ' ,   ' t r u e ' ,   1 ) ;   / /   H i d e   f o r   1   d a y 
                 } 
                 m a i n P o p u p . c l a s s L i s t . r e m o v e ( ' s h o w ' ) ; 
                 s e t T i m e o u t ( ( )   = >   { 
                     m a i n P o p u p . s t y l e . d i s p l a y   =   ' n o n e ' ; 
                 } ,   3 0 0 ) ;   / /   W a i t   f o r   t r a n s i t i o n 
             } ) ; 
         } 
     } 
  
 