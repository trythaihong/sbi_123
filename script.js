// DOM Elements
const loginToggle = document.getElementById("loginToggle");
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const closeModals = document.querySelectorAll(".close-modal");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");
const orderNowBtn = document.getElementById("orderNowBtn");
const orderForm = document.getElementById("orderForm");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Slider Elements
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Product Data
const products = {
  1: {
    name: "ម្ជុល ៣ (ស្ដើង)",
    price: 129.99,
    image: "./img/៣.png",
    category: "premium",
  },
  2: {
    name: "ម្ជុល ៦ (កណ្ដាល)",
    price: 199.99,
    image: "./img/៦.png",
    category: "standard",
  },
  3: {
    name: "ម្ជុល ៨ (ក្រាស់)",
    price: 299.99,
    image: "./img/៨.png",
    category: "accessory",
  },
};

// Product Options Configuration
const productOptions = {
  1: {
    colors: [
      { name: "black", value: "#2c3e50", label: "ខ្មៅ" },
      { name: "green", value: "#27ae60", label: "បៃតង" },
      { name: "blue", value: "#3498db", label: "ខៀវ" },
    ],
    uom: [
      { value: "2x100", label: "2m x 100m", price: 0 },
      { value: "4x100", label: "4m x 100m", price: 50 },
      { value: "6x100", label: "6m x 100m", price: 100 },
    ],
    stock: 15,
  },
  2: {
    colors: [
      { name: "black", value: "#2c3e50", label: "ខ្មៅ" },
      { name: "green", value: "#27ae60", label: "បៃតង" },
      { name: "blue", value: "#3498db", label: "ខៀវ" },
    ],
    uom: [
      { value: "2x100", label: "2m x 100m", price: 0 },
      { value: "4x100", label: "4m x 100m", price: 75 },
      { value: "6x100", label: "6m x 100m", price: 150 },
    ],
    stock: 8,
  },
  3: {
    colors: [
      { name: "black", value: "#2c3e50", label: "ខ្មៅ" },
      { name: "green", value: "#27ae60", label: "បៃតង" },
      { name: "blue", value: "#3498db", label: "ខៀវ" },
    ],
    uom: [
      { value: "2x100", label: "2m x 100m", price: 0 },
      { value: "4x100", label: "4m x 100m", price: 100 },
      { value: "6x100", label: "6m x 100m", price: 200 },
    ],
    stock: 20,
  },
};

// Shopping Cart
let cart = [];
let cartTotal = 0;

// Slider State
let currentSlide = 0;
let slideInterval;

// DOM Elements for Products
const productsGrid = document.querySelector(".products-grid");
const filterBtns = document.querySelectorAll(".filter-btn");
const cartIcon = document.getElementById("cartIcon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotalAmount = document.getElementById("cartTotalAmount");
const cartCount = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeModals();
  initializeSlider();
  initializeProductFilter();
  initializeProductOptions();
  initializeCart();
  initializeSmoothScroll();
  updateCartDisplay();
  animateOnScroll();
});

// Slider Functionality
function initializeSlider() {
  if (!slider || !slides.length) return;

  // Start auto-slide
  startAutoSlide();

  // Event listeners for manual controls
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      clearInterval(slideInterval);
      prevSlide();
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      clearInterval(slideInterval);
      nextSlide();
      startAutoSlide();
    });
  }

  // Dot controls
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(slideInterval);
      goToSlide(index);
      startAutoSlide();
    });
  });

  // Pause on hover
  const sliderContainer = document.querySelector(".slider-container");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    sliderContainer.addEventListener("mouseleave", () => {
      startAutoSlide();
    });
  }

  // Touch support for mobile
  let startX = 0;
  let endX = 0;

  if (sliderContainer) {
    sliderContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    sliderContainer.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      clearInterval(slideInterval);
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      startAutoSlide();
    }
  }
}

function startAutoSlide() {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function updateSlider() {
  if (!slider) return;

  slider.style.transform = `translateX(-${currentSlide * 20}%)`;

  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });

  // Update slides
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });
}

// Navigation
function initializeNavigation() {
  // Toggle Mobile Menu
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Add scroll effect to navbar
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.style.backgroundColor = "rgba(44, 62, 80, 0.95)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.backgroundColor = "var(--primary)";
      header.style.backdropFilter = "none";
    }
  });
}

// Modal Functions
function initializeModals() {
  // Show Login Modal
  if (loginToggle) {
    loginToggle.addEventListener("click", () => {
      if (loginModal) loginModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  }

  // Show Register Modal from Login
  if (showRegister) {
    showRegister.addEventListener("click", (e) => {
      e.preventDefault();
      if (loginModal) loginModal.style.display = "none";
      if (registerModal) registerModal.style.display = "flex";
    });
  }

  // Show Login Modal from Register
  if (showLogin) {
    showLogin.addEventListener("click", (e) => {
      e.preventDefault();
      if (registerModal) registerModal.style.display = "none";
      if (loginModal) loginModal.style.display = "flex";
    });
  }

  // Close Modals
  closeModals.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      if (loginModal) loginModal.style.display = "none";
      if (registerModal) registerModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    if (e.target === registerModal) {
      registerModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Scroll to Order Section
  if (orderNowBtn) {
    orderNowBtn.addEventListener("click", () => {
      scrollToSection("order");
    });
  }
}

// Smooth Scroll Function
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId !== "#" && document.querySelector(targetId)) {
        scrollToSection(targetId.substring(1));
      }
    });
  });
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = document.querySelector("header").offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

// Product Filter Functionality
function initializeProductFilter() {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");
      filterProducts(filter);
    });
  });
}

function filterProducts(filter) {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const category = card.getAttribute("data-category");
    if (filter === "all" || category === filter) {
      card.style.display = "block";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 100);
    } else {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }
  });
}

// Product Options Functionality
function initializeProductOptions() {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const productId = card
      .querySelector(".add-to-cart-btn")
      .getAttribute("data-product");
    const options = productOptions[productId];

    if (options) {
      addProductOptionsToCard(card, productId, options);
    }
  });
}

function addProductOptionsToCard(card, productId, options) {
  const productInfo = card.querySelector(".product-info");
  const addToCartBtn = card.querySelector(".add-to-cart-btn");
  const priceElement = card.querySelector(".current-price");
  const originalPrice = parseFloat(priceElement.textContent.replace("$", ""));

  // Create options container
  const optionsContainer = document.createElement("div");
  optionsContainer.className = "product-options";

  // Add color options
  if (options.colors && options.colors.length > 0) {
    const colorGroup = createColorOptions(options.colors);
    optionsContainer.appendChild(colorGroup);
  }

  // Add UOM options
  if (options.uom && options.uom.length > 0) {
    const uomGroup = createUomOptions(options.uom);
    optionsContainer.appendChild(uomGroup);
  }

  // Add quantity selector
  const quantityGroup = createQuantitySelector(options.stock);
  optionsContainer.appendChild(quantityGroup);

  // Add selected options summary
  const optionsSummary = document.createElement("div");
  optionsSummary.className = "selected-options-summary";
  optionsSummary.style.display = "none";
  optionsContainer.appendChild(optionsSummary);

  // Insert before add to cart button
  const priceContainer = card.querySelector(".product-price");
  productInfo.insertBefore(optionsContainer, priceContainer.nextSibling);

  // Update price display
  const newPriceContainer = document.createElement("div");
  newPriceContainer.className = "product-price-with-options";

  const priceSection = document.createElement("div");
  priceSection.className = "price-section";
  priceSection.innerHTML = `
        <span class="current-price">$${originalPrice.toFixed(2)}</span>
        ${
          card.querySelector(".original-price")
            ? card.querySelector(".original-price").outerHTML
            : ""
        }
    `;

  const quantitySection = document.createElement("div");
  quantitySection.className = "quantity-section";
  quantitySection.innerHTML = `
        <span class="quantity-label">ចំនួន:</span>
        <span class="quantity-display">1</span>
    `;

  newPriceContainer.appendChild(priceSection);
  newPriceContainer.appendChild(quantitySection);

  priceContainer.replaceWith(newPriceContainer);

  // Add stock status
  const stockStatus = document.createElement("span");
  stockStatus.className = `stock-status ${getStockStatusClass(options.stock)}`;
  stockStatus.textContent = getStockStatusText(options.stock);
  newPriceContainer.querySelector(".price-section").appendChild(stockStatus);

  // Initialize product state
  card.productState = {
    productId: parseInt(productId),
    basePrice: originalPrice,
    selectedColor: options.colors ? options.colors[0] : null,
    selectedUom: options.uom ? options.uom[0] : null,
    quantity: 1,
    maxQuantity: options.stock,
  };

  // Update add to cart button
  updateAddToCartButton(card, addToCartBtn);
}

function createColorOptions(colors) {
  const colorGroup = document.createElement("div");
  colorGroup.className = "option-group";

  const colorLabel = document.createElement("label");
  colorLabel.className = "option-label";
  colorLabel.textContent = "ពណ៌:";

  const colorOptions = document.createElement("div");
  colorOptions.className = "color-options";

  colors.forEach((color, index) => {
    const colorOption = document.createElement("div");
    colorOption.className = `color-option ${index === 0 ? "selected" : ""}`;
    colorOption.style.background = color.value;
    colorOption.setAttribute("data-color", color.name);
    colorOption.setAttribute("title", color.label);

    colorOption.addEventListener("click", function () {
      // Remove selected class from all color options
      this.parentElement.querySelectorAll(".color-option").forEach((opt) => {
        opt.classList.remove("selected");
      });
      // Add selected class to clicked option
      this.classList.add("selected");

      // Update product state
      const card = this.closest(".product-card");
      card.productState.selectedColor = color;
      updateProductSummary(card);
    });

    colorOptions.appendChild(colorOption);
  });

  colorGroup.appendChild(colorLabel);
  colorGroup.appendChild(colorOptions);

  return colorGroup;
}

function createUomOptions(uomOptions) {
  const uomGroup = document.createElement("div");
  uomGroup.className = "option-group";

  const uomLabel = document.createElement("label");
  uomLabel.className = "option-label";
  uomLabel.textContent = "ឯកតា:";

  const uomOptionsContainer = document.createElement("div");
  uomOptionsContainer.className = "uom-options";

  uomOptions.forEach((uom, index) => {
    const uomOption = document.createElement("div");
    uomOption.className = `uom-option ${index === 0 ? "selected" : ""}`;
    uomOption.textContent = uom.label;
    uomOption.setAttribute("data-uom", uom.value);

    uomOption.addEventListener("click", function () {
      // Remove selected class from all uom options
      this.parentElement.querySelectorAll(".uom-option").forEach((opt) => {
        opt.classList.remove("selected");
      });
      // Add selected class to clicked option
      this.classList.add("selected");

      // Update product state
      const card = this.closest(".product-card");
      card.productState.selectedUom = uom;
      updateProductPrice(card);
      updateProductSummary(card);
    });

    uomOptionsContainer.appendChild(uomOption);
  });

  uomGroup.appendChild(uomLabel);
  uomGroup.appendChild(uomOptionsContainer);

  return uomGroup;
}

function createQuantitySelector(maxQuantity) {
  const quantityGroup = document.createElement("div");
  quantityGroup.className = "option-group";

  const quantityLabel = document.createElement("label");
  quantityLabel.className = "option-label";
  quantityLabel.textContent = "ចំនួន:";

  const quantitySelector = document.createElement("div");
  quantitySelector.className = "quantity-selector";

  const decreaseBtn = document.createElement("button");
  decreaseBtn.className = "quantity-btn";
  decreaseBtn.textContent = "-";
  decreaseBtn.addEventListener("click", function () {
    const card = this.closest(".product-card");
    if (card.productState.quantity > 1) {
      card.productState.quantity--;
      updateQuantityDisplay(card);
      updateProductSummary(card);
    }
  });

  const quantityInput = document.createElement("input");
  quantityInput.type = "text";
  quantityInput.className = "quantity-input";
  quantityInput.value = "1";
  quantityInput.readOnly = true;

  const increaseBtn = document.createElement("button");
  increaseBtn.className = "quantity-btn";
  increaseBtn.textContent = "+";
  increaseBtn.addEventListener("click", function () {
    const card = this.closest(".product-card");
    if (card.productState.quantity < card.productState.maxQuantity) {
      card.productState.quantity++;
      updateQuantityDisplay(card);
      updateProductSummary(card);
    }
  });

  quantitySelector.appendChild(decreaseBtn);
  quantitySelector.appendChild(quantityInput);
  quantitySelector.appendChild(increaseBtn);

  quantityGroup.appendChild(quantityLabel);
  quantityGroup.appendChild(quantitySelector);

  return quantityGroup;
}

function updateQuantityDisplay(card) {
  const quantityInput = card.querySelector(".quantity-input");
  const quantityDisplay = card.querySelector(".quantity-display");

  if (quantityInput) quantityInput.value = card.productState.quantity;
  if (quantityDisplay) quantityDisplay.textContent = card.productState.quantity;

  // Update buttons state
  const decreaseBtn = card.querySelector(".quantity-btn:first-child");
  const increaseBtn = card.querySelector(".quantity-btn:last-child");

  if (decreaseBtn) {
    decreaseBtn.disabled = card.productState.quantity <= 1;
  }
  if (increaseBtn) {
    increaseBtn.disabled =
      card.productState.quantity >= card.productState.maxQuantity;
  }
}

function updateProductPrice(card) {
  const currentPriceElement = card.querySelector(".current-price");
  const basePrice = card.productState.basePrice;
  const uomPrice = card.productState.selectedUom
    ? card.productState.selectedUom.price
    : 0;
  const totalPrice = basePrice + uomPrice;

  if (currentPriceElement) {
    currentPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
}

function updateProductSummary(card) {
  const optionsSummary = card.querySelector(".selected-options-summary");
  const state = card.productState;

  let summaryHTML = "";

  if (state.selectedColor) {
    summaryHTML += `
            <div class="option-summary-item">
                <span class="option-summary-label">ពណ៌:</span>
                <span class="option-summary-value">${state.selectedColor.label}</span>
            </div>
        `;
  }

  if (state.selectedUom) {
    summaryHTML += `
            <div class="option-summary-item">
                <span class="option-summary-label">ឯកតា:</span>
                <span class="option-summary-value">${state.selectedUom.label}</span>
            </div>
        `;
  }

  summaryHTML += `
        <div class="option-summary-item">
            <span class="option-summary-label">ចំនួន:</span>
            <span class="option-summary-value">${state.quantity}</span>
        </div>
    `;

  optionsSummary.innerHTML = summaryHTML;
  optionsSummary.style.display = "block";
}

function getStockStatusClass(stock) {
  if (stock > 10) return "in-stock";
  if (stock > 0) return "low-stock";
  return "out-of-stock";
}

function getStockStatusText(stock) {
  if (stock > 10) return "មាន";
  if (stock > 0) return "នៅសល់តិច";
  return "អស់";
}

function updateAddToCartButton(card, button) {
  const state = card.productState;
  const isOutOfStock = state.maxQuantity === 0;

  if (isOutOfStock) {
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-times"></i> អស់ពីស្តុក';
  } else {
    button.disabled = false;
    button.innerHTML = '<i class="fas fa-shopping-cart"></i> បន្ថែមទៅកន្ត្រក';
  }
}

// Shopping Cart Functionality
function initializeCart() {
  // Load cart from localStorage
  const savedCart = localStorage.getItem("shoppingCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartTotal();
  }

  // Add to cart buttons
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const productId = this.getAttribute("data-product");
      addToCart(parseInt(productId));
    });
  });

  // Cart icon click
  if (cartIcon) {
    cartIcon.addEventListener("click", toggleCart);
  }

  // Close cart
  if (closeCart) {
    closeCart.addEventListener("click", toggleCart);
  }

  // Checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", proceedToCheckout);
  }
}

function addToCart(productId) {
  const card = document
    .querySelector(`.add-to-cart-btn[data-product="${productId}"]`)
    .closest(".product-card");
  const state = card.productState;
  const product = products[productId];

  if (!product || !state) {
    console.error("Product or state not found:", productId);
    return;
  }

  // Calculate final price
  const uomPrice = state.selectedUom ? state.selectedUom.price : 0;
  const finalPrice = state.basePrice + uomPrice;

  // Create cart item
  const cartItem = {
    id: productId,
    name: product.name,
    basePrice: state.basePrice,
    finalPrice: finalPrice,
    image: product.image,
    quantity: state.quantity,
    color: state.selectedColor,
    uom: state.selectedUom,
    timestamp: Date.now(),
  };

  // Check if similar item already in cart
  const existingItemIndex = cart.findIndex(
    (item) =>
      item.id === cartItem.id &&
      item.color?.name === cartItem.color?.name &&
      item.uom?.value === cartItem.uom?.value
  );

  if (existingItemIndex > -1) {
    // Update quantity of existing item
    cart[existingItemIndex].quantity += cartItem.quantity;
  } else {
    // Add new item to cart
    cart.push(cartItem);
  }

  updateCartTotal();
  updateCartDisplay();
  saveCartToLocalStorage();

  // Show success message
  showNotification(`✅ ${product.name} ត្រូវបានបន្ថែមទៅកន្ត្រក`);

  // Reset product quantity to 1
  state.quantity = 1;
  updateQuantityDisplay(card);
  updateProductSummary(card);
}

function removeFromCart(productId, color, uom) {
  cart = cart.filter(
    (item) =>
      !(
        item.id === productId &&
        item.color?.name === color &&
        item.uom?.value === uom
      )
  );
  updateCartTotal();
  updateCartDisplay();
  saveCartToLocalStorage();
}

function updateQuantityInCart(productId, color, uom, change) {
  const item = cart.find(
    (item) =>
      item.id === productId &&
      item.color?.name === color &&
      item.uom?.value === uom
  );

  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      removeFromCart(productId, color, uom);
    } else {
      updateCartTotal();
      updateCartDisplay();
      saveCartToLocalStorage();
    }
  }
}

function updateCartTotal() {
  cartTotal = cart.reduce(
    (total, item) => total + item.finalPrice * item.quantity,
    0
  );
  if (cartCount) {
    cartCount.textContent = cart.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }
}

function updateCartDisplay() {
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-cart"></i>
                <p>កន្ត្រកទិញឥវ៉ាន់របស់អ្នកទទេ</p>
            </div>
        `;
    if (cartTotalAmount) cartTotalAmount.textContent = "$0.00";
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = "0.6";
    }
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${
          item.name
        }" style="width: 40px; height: 40px; object-fit: cover; border-radius: 5px;">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.finalPrice.toFixed(
                      2
                    )}</div>
                    <div class="cart-item-options">
                        ${
                          item.color
                            ? `<span class="cart-item-option">ពណ៌: ${item.color.label}</span>`
                            : ""
                        }
                        ${
                          item.uom
                            ? `<span class="cart-item-option">ឯកតា: ${item.uom.label}</span>`
                            : ""
                        }
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="updateQuantityInCart(${
                      item.id
                    }, '${item.color?.name || ""}', '${
          item.uom?.value || ""
        }', -1)">-</button>
                    <span style="min-width: 20px; text-align: center;">${
                      item.quantity
                    }</span>
                    <button class="quantity-btn" onclick="updateQuantityInCart(${
                      item.id
                    }, '${item.color?.name || ""}', '${
          item.uom?.value || ""
        }', 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${
                      item.id
                    }, '${item.color?.name || ""}', '${
          item.uom?.value || ""
        }')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `
      )
      .join("");

    if (cartTotalAmount)
      cartTotalAmount.textContent = `$${cartTotal.toFixed(2)}`;
    if (checkoutBtn) {
      checkoutBtn.disabled = false;
      checkoutBtn.style.opacity = "1";
    }
  }
}

function toggleCart() {
  if (!cartSidebar) return;

  cartSidebar.classList.toggle("active");

  // Add overlay when cart is open
  if (cartSidebar.classList.contains("active")) {
    let overlay = document.querySelector(".cart-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "cart-overlay";
      overlay.addEventListener("click", toggleCart);
      document.body.appendChild(overlay);
    }
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  } else {
    const overlay = document.querySelector(".cart-overlay");
    if (overlay) {
      overlay.classList.remove("active");
    }
    document.body.style.overflow = "auto";
  }
}

function proceedToCheckout() {
  if (cart.length === 0) return;

  // Close cart
  toggleCart();

  // Scroll to order form
  scrollToSection("order");

  // Show message
  showNotification("📝 សូមបំពេញព័ត៌មានរបស់អ្នកដើម្បីបញ្ចប់ការបញ្ជាទិញ");
}

function saveCartToLocalStorage() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Form Submissions
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("សូមបន្ថែមផលិតផលមួយចំនួនទៅកន្ត្រកមុនពេលបញ្ជាទិញ!");
      return;
    }

    // Get form data
    const formData = new FormData(orderForm);
    const orderData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      payment: formData.get("payment"),
      items: cart,
      total: cartTotal,
    };

    // In a real application, you would send this data to a server
    console.log("Order submitted:", orderData);

    // Show success message
    alert(
      `សូមអរគុណ ${
        orderData.name
      }! ការបញ្ជាទិញរបស់អ្នកត្រូវបានទទួលយក។ លេខបញ្ជាទិញរបស់អ្នកគឺ #${Math.floor(
        100000 + Math.random() * 900000
      )}`
    );

    // Clear cart and reset form
    cart = [];
    updateCartTotal();
    updateCartDisplay();
    saveCartToLocalStorage();
    orderForm.reset();
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(loginForm);
    const loginData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    // In a real application, you would send this data to a server for authentication
    console.log("Login attempt:", loginData);

    // For demo purposes, we'll just show a success message
    showNotification("អ្នកបានចូលគណនីដោយជោគជ័យ!");

    // Close modal and reset form
    if (loginModal) loginModal.style.display = "none";
    loginForm.reset();
    document.body.style.overflow = "auto";
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(registerForm);
    const registerData = {
      email: formData.get("reg-email"),
      username: formData.get("reg-username"),
      password: formData.get("reg-password"),
      confirmPassword: formData.get("reg-confirm-password"),
    };

    // Check if passwords match
    if (registerData.password !== registerData.confirmPassword) {
      alert("ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ!");
      return;
    }

    // In a real application, you would send this data to a server
    console.log("Registration attempt:", registerData);

    // Show success message
    showNotification("ការចុះឈ្មោះរបស់អ្នកត្រូវបានជោគជ័យ!");

    // Close modal, reset form, and show login
    if (registerModal) registerModal.style.display = "none";
    registerForm.reset();
    if (loginModal) loginModal.style.display = "flex";
  });
}

// Notification System
function showNotification(message) {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create new notification
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 2000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Animate out and remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Animation on scroll - FIXED to exclude product overview
function animateOnScroll() {
  const elements = document.querySelectorAll(".feature-card, .product-card");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Set initial state for animation - only for feature cards and product cards
document.querySelectorAll(".feature-card, .product-card").forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(20px)";
  element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
});

// Listen for scroll events
window.addEventListener("scroll", animateOnScroll);

// Make cart functions globally available
window.updateQuantityInCart = updateQuantityInCart;
window.removeFromCart = removeFromCart;

// Handle window resize
window.addEventListener("resize", function () {
  // Update slider if needed
  if (slider) {
    updateSlider();
  }
});

// Clean up intervals when page is hidden
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    clearInterval(slideInterval);
  } else {
    startAutoSlide();
  }
});
