const fileName = [ 'Harvard1.jpg', 'Harvard2.jpg', 'Harvard3.jpg', 'Harvard4.jpg', 'Harvard5.jpg', 'Harvard6.jpg', 'Harvard7.jpg' ]
const fileName2 = [ 'Mit1.jpg', 'Mit2.jpg', 'Mit3.jpg', 'Mit4.jpg', 'Mit5.PNG' ]
const fileName3 = [ 'Modern1.PNG', 'Modern2.png' ]

const harvardFileArray = fileName.map((item, ind)=>`/assets/images/templates/Harvard/${item}`)
const mitFileArray = fileName2.map((item, ind)=>`/assets/images/templates/Mit/${item}`)
const modernFileArray = fileName3.map((item, ind)=>`/assets/images/templates/Modern/${item}`)

export { harvardFileArray, mitFileArray, modernFileArray }