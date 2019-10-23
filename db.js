const products = [{
    id: '12345678901',
    name: 'Media',
    price: 50.00,
    currency: 'PEN',
    owner: 'user1'
  },
  {
    id: '12345678902',
    name: 'Pantalon',
    price: 150.00,
    currency: 'PEN',
    owner: 'user2'
  },
  {
    id: '12345678903',
    name: 'zapato',
    price: 120.00,
    currency: 'PEN',
    owner: 'user2'
  },
  {
    id: '12345678904',
    name: 'zapatilla',
    price: 100.00,
    currency: 'PEN',
    owner: 'user1'
  },
]

const users = [{
    id: 'user1',
    name: 'Jhonatan Paucara',
    nickName: 'JP19',
    password: 'clave1'
  },
  {
    id: 'user2',
    name: 'Jenny Pirca',
    nickName: 'JP27',
    password: 'clave2'
  },
];

// Trailing comma
module.exports = {
  products,
  users,
}