// Application state
let currentSlideIndex = 0;
const totalSlides = 10;
let charts = {};

// Updated application data with final requirements
const data = {
  why_public_parks: {
    municipality_benefits: [
      {
        benefit: "إيرادات سنوية ثابتة",
        description: "دخل من عقود الاستثمار دون استثمار أولي",
        icon: "💰"
      },
      {
        benefit: "توفير تكاليف الصيانة", 
        description: "المستثمر يتولى صيانة وتطوير الحدائق",
        icon: "🛠️"
      },
      {
        benefit: "خدمات صحية للمواطنين",
        description: "مراكز طبية متاحة للمواطنين بأسعار منافسة", 
        icon: "🏥"
      },
      {
        benefit: "تحقيق رؤية 2030",
        description: "شراكة حقيقية مع القطاع الخاص",
        icon: "🎯"
      }
    ],
    community_benefits: [
      {
        benefit: "خدمات صحية قريبة",
        description: "رعاية طبية في قلب الأحياء السكنية",
        icon: "🚗"
      },
      {
        benefit: "حدائق أجمل وأفضل",
        description: "صيانة احترافية ومرافق محسنة",
        icon: "🌳"
      },
      {
        benefit: "فرص عمل جديدة",
        description: "وظائف مباشرة وغير مباشرة",
        icon: "💼"
      },
      {
        benefit: "تحسين جودة الحياة",
        description: "خدمات وقائية ومساحات خضراء محسنة",
        icon: "💊"
      }
    ]
  },
  
  // Target neighborhoods data structure
  target_neighborhoods: {
    regions: [
      {
        name: "المنطقة الوسطى",
        color: "#1E40AF", 
        icon: "🏛️",
        neighborhoods: [
          {
            name: "الملز",
            population: 180000,
            priority: "عالية جداً",
            implementation_phase: "المرحلة الأولى",
            density: "عالية جداً"
          },
          {
            name: "السليمانية", 
            population: 165000,
            priority: "عالية جداً",
            implementation_phase: "المرحلة الأولى",
            density: "عالية جداً"
          },
          {
            name: "أم الحمام",
            population: 95000,
            priority: "عالية",
            implementation_phase: "المرحلة الثانية",
            density: "عالية"
          }
        ]
      },
      {
        name: "المنطقة الشمالية",
        color: "#059669",
        icon: "🌲", 
        neighborhoods: [
          {
            name: "الندى",
            population: 210000,
            priority: "عالية جداً",
            implementation_phase: "المرحلة الأولى",
            density: "عالية"
          },
          {
            name: "العقيق",
            population: 125000,
            priority: "عالية",
            implementation_phase: "المرحلة الثانية", 
            density: "متوسطة إلى عالية"
          },
          {
            name: "الياسمين",
            population: 88000,
            priority: "متوسطة",
            implementation_phase: "المرحلة الثالثة",
            density: "متوسطة"
          }
        ]
      },
      {
        name: "المنطقة الشرقية",
        color: "#EA580C",
        icon: "🌅",
        neighborhoods: [
          {
            name: "الثمامة",
            population: 145000,
            priority: "عالية جداً",
            implementation_phase: "المرحلة الأولى",
            density: "عالية"
          },
          {
            name: "غرناطة",
            population: 110000,
            priority: "عالية",
            implementation_phase: "المرحلة الثانية",
            density: "عالية"
          },
          {
            name: "الرمال",
            population: 75000,
            priority: "متوسطة",
            implementation_phase: "المرحلة الثانية",
            density: "متوسطة إلى عالية"
          },
          {
            name: "اليرموك",
            population: 68000,
            priority: "متوسطة",
            implementation_phase: "المرحلة الثالثة",
            density: "متوسطة"
          }
        ]
      },
      {
        name: "المنطقة الغربية",
        color: "#7C3AED",
        icon: "🏔️",
        neighborhoods: [
          {
            name: "عرقة",
            population: 135000,
            priority: "عالية", 
            implementation_phase: "المرحلة الثانية",
            density: "متوسطة إلى عالية"
          },
          {
            name: "المهدية",
            population: 52000,
            priority: "منخفضة",
            implementation_phase: "المرحلة الثالثة",
            density: "منخفضة إلى متوسطة"
          }
        ]
      },
      {
        name: "المنطقة الجنوبية", 
        color: "#DC2626",
        icon: "🏜️",
        neighborhoods: [
          {
            name: "الشفا",
            population: 95000,
            priority: "متوسطة",
            implementation_phase: "المرحلة الثالثة", 
            density: "متوسطة"
          }
        ]
      }
    ],
    summary_statistics: {
      total_neighborhoods: 13,
      total_population: 1543000,
      high_priority: 6,
      medium_priority: 5,
      low_priority: 2,
      phase_1: 4,
      phase_2: 5, 
      phase_3: 4,
      coverage_area: "1200 كم²"
    }
  },
  
  // HMG performance with actual data from JSON
  hmg_performance: {
    facilities: {
      hospitals_saudi: 15,
      medical_centers_saudi: 5,
      international_facilities: 3,
      total_facilities: 23,
      employees: 10475,
      capital: 3500000000,
      revenue_2021: 7250000000,
      listing_year: 2020
    },
    growth_metrics: {
      years: [2018, 2019, 2020, 2021, 2022, 2023],
      revenue_billions: [5.2, 6.1, 6.8, 7.25, 8.1, 8.9],
      profit_billions: [1.1, 1.3, 1.5, 1.65, 1.85, 2.05],
      growth_rate_2023: 24
    }
  },
  
  health_clusters_challenges: [
    {
      name: "التجمع الصحي الأول", 
      beneficiaries: 3.6, 
      centers: 157, 
      pressure_level: 85
    },
    {
      name: "التجمع الصحي الثاني", 
      beneficiaries: 3.8, 
      centers: 91, 
      pressure_level: 92
    },
    {
      name: "التجمع الصحي الثالث", 
      beneficiaries: 0.829, 
      centers: 150, 
      pressure_level: 70
    }
  ]
};

// Chart colors matching the design
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Initialize application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing final application with 10 slides...');
  
  // Small delay to ensure DOM is fully ready
  setTimeout(() => {
    initializeApplication();
  }, 100);
});

function initializeApplication() {
  console.log('Initializing application components...');
  
  // Set initial slide
  showSlide(0);
  
  // Initialize navigation
  initializeNavigation();
  
  // Update UI elements
  updateProgress();
  updateSlideIndicator();
  updateNavigationButtons();
  
  // Initialize charts after a delay
  setTimeout(() => {
    initializeCharts();
  }, 500);
  
  // Setup keyboard navigation
  setupKeyboardNavigation();
  
  // Initialize fullscreen functionality
  initializeFullscreen();
  
  // Initialize touch navigation for mobile
  initializeTouchNavigation();
  
  console.log('Application initialized successfully with', totalSlides, 'slides');
}

// Fixed Navigation functions
function initializeNavigation() {
  console.log('Initializing navigation controls...');
  
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!prevBtn || !nextBtn) {
    console.error('Navigation buttons not found!');
    return;
  }
  
  // Remove any existing event listeners by cloning
  const newPrevBtn = prevBtn.cloneNode(true);
  const newNextBtn = nextBtn.cloneNode(true);
  
  // Replace the old buttons with the new ones
  prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
  nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
  
  // Add event listeners to the new buttons
  newPrevBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Previous button clicked');
    goToPreviousSlide();
  }, false);
  
  newNextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Next button clicked');
    goToNextSlide();
  }, false);
  
  console.log('Navigation controls initialized successfully');
}

function goToNextSlide() {
  if (currentSlideIndex < totalSlides - 1) {
    console.log(`Moving from slide ${currentSlideIndex + 1} to slide ${currentSlideIndex + 2}`);
    currentSlideIndex++;
    showSlide(currentSlideIndex);
    updateUI();
    handleSlideSpecificActions(currentSlideIndex + 1);
  } else {
    console.log('Already on last slide');
  }
}

function goToPreviousSlide() {
  if (currentSlideIndex > 0) {
    console.log(`Moving from slide ${currentSlideIndex + 1} to slide ${currentSlideIndex}`);
    currentSlideIndex--;
    showSlide(currentSlideIndex);
    updateUI();
    handleSlideSpecificActions(currentSlideIndex + 1);
  } else {
    console.log('Already on first slide');
  }
}

function goToSlide(index) {
  if (index >= 0 && index < totalSlides) {
    console.log(`Jumping to slide ${index + 1}`);
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
    updateUI();
    handleSlideSpecificActions(currentSlideIndex + 1);
  }
}

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  
  if (slides.length === 0) {
    console.error('No slides found!');
    return;
  }
  
  // Clamp index to valid range
  index = Math.max(0, Math.min(index, totalSlides - 1));
  
  // Remove active class from all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Add active class to target slide
  if (slides[index]) {
    slides[index].classList.add('active');
    const title = slides[index].querySelector('.slide-title, .main-title');
    const titleText = title ? title.textContent.trim() : 'Unknown';
    console.log(`Showing slide ${index + 1}: "${titleText}"`);
  } else {
    console.error('Slide not found at index:', index);
  }
}

function updateUI() {
  updateProgress();
  updateNavigationButtons();
  updateSlideIndicator();
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (prevBtn && nextBtn) {
    const isFirstSlide = currentSlideIndex === 0;
    const isLastSlide = currentSlideIndex === totalSlides - 1;
    
    // Update disabled states
    prevBtn.disabled = isFirstSlide;
    nextBtn.disabled = isLastSlide;
    
    // Update visual states
    prevBtn.style.opacity = isFirstSlide ? '0.5' : '1';
    nextBtn.style.opacity = isLastSlide ? '0.5' : '1';
    
    prevBtn.style.cursor = isFirstSlide ? 'not-allowed' : 'pointer';
    nextBtn.style.cursor = isLastSlide ? 'not-allowed' : 'pointer';
    
    console.log('Navigation buttons updated - Current:', currentSlideIndex + 1, 'Total:', totalSlides);
  }
}

function updateSlideIndicator() {
  const currentSlideEl = document.getElementById('currentSlide');
  const totalSlidesEl = document.getElementById('totalSlides');
  
  if (currentSlideEl) {
    currentSlideEl.textContent = currentSlideIndex + 1;
  }
  if (totalSlidesEl) {
    totalSlidesEl.textContent = totalSlides;
  }
}

function updateProgress() {
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    const progress = ((currentSlideIndex + 1) / totalSlides) * 100;
    progressBar.style.width = progress + '%';
  }
}

function setupKeyboardNavigation() {
  document.addEventListener('keydown', function(event) {
    console.log('Key pressed:', event.key);
    
    // Prevent default for presentation keys
    const presentationKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Backspace'];
    if (presentationKeys.includes(event.key)) {
      event.preventDefault();
    }
    
    switch(event.key) {
      case 'ArrowRight':
        // In RTL, right arrow goes to previous slide
        console.log('Right arrow - previous slide (RTL)');
        goToPreviousSlide();
        break;
      case 'ArrowLeft':
        // In RTL, left arrow goes to next slide
        console.log('Left arrow - next slide (RTL)');
        goToNextSlide();
        break;
      case 'ArrowUp':
        console.log('Up arrow - previous slide');
        goToPreviousSlide();
        break;
      case 'ArrowDown':
      case ' ':
        console.log('Down arrow/Space - next slide');
        goToNextSlide();
        break;
      case 'Backspace':
        console.log('Backspace - previous slide');
        goToPreviousSlide();
        break;
      case 'Home':
        console.log('Home - first slide');
        goToSlide(0);
        break;
      case 'End':
        console.log('End - last slide');
        goToSlide(totalSlides - 1);
        break;
      case 'f':
      case 'F':
        if (!event.ctrlKey && !event.metaKey) {
          toggleFullscreen();
        }
        break;
    }
  });
}

// Handle slide-specific actions
function handleSlideSpecificActions(slideNumber) {
  console.log('Handling slide-specific actions for slide:', slideNumber);
  
  setTimeout(() => {
    switch(slideNumber) {
      case 4:
        // Target neighborhoods slide - no specific actions needed
        console.log('Target neighborhoods slide activated');
        break;
      case 5:
        console.log('Activating HMG growth chart');
        if (charts.hmgGrowth) {
          charts.hmgGrowth.update('active');
        }
        break;
      case 6:
        console.log('Activating health clusters chart');
        if (charts.healthClusters) {
          charts.healthClusters.update('active');
        }
        break;
      default:
        console.log('No specific actions for slide', slideNumber);
    }
  }, 300);
}

// Chart initialization
function initializeCharts() {
  console.log('Initializing charts...');
  
  try {
    createHMGGrowthChart();
    createHealthClustersChart();
    console.log('All charts initialized successfully');
  } catch (error) {
    console.error('Error initializing charts:', error);
  }
}

// HMG Growth Chart with updated data
function createHMGGrowthChart() {
  const ctx = document.getElementById('hmgGrowthChart');
  if (!ctx) {
    console.log('HMG growth chart canvas not found');
    return;
  }
  
  try {
    charts.hmgGrowth = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.hmg_performance.growth_metrics.years,
        datasets: [{
          label: 'الإيرادات (مليار ريال)',
          data: data.hmg_performance.growth_metrics.revenue_billions,
          borderColor: chartColors[0],
          backgroundColor: chartColors[0] + '20',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8
        }, {
          label: 'الأرباح (مليار ريال)',
          data: data.hmg_performance.growth_metrics.profit_billions,
          borderColor: chartColors[1],
          backgroundColor: chartColors[1] + '20',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: { family: 'Tajawal', size: 12 },
              color: '#1B5E20',
              usePointStyle: true
            }
          },
          tooltip: {
            titleFont: { family: 'Tajawal' },
            bodyFont: { family: 'Tajawal' },
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y + ' مليار ريال';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'القيمة (مليار ريال)',
              font: { family: 'Tajawal' },
              color: '#1B5E20'
            },
            ticks: {
              font: { family: 'Tajawal' },
              color: '#1B5E20',
              callback: function(value) {
                return value + ' مليار';
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'السنة',
              font: { family: 'Tajawal' },
              color: '#1B5E20'
            },
            ticks: {
              font: { family: 'Tajawal' },
              color: '#1B5E20'
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        }
      }
    });
    console.log('HMG growth chart created');
  } catch (error) {
    console.error('Error creating HMG growth chart:', error);
  }
}

// Health Clusters Challenges Chart
function createHealthClustersChart() {
  const ctx = document.getElementById('healthClustersChart');
  if (!ctx) {
    console.log('Health clusters chart canvas not found');
    return;
  }
  
  try {
    charts.healthClusters = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.health_clusters_challenges.map(cluster => cluster.name),
        datasets: [{
          label: 'مستوى الضغط (%)',
          data: data.health_clusters_challenges.map(cluster => cluster.pressure_level),
          backgroundColor: data.health_clusters_challenges.map(cluster => 
            cluster.pressure_level > 90 ? '#B71C1C' : 
            cluster.pressure_level > 80 ? '#FF5722' : '#FFC107'
          ),
          borderColor: data.health_clusters_challenges.map(cluster => 
            cluster.pressure_level > 90 ? '#B71C1C' : 
            cluster.pressure_level > 80 ? '#FF5722' : '#FFC107'
          ),
          borderWidth: 2,
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: { family: 'Tajawal', size: 12 },
              color: '#1B5E20'
            }
          },
          tooltip: {
            titleFont: { family: 'Tajawal' },
            bodyFont: { family: 'Tajawal' },
            callbacks: {
              afterBody: function(context) {
                const index = context[0].dataIndex;
                const cluster = data.health_clusters_challenges[index];
                return [
                  'المستفيدون: ' + cluster.beneficiaries + ' مليون',
                  'المراكز: ' + cluster.centers
                ];
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'مستوى الضغط على النظام الصحي (%)',
              font: { family: 'Tajawal' },
              color: '#1B5E20'
            },
            ticks: {
              font: { family: 'Tajawal' },
              color: '#1B5E20',
              callback: function(value) {
                return value + '%';
              }
            }
          },
          x: {
            ticks: {
              font: { family: 'Tajawal', size: 10 },
              color: '#1B5E20',
              maxRotation: 45
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        }
      }
    });
    console.log('Health clusters chart created');
  } catch (error) {
    console.error('Error creating health clusters chart:', error);
  }
}

// Fullscreen functionality
function initializeFullscreen() {
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', function(e) {
      e.preventDefault();
      toggleFullscreen();
    });
    
    document.addEventListener('fullscreenchange', updateFullscreenButton);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
    document.addEventListener('mozfullscreenchange', updateFullscreenButton);
    document.addEventListener('MSFullscreenChange', updateFullscreenButton);
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement && 
      !document.webkitFullscreenElement && 
      !document.mozFullScreenElement && 
      !document.msFullscreenElement) {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

function updateFullscreenButton() {
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) {
    const isFullscreen = document.fullscreenElement || 
                        document.webkitFullscreenElement || 
                        document.mozFullScreenElement || 
                        document.msFullscreenElement;
    
    fullscreenBtn.title = isFullscreen ? 'خروج من ملء الشاشة' : 'ملء الشاشة';
  }
}

// Touch/swipe support for mobile
function initializeTouchNavigation() {
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        goToNextSlide(); // Swipe left - next slide (RTL)
      } else {
        goToPreviousSlide(); // Swipe right - previous slide (RTL)
      }
    }
  }
}

// Auto-resize charts when window resizes
window.addEventListener('resize', function() {
  Object.values(charts).forEach(chart => {
    if (chart && typeof chart.resize === 'function') {
      chart.resize();
    }
  });
});

// Cleanup function
window.addEventListener('beforeunload', function() {
  Object.values(charts).forEach(chart => {
    if (chart && typeof chart.destroy === 'function') {
      chart.destroy();
    }
  });
});

console.log('Fixed app.js loaded successfully with working navigation and 10 slides including target neighborhoods');