document.addEventListener('DOMContentLoaded', (event) => {
    const filterBtn = document.getElementById('filterBtn');
    const filterDropdown = document.getElementById('filterDropdown');
    
    filterBtn.addEventListener('click', () => {
        filterDropdown.classList.toggle('hidden');
    });

    // Add this code block to handle clicks outside the filter menu
    document.addEventListener('click', function(e) {
        const isClickInsideFilterContainer = filterBtn.contains(e.target) || filterDropdown.contains(e.target);
        
        if (!isClickInsideFilterContainer && !filterDropdown.classList.contains('hidden')) {
            filterDropdown.classList.add('hidden');
        }
    });

    document.querySelectorAll('#filterDropdown input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Ensure single selection within each category
            if (this.checked) {
                let siblings = this.closest('div').querySelectorAll('input[type="checkbox"]');
                siblings.forEach(sib => {
                    if (sib !== this) sib.checked = false;
                });
            }
        });
    });

    document.getElementById('applyFilters').addEventListener('click', () => {
        applyFilters();
    });

    document.getElementById('resetFilters').addEventListener('click', () => {
        resetFilters();
    });

function applyFilters() {
    const selectedFilters = getSelectedFilters();
    document.querySelectorAll('.card').forEach(card => {
        // Corrected data attribute names to match HTML
        const functionMatch = !selectedFilters.function || card.dataset.functionality === selectedFilters.function;
        const contentMatch = !selectedFilters.content || card.dataset.category === selectedFilters.content;
        const audienceMatch = !selectedFilters.audience || card.dataset.audience === selectedFilters.audience;

        if (functionMatch && contentMatch && audienceMatch) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

    function getSelectedFilters() {
        const filters = {};
        document.querySelectorAll('#filterDropdown input[type="checkbox"]:checked').forEach(checkbox => {
            filters[checkbox.name] = checkbox.value;
        });x
        return filters;
    }

    function resetFilters() {
        document.querySelectorAll('#filterDropdown input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        // Optionally reset the view
        document.querySelectorAll('.card').forEach(card => card.style.display = '');
    }

  // Slideshow functionality for cards - assuming this is part of your existing code
  document.querySelectorAll('.card').forEach(card => initCardSlideshow(card));

  function initCardSlideshow(card) {
    let slideIndex = 1;
    showSlides(card, slideIndex);

    card.querySelector('.prev').addEventListener('click', () => showSlides(card, slideIndex -= 1));
    card.querySelector('.next').addEventListener('click', () => showSlides(card, slideIndex += 1));

    card.querySelectorAll('.dot').forEach((dot, index) => {
      dot.addEventListener('click', () => showSlides(card, slideIndex = index + 1));
    });

    function showSlides(card, n) {
      let slides = card.getElementsByClassName("mySlides");
      let dots = card.getElementsByClassName("dot");
      if (n > slides.length) slideIndex = 1;
      if (n < 1) slideIndex = slides.length;
      Array.from(slides).forEach(slide => slide.style.display = "none");
      Array.from(dots).forEach(dot => dot.className = dot.className.replace(" active", ""));
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  }
});

window.addEventListener('scroll', function() {
var scrolledHeight= window.pageYOffset;
document.body.style.backgroundPositionY = -(scrolledHeight * 5) + 'px';
});


