class Pizza {
    static BASE_PIZZAS = {
      "Маргарита": { price: 500, calories: 300 },
      "Пепперони": { price: 800, calories: 400 },
      "Баварская": { price: 700, calories: 450 }
    };
    
    static SIZES = {
      "Большая": { price: 200, calories: 200 },
      "Маленькая": { price: 100, calories: 100 }
    };
    
    static TOPPINGS = {
      "сливочная моцарелла": { price: 50, calories: 20 },
      "сырный борт": { small: { price: 150, calories: 50 }, large: { price: 300, calories: 50 } },
      "чедер и пармезан": { small: { price: 150, calories: 50 }, large: { price: 300, calories: 50 } }
    };
  
    constructor(type, size) {
      if (!Pizza.BASE_PIZZAS[type] || !Pizza.SIZES[size]) {
        throw new Error("Некорректный тип пиццы или размер.");
      }
      this.type = type;
      this.size = size;
      this.toppings = [];
    }
  
    addTopping(topping) {
      if (Pizza.TOPPINGS[topping] && !this.toppings.includes(topping)) {
        this.toppings.push(topping);
      }
    }
  
    removeTopping(topping) {
      this.toppings = this.toppings.filter(t => t !== topping);
    }
  
    getToppings() {
      return this.toppings;
    }
  
    getSize() {
      return this.size;
    }
  
    getType() {
      return this.type;
    }
  
    calculatePrice() {
      let price = Pizza.BASE_PIZZAS[this.type].price + Pizza.SIZES[this.size].price;
      
      this.toppings.forEach(topping => {
        if (Pizza.TOPPINGS[topping].small) {
          price += this.size === "Маленькая" ? Pizza.TOPPINGS[topping].small.price : Pizza.TOPPINGS[topping].large.price;
        } else {
          price += Pizza.TOPPINGS[topping].price;
        }
      });
      
      return price;
    }
  
    calculateCalories() {
      let calories = Pizza.BASE_PIZZAS[this.type].calories + Pizza.SIZES[this.size].calories;
      
      this.toppings.forEach(topping => {
        if (Pizza.TOPPINGS[topping].small) {
          calories += this.size === "Маленькая" ? Pizza.TOPPINGS[topping].small.calories : Pizza.TOPPINGS[topping].large.calories;
        } else {
          calories += Pizza.TOPPINGS[topping].calories;
        }
      });
      
      return calories;
    }
  }
  
const myPizza = new Pizza("Пепперони", "Большая");
console.log("Создана пицца:", myPizza.getType(), myPizza.getSize());

myPizza.addTopping("сливочная моцарелла");
myPizza.addTopping("сырный борт");
console.log("Добавленные топпинги:", myPizza.getToppings());

myPizza.removeTopping("сливочная моцарелла");
console.log("Топпинги после удаления:", myPizza.getToppings());

console.log("Цена пиццы:", myPizza.calculatePrice(), "руб.");
console.log("Калорийность пиццы:", myPizza.calculateCalories(), "Ккал.");

const anotherPizza = new Pizza("Маргарита", "Маленькая");
anotherPizza.addTopping("чедер и пармезан");
console.log("Создана другая пицца:", anotherPizza.getType(), anotherPizza.getSize());
console.log("Добавленные топпинги:", anotherPizza.getToppings());
console.log("Цена другой пиццы:", anotherPizza.calculatePrice(), "руб.");
console.log("Калорийность другой пиццы:", anotherPizza.calculateCalories(), "Ккал.");
