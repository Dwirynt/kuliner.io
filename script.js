(() => {
  const navButtons = document.querySelectorAll('nav button');
  const sections = document.querySelectorAll('main > section');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalDesc = document.getElementById('modalDesc');
  const modalCloseBtn = modal.querySelector('.close-btn');

  // Dishes data
  const dishes = [
    {
      id: 1,
      name: "Rendang Padang",
      region: "Sumatera",
      image: "assets//Rendang.jpg",
      description: "Rendang adalah masakan daging khas Minangkabau, Sumatera Barat, yang dimasak dengan rempah-rempah dan santan hingga empuk dan kering."
    },
    {
      id: 2,
      name: "Gudeg Jogja",
      region: "Jawa",
      image: "assets//GudegJogja.jpg",
      description: "Gudeg adalah makanan khas Yogyakarta yang terbuat dari nangka muda yang dimasak dengan santan dan rempah khas."
    },
    {
      id: 3,
      name: "Sate Lilit Bali",
      region: "Bali & Nusa Tenggara",
      image: "assets//SateLilit.jpg",
      description: "Sate lilit adalah sate khas Bali yang terbuat dari ikan cincang yang dibumbui dan dililitkan pada batang serai."
    },
    {
      id: 4,
      name: "Papeda dan Ikan Kuah Kuning",
      region: "Maluku & Papua",
      image: "assets//papeda.jpg",
      description: "Papeda adalah makanan khas Papua dan Maluku terbuat dari tepung sagu yang dimakan dengan ikan kuah kuning bercita rasa asam segar."
    },
    {
      id: 5,
      name: "Sayur Asem Betawi",
      region: "Jawa",
      image: "assets//SayurAsem.jpg",
      description: "Sayur Asem adalah sup asam khas Betawi berupa campuran sayuran dengan rasa segar yang unik."
    },
    {
      id: 6,
      name: "Ikan Baung Bakar",
      region: "Kalimantan",
      image: "assets//ikanBaung.jpg",
      description: "Ikan baung bakar merupakan masakan khas Kalimantan dengan ikan yang dibumbui lalu dibakar hingga wangi dan lezat."
    },
    {
      id: 7,
      name: "Coto Makassar",
      region: "Sulawesi",
      image: "assets//CotoMakassar.jpg",
      description: "Coto Makassar adalah sop daging tradisional khas Makassar dengan kuah kacang yang kaya rasa."
    },
  ];

  // UMKM Vendors data
  const vendors = [
    {
      id: 1,
      name: "Dapur Minang",
      logo: "assets//DapurMinang.jpg",
      description: "Menyajikan rendang asli Minang dengan bahan berkualitas dan resep turun-temurun.",
      products: "Rendang, Dendeng Balado, Gulai"
    },
    {
      id: 2,
      name: "Jogja Rasa",
      logo: "assets//KulinerJogja.jpg",
      description: "Menawarkan gudeg khas Yogyakarta dan aneka jajanan tradisional.",
      products: "Gudeg, Bakpia, Wedang Ronde"
    },
    {
      id: 3,
      name: "Bali Sari",
      logo: "assets//BaliSari.jpg",
      description: "Kuliner Bali dengan cita rasa autentik, siap mengantar ke pintu rumah Anda.",
      products: "Sate Lilit, Ayam Betutu, Lawar"
    },
    {
      id: 4,
      name: "Timika Food",
      logo: "assets//TimikaFood.jpg",
      description: "Mempromosikan kuliner khas Papua dan Maluku yang lezat dan sehat.",
      products: "Papeda, Ikan Kuah Kuning, Ulat Sagu"
    }
  ];

  // Navigation functionality
  function activateSection(id) {
    sections.forEach(section => {
      if(section.id === id) {
        section.hidden = false;
        section.setAttribute('tabindex', '0');
      } else {
        section.hidden = true;
        section.removeAttribute('tabindex');
      }
    });
    navButtons.forEach(button => {
      if(button.getAttribute('aria-controls') === id) {
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        button.focus();
      } else {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
      }
    });
  }
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      activateSection(button.getAttribute('aria-controls'));
    });
  });

  // Dish list rendering
  const dishListEl = document.getElementById('dishList');
  const regionFilterEl = document.getElementById('regionFilter');
  const searchInputEl = document.getElementById('searchDish');

  function createDishCard(dish) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'dish-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', `${dish.name}, dari daerah ${dish.region}. Klik untuk detail.`);

    const img = document.createElement('img');
    img.src = dish.image;
    img.alt = `${dish.name}`;
    img.className = 'dish-image';
    img.loading = "lazy";

    const info = document.createElement('div');
    info.className = 'dish-info';

    const name = document.createElement('div');
    name.className = 'dish-name';
    name.textContent = dish.name;

    const region = document.createElement('div');
    region.className = 'dish-region';
    region.textContent = dish.region;

    info.appendChild(name);
    info.appendChild(region);

    card.appendChild(img);
    card.appendChild(info);

    card.addEventListener('click', () => {
      showModal(dish);
    });

    return card;
  }

  function renderDishList() {
    const selectedRegion = regionFilterEl.value;
    const searchText = searchInputEl.value.toLowerCase();

    const filteredDishes = dishes.filter(dish => {
      const matchRegion = selectedRegion === '' || dish.region === selectedRegion;
      const matchSearch = dish.name.toLowerCase().includes(searchText);
      return matchRegion && matchSearch;
    });

    dishListEl.innerHTML = '';
    if(filteredDishes.length === 0) {
      const noResult = document.createElement('p');
      noResult.textContent = 'Kuliner tidak ditemukan dengan filter dan kata kunci tersebut.';
      noResult.style.color = '#7A3B27';
      dishListEl.appendChild(noResult);
      return;
    }

    filteredDishes.forEach(dish => {
      dishListEl.appendChild(createDishCard(dish));
    });
  }

  regionFilterEl.addEventListener('change', renderDishList);
  searchInputEl.addEventListener('input', renderDishList);

  // UMKM vendor list rendering
  const vendorListEl = document.getElementById('vendorList');

  function createVendorCard(vendor) {
    const card = document.createElement('div');
    card.className = 'vendor-card';

    const logo = document.createElement('img');
    logo.src = vendor.logo;
    logo.alt = `Logo ${vendor.name}`;
    logo.className = 'vendor-logo';
    logo.loading = "lazy";

    const info = document.createElement('div');
    info.className = 'vendor-info';

    const name = document.createElement('div');
    name.className = 'vendor-name';
    name.textContent = vendor.name;

    const desc = document.createElement('div');
    desc.className = 'vendor-desc';
    desc.textContent = vendor.description;

    const products = document.createElement('div');
    products.className = 'vendor-products';
    products.textContent = `Produk: ${vendor.products}`;

    info.appendChild(name);
    info.appendChild(desc);
    info.appendChild(products);

    card.appendChild(logo);
    card.appendChild(info);

    return card;
  }

  function renderVendorList() {
    vendorListEl.innerHTML = '';
    vendors.forEach(vendor => {
      vendorListEl.appendChild(createVendorCard(vendor));
    });
  }

  // Modal functions
  function showModal(dish) {
    modalTitle.textContent = dish.name;
    modalImage.src = dish.image;
    modalImage.alt = dish.name;
    modalDesc.textContent = dish.description;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modalCloseBtn.focus();
  }
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if(e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === "Escape" && modal.classList.contains('active')){
      closeModal();
    }
  });

  // Initial render
  renderDishList();
  renderVendorList();

  // Default active section About
  activateSection('about');
})();
