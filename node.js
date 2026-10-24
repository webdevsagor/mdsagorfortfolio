
const slides = document.querySelectorAll(".project-slide");
const dots = document.querySelectorAll(".dot");
 
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
 
let currentSlide = 0;
 
function showSlide(index) {
    if (!slides.length) return;
 
    slides.forEach(slide => {
        slide.classList.remove("active");
    });
 
    dots.forEach(dot => {
        dot.classList.remove("active");
    });
 
    slides[index]?.classList.add("active");
    dots[index]?.classList.add("active");
}
 
if (slides.length) {
    showSlide(currentSlide);
 
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }
 
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentSlide =
                (currentSlide - 1 + slides.length) % slides.length;
 
            showSlide(currentSlide);
        });
    }
 
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}
 
// Contact Form

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
 
if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
 
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }
 
        formStatus.className = "form-status success";
        formStatus.textContent =
            "Form validation successful! Your message has not been sent yet.";
    });
}
 
// Service 
 
(function () {
  const counters = document.querySelectorAll('.counter');
  const duration = 2000;
 
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
 
  function animate(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
 
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(easeOutCubic(progress) * target);
      el.textContent = value + suffix;
 
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix; // final value fixed
      }
    }
    requestAnimationFrame(tick);
  }
 
  
  const stats = document.querySelector('.stats');
  if (stats && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(animate);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    statsObserver.observe(stats);
  } else {
   
    counters.forEach(el => {
      el.textContent = el.dataset.target + (el.dataset.suffix || '');
    });
  }
 

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }
})();
 
 
//
 
(function () {
  const card = document.querySelector('.skills-card');
  const items = document.querySelectorAll('.skill-item');
  if (!card || !items.length) return;
 
  const duration = 1800; // CSS er transition (1.8s) er sathe mile thakte hobe
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
 
  function animateSkill(item) {
    const bar = item.querySelector('.skill-progress');
    const value = item.querySelector('.skill-value');
    const target = parseInt(bar.dataset.percent, 10);
 
    bar.style.width = target + '%'; // bar ta CSS transition diye bhorbe
 
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      value.textContent = Math.round(easeOutCubic(progress) * target) + '%';
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
 
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // ekta ekta kore ektu por por shuru hobe
        items.forEach((item, i) => setTimeout(() => animateSkill(item), i * 150));
        obs.disconnect(); // ekbar-i cholbe
      }
    });
  }, { threshold: 0.2 });
 
  observer.observe(card);
})();
 
 
 
// navber:
 
function toggleMenu() {
    const menu = document.querySelector('.navber .menu');
    const btn = document.querySelector('.menu-button');
    const open = menu.classList.toggle('active');
    btn.textContent = open ? '✕' : '☰';
    btn.setAttribute('aria-expanded', open);
}
 
document.querySelectorAll('.navber .menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.navber .menu').classList.remove('active');
        document.querySelector('.menu-button').textContent = '☰';
    });
});

            // Faq section

(function () {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;
 
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        if (!button) return;
 
        button.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
 
            // ekta open hole baki gulo bondho
            faqItems.forEach(other => {
                other.classList.remove('active');
                other.querySelector('.faq-question')
                     .setAttribute('aria-expanded', 'false');
            });
 
            // ager ta bondho chilo hole ekhon khulbe, open chilo hole bondho-i thakbe
            if (!isOpen) {
                item.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });
})();