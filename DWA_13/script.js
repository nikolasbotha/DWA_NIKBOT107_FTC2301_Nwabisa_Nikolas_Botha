
// the two arrays given 

const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']

/**
 * Use forEach to console log each name to the console. You are allowed to call console.log seven times.
 */
names.forEach(item => {
    console.log(item)
})
/**
 * Use forEach to console log each name with a matching province (for example Ashwin (Western Cape). Note that you are only allowed to call console.log seven times.
 */
names.forEach((name, i) =>{
    console.log(`${name} (${provinces[i]})`);
});
/**
 * Using map loop over all province names and turn the string to all uppercase. Log the new array to the console.
 */
console.log(
    provinces.map((province => province.toUpperCase())
));
/**
 * Create a new array with map that has the amount of characters in each name. The result should be: [6, 9, 11, 5, 8, 7, 7]
 */
console.log(
    names.map(name => name.length)
)
/**
 * Using toSorted to sort all provinces alphabetically.
 */
console.log(provinces.sort())
/**
 * Use filter to remove all provinces that have the word Cape in them. After filtering the array, return the amount of provinces left. The final value should be 3
 */
console.log(provinces.filter(province => !province.includes("cape")))
/**
 * Create a boolean array by using map and some to determine whether a name contains an S character. The result should be [true, true, false, true, false, true, false]
 */
const sNames = name  => name.toLowerCase().includes('s');
console.log(names.map(sNames))
/**
 * Using only reduce, turn the above into an object that indicates the province of an individual. In other words:
 */
const provinceObject = names.reduce((obj, name, index) => {
    obj[name] = provinces[index];
    return obj;
  }, {});
  
  console.log(provinceObject);
