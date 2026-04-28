const products = [
  // Eletrônicos
  {
    name: 'Notebook Gamer Acer Nitro 5',
    image: '/images/notebook1.jpg',
    brand: 'Acer',
    category: 'Eletrônicos',
    description: 'Notebook gamer com Intel i7, 16GB RAM, RTX 3060, tela 144Hz.',
    price: 6799.99,
    countInStock: 8
  },
  {
    name: 'Smartphone Samsung Galaxy S23',
    image: '/images/smartphone1.jpg',
    brand: 'Samsung',
    category: 'Eletrônicos',
    description: 'Smartphone topo de linha, 256GB, tela 6.6 polegadas, câmera 50MP.',
    price: 3899.99,
    countInStock: 15
  },
  {
    name: 'Monitor LG UltraWide 29"',
    image: '/images/monitor1.jpg',
    brand: 'LG',
    category: 'Eletrônicos',
    description: 'Monitor ultrawide 29 polegadas, resolução 2560x1080, IPS, 75Hz.',
    price: 1299.99,
    countInStock: 12
  },
  {
    name: 'Teclado Mecânico Redragon Kumara',
    image: '/images/teclado1.jpg',
    brand: 'Redragon',
    category: 'Acessórios',
    description: 'Teclado mecânico com switch blue, RGB, ABNT2.',
    price: 189.99,
    countInStock: 30
  },
  {
    name: 'Mouse Gamer Logitech G403',
    image: '/images/mouse1.jpg',
    brand: 'Logitech',
    category: 'Acessórios',
    description: 'Mouse ergonômico, 16000 DPI, RGB, 6 botões programáveis.',
    price: 199.99,
    countInStock: 25
  },
  {
    name: 'Headset HyperX Cloud Stinger',
    image: '/images/headset1.jpg',
    brand: 'HyperX',
    category: 'Áudio',
    description: 'Headset gamer com som surround, microfone flexível.',
    price: 249.99,
    countInStock: 20
  },
  {
    name: 'Tablet Samsung Tab S8',
    image: '/images/tablet1.jpg',
    brand: 'Samsung',
    category: 'Eletrônicos',
    description: 'Tablet com caneta S Pen incluída, 128GB, tela 11 polegadas.',
    price: 2999.99,
    countInStock: 10
  },
  {
    name: 'Fone Bluetooth JBL Tune 510BT',
    image: '/images/fone1.jpg',
    brand: 'JBL',
    category: 'Áudio',
    description: 'Fone over-ear com bateria de 40h, carregamento rápido.',
    price: 249.99,
    countInStock: 18
  },
  {
    name: 'Smartwatch Amazfit GTS 4',
    image: '/images/smartwatch1.jpg',
    brand: 'Amazfit',
    category: 'Acessórios',
    description: 'Smartwatch com GPS, monitor cardíaco, resistente à água.',
    price: 899.99,
    countInStock: 22
  },
  {
    name: 'Caixa de Som JBL Flip 6',
    image: '/images/caixa1.jpg',
    brand: 'JBL',
    category: 'Áudio',
    description: 'Caixa de som portátil à prova dágua, 20W, Bluetooth.',
    price: 599.99,
    countInStock: 14
  },
  // Roupas
  {
    name: 'Camiseta Básica Branca',
    image: '/images/camiseta1.jpg',
    brand: 'Hering',
    category: 'Roupas',
    description: 'Camiseta 100% algodão, confortável e durável.',
    price: 29.99,
    countInStock: 100
  },
  {
    name: 'Calça Jeans Skinny',
    image: '/images/calca1.jpg',
    brand: 'Levis',
    category: 'Roupas',
    description: 'Calça jeans azul escura, modelo skinny, elastano.',
    price: 149.99,
    countInStock: 45
  },
  {
    name: 'Jaqueta Corta Vento',
    image: '/images/jaqueta1.jpg',
    brand: 'Nike',
    category: 'Roupas',
    description: 'Jaqueta esportiva, impermeável, ideal para corrida.',
    price: 299.99,
    countInStock: 20
  },
  {
    name: 'Tênis Esportivo Adidas Run',
    image: '/images/tenis1.jpg',
    brand: 'Adidas',
    category: 'Calçados',
    description: 'Tênis para corrida com amortecimento, respirável.',
    price: 399.99,
    countInStock: 35
  },
  {
    name: 'Boné Trucker',
    image: '/images/bone1.jpg',
    brand: 'Vans',
    category: 'Acessórios',
    description: 'Boné estilo trucker, ajustável, tecido mesh.',
    price: 49.99,
    countInStock: 60
  },
  {
    name: 'Mochila Escolar 20L',
    image: '/images/mochila1.jpg',
    brand: 'Samsonite',
    category: 'Acessórios',
    description: 'Mochila resistente, com compartimento para notebook.',
    price: 179.99,
    countInStock: 25
  },
  {
    name: 'Relógio Caso Vintage',
    image: '/images/relogio1.jpg',
    brand: 'Casio',
    category: 'Acessórios',
    description: 'Relógio analógico, pulseira de couro, estilo retrô.',
    price: 129.99,
    countInStock: 30
  },
  {
    name: 'Óculos de Sol Ray-Ban',
    image: '/images/oculos1.jpg',
    brand: 'Ray-Ban',
    category: 'Acessórios',
    description: 'Óculos de sol clássico, lentes polarizadas, proteção UV.',
    price: 549.99,
    countInStock: 12
  },
  // Casa e decoração
  {
    name: 'Jogo de Lençóis Casal',
    image: '/images/lencol1.jpg',
    brand: 'Santista',
    category: 'Casa',
    description: 'Jogo com 4 peças, 100% algodão, várias cores.',
    price: 89.99,
    countInStock: 40
  },
  {
    name: 'Tapete Felpudo 1.5x2m',
    image: '/images/tapete1.jpg',
    brand: 'São Carlos',
    category: 'Casa',
    description: 'Tapete macio, antiderrapante, fácil limpeza.',
    price: 159.99,
    countInStock: 15
  },
  {
    name: 'Kit Panelas Antiaderente',
    image: '/images/panela1.jpg',
    brand: 'Tramontina',
    category: 'Casa',
    description: 'Kit com 5 panelas, cabo inox, revestimento cerâmico.',
    price: 299.99,
    countInStock: 18
  },
  {
    name: 'Luminária LED Mesa',
    image: '/images/luminaria1.jpg',
    brand: 'Philips',
    category: 'Casa',
    description: 'Luminária com regulagem de brilho, braço flexível.',
    price: 79.99,
    countInStock: 22
  },
  {
    name: 'Quadro Decorativo Abstrato',
    image: '/images/quadro1.jpg',
    brand: 'Portinari',
    category: 'Decoração',
    description: 'Quadro com moldura preta, 60x90cm.',
    price: 149.99,
    countInStock: 8
  },
  // Livros e papelaria
  {
    name: 'Livro Clean Code - Robert Martin',
    image: '/images/livro1.jpg',
    brand: 'Alta Books',
    category: 'Livros',
    description: 'Princípios de programação ágil e boas práticas.',
    price: 79.99,
    countInStock: 50
  },
  {
    name: 'Caderno Inteligente',
    image: '/images/caderno1.jpg',
    brand: 'Tilibra',
    category: 'Papelaria',
    description: 'Caderno universitário com capa dura, 200 folhas.',
    price: 24.99,
    countInStock: 80
  },
  {
    name: 'Caneta Esferográfica BIC',
    image: '/images/caneta1.jpg',
    brand: 'BIC',
    category: 'Papelaria',
    description: 'Caneta azul, ponta média, pack com 10 unidades.',
    price: 9.99,
    countInStock: 200
  },
  // Brinquedos e games
  {
    name: 'Console PlayStation 5',
    image: '/images/ps5.jpg',
    brand: 'Sony',
    category: 'Games',
    description: 'Console de última geração, 825GB SSD, leitor de disco.',
    price: 4499.99,
    countInStock: 5
  },
  {
    name: 'Controle DualSense',
    image: '/images/controle1.jpg',
    brand: 'Sony',
    category: 'Games',
    description: 'Controle sem fio para PS5, efeitos hápticos.',
    price: 399.99,
    countInStock: 25
  },
  {
    name: 'Boneco Action Figure Homem de Ferro',
    image: '/images/boneco1.jpg',
    brand: 'Hasbro',
    category: 'Brinquedos',
    description: 'Action figure 30cm, articulado, com acessórios.',
    price: 199.99,
    countInStock: 12
  },
  {
    name: 'Jogo de Tabuleiro Catan',
    image: '/images/catan.jpg',
    brand: 'Grow',
    category: 'Brinquedos',
    description: 'Jogo de estratégia para 3-4 jogadores.',
    price: 249.99,
    countInStock: 10
  },
  // Mais eletrônicos e periféricos
  {
    name: 'SSD 1TB NVMe',
    image: '/images/ssd1.jpg',
    brand: 'Kingston',
    category: 'Hardware',
    description: 'SSD NVMe, leitura 3500MB/s, para jogos e trabalho.',
    price: 399.99,
    countInStock: 28
  },
  {
    name: 'Placa de Vídeo RTX 4060',
    image: '/images/placa1.jpg',
    brand: 'NVIDIA',
    category: 'Hardware',
    description: '8GB GDDR6, ray tracing, DLSS 3.',
    price: 2199.99,
    countInStock: 7
  },
  {
    name: 'Fonte 650W 80Plus Gold',
    image: '/images/fonte1.jpg',
    brand: 'Corsair',
    category: 'Hardware',
    description: 'Fonte modular, eficiência Gold, silenciosa.',
    price: 599.99,
    countInStock: 15
  },
  {
    name: 'Gabinete Gamer Mid Tower',
    image: '/images/gabinete1.jpg',
    brand: 'Cooler Master',
    category: 'Hardware',
    description: 'Gabinete com vidro temperado, 3 fans RGB.',
    price: 349.99,
    countInStock: 20
  },
  {
    name: 'Webcam Logitech C920',
    image: '/images/webcam1.jpg',
    brand: 'Logitech',
    category: 'Acessórios',
    description: 'Webcam Full HD 1080p, microfone estéreo.',
    price: 399.99,
    countInStock: 9
  },
  // Alimentos e bebidas
  {
    name: 'Café Gourmet em Grãos',
    image: '/images/cafe1.jpg',
    brand: 'Três Corações',
    category: 'Alimentos',
    description: 'Café torrado em grãos, 500g, sabor intenso.',
    price: 29.99,
    countInStock: 50
  },
  {
    name: 'Chocolate Meio Amargo 70%',
    image: '/images/chocolate1.jpg',
    brand: 'Lindt',
    category: 'Alimentos',
    description: 'Tablete 100g, cacau 70%, sem glúten.',
    price: 12.99,
    countInStock: 80
  },
  {
    name: 'Vinho Tinto Chileno',
    image: '/images/vinho1.jpg',
    brand: 'Concha y Toro',
    category: 'Bebidas',
    description: 'Vinho tinto reservado, 750ml, uva Cabernet.',
    price: 39.99,
    countInStock: 30
  },
  // Beleza e cuidados
  {
    name: 'Perfume Importado Masculino',
    image: '/images/perfume1.jpg',
    brand: 'Invictus',
    category: 'Beleza',
    description: 'Perfume 100ml, fragrância amadeirada e fresca.',
    price: 299.99,
    countInStock: 18
  },
  {
    name: 'Kit Cremes Anti-idade',
    image: '/images/creme1.jpg',
    brand: 'Loreal',
    category: 'Beleza',
    description: 'Kit com hidratante facial, serum e protetor solar.',
    price: 89.99,
    countInStock: 25
  },
  // Esporte e lazer
  {
    name: 'Bicicleta Aro 29',
    image: '/images/bike1.jpg',
    brand: 'Caloi',
    category: 'Esportes',
    description: 'Bicicleta mountain bike, 21 marchas, freio a disco.',
    price: 1599.99,
    countInStock: 6
  },
  {
    name: 'Patins Inline Profissional',
    image: '/images/patins1.jpg',
    brand: 'Traxart',
    category: 'Esportes',
    description: 'Patins com rodas em linha, tamanhos ajustáveis.',
    price: 349.99,
    countInStock: 12
  },
  // Móveis e escritório
  {
    name: 'Cadeira Gamer',
    image: '/images/cadeira1.jpg',
    brand: 'DT3',
    category: 'Móveis',
    description: 'Cadeira ergonômica, ajuste de altura, reclinável.',
    price: 1199.99,
    countInStock: 20
  },
  {
    name: 'Mesa Digitalizadora',
    image: '/images/mesa1.jpg',
    brand: 'Wacom',
    category: 'Escritório',
    description: 'Mesa digitalizadora para desenho, 10 polegadas.',
    price: 399.99,
    countInStock: 10
  },
  // Pets
  {
    name: 'Ração Premium para Cães',
    image: '/images/racao1.jpg',
    brand: 'Premier',
    category: 'Pets',
    description: 'Ração para cães adultos, sabor frango, 10kg.',
    price: 129.99,
    countInStock: 35
  },
  {
    name: 'Brinquedo Mordedor',
    image: '/images/brinquedo1.jpg',
    brand: 'PetLove',
    category: 'Pets',
    description: 'Brinquedo de corda para cães, resistente.',
    price: 19.99,
    countInStock: 45
  },
  // Automotivo
  {
    name: 'Capas de Banco Automotivo',
    image: '/images/capa1.jpg',
    brand: 'GG',
    category: 'Automotivo',
    description: 'Jogo de capas para bancos dianteiros, preto/cinza.',
    price: 99.99,
    countInStock: 18
  },
  {
    name: 'GPS com Mapa Brasil',
    image: '/images/gps1.jpg',
    brand: 'Garmin',
    category: 'Automotivo',
    description: 'GPS com tela 6 polegadas, mapas vitalícios.',
    price: 899.99,
    countInStock: 7
  },
  // Ferramentas
  {
    name: 'Furadeira de Impacto',
    image: '/images/furadeira1.jpg',
    brand: 'Bosch',
    category: 'Ferramentas',
    description: 'Furadeira 600W, mandril 13mm, reversível.',
    price: 249.99,
    countInStock: 14
  },
  {
    name: 'Jogo de Chaves de Boca',
    image: '/images/chaves1.jpg',
    brand: 'Gedore',
    category: 'Ferramentas',
    description: 'Kit com 10 chaves de boca, aço cromo-vanádio.',
    price: 89.99,
    countInStock: 22
  }
]

export default products