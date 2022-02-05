const criteriaSet = [{
  inscription: 'Rating',
  criteria: 'productRating'
},
{
  inscription: 'Price',
  criteria: 'productPrice'
},
{
  inscription: 'Creation date',
  criteria: 'creationDate'
}];

const genreSet = [{
  inscription: 'All genres',
  value: '',
  checked: true
}, {
  inscription: 'Shooter',
  value: 'shooter',
  checked: false
}, {
  inscription: 'Action',
  value: 'action',
  checked: false
}, {
  inscription: 'Arcade',
  value: 'arcade',
  checked: false
}, {
  inscription: 'Adventure',
  value: 'adventure',
  checked: false
}];

const priceSet = [{
  inscription: 'All prices',
  value: 0,
  less: false,
  checked: true
}, {
  inscription: 'Below 5$',
  value: 5,
  less: true,
  checked: false
}, {
  inscription: 'Below 10$',
  value: 10,
  less: true,
  checked: false
}, {
  inscription: 'Below 20$',
  value: 20,
  less: true,
  checked: false
}, {
  inscription: 'Below 50$',
  value: 50,
  less: true,
  checked: false
}, {
  inscription: 'Over 40$',
  value: 40,
  less: false,
  checked: false
}];

const platformSet = [{
  inscription: 'All platforms',
  value: '',
  checked: true
}, {
  inscription: 'PC',
  value: '1',
  checked: false
}, {
  inscription: 'PS',
  value: '2',
  checked: false
}, {
  inscription: 'Xbox',
  value: '3',
  checked: false
}];

export {
  criteriaSet, genreSet, priceSet, platformSet 
}
