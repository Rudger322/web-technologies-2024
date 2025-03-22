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
let myPizza = new Pizza("Маргарита","Маленькая");


function LoadClick(){
  document.querySelectorAll(".changeType").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".pizza-btn").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      myPizza.type = button.dataset.type;
      console.log(`Выбрана пицца: ${myPizza.type}`);
      document.getElementById("showPrice").setAttribute("value",`Цена: ${myPizza.calculatePrice()} руб. Калорийность: ${myPizza.calculateCalories()} ккал`);
    });
  });

  document.querySelectorAll(".changeSize").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      myPizza.size = button.dataset.size;
      console.log(`Выбран размер: ${myPizza.size}`);
      document.getElementById("showPrice").setAttribute("value",`Цена: ${myPizza.calculatePrice()} руб. Калорийность: ${myPizza.calculateCalories()} ккал`);
    });
  });

  document.querySelectorAll(".changeTopping").forEach(button => {
    button.addEventListener("click", () => {
      let topping = button.dataset.topping;

      if (myPizza.getToppings().includes(topping)) {
        myPizza.removeTopping(topping);
        button.classList.remove("active");
        console.log(`Удалён топпинг: ${topping}`);
      } else {
        myPizza.addTopping(topping);
        button.classList.add("active");
        console.log(`Добавлен топпинг: ${topping}`);
      }
      document.getElementById("showPrice").setAttribute("value",`Цена: ${myPizza.calculatePrice()} руб. Калорийность: ${myPizza.calculateCalories()} ккал`);
    });
  });
}

function ListPizza() {



  this.renderParent = function () {
    let parentElem = document.createElement('div');
    let Margarita = document.createElement('button');
    Margarita.textContent = "Маргарита";
    Margarita.setAttribute('class','changeType');
    Margarita.setAttribute('data-type','Маргарита');
    let Peperony = document.createElement('button');
    Peperony.textContent= "Пепперони";
    Peperony.setAttribute('class','changeType');
    Peperony.setAttribute('data-type','Пепперони');
    let Bavarsky = document.createElement('button');
    Bavarsky.textContent="Баварская";
    Bavarsky.setAttribute('class','changeType');
    Bavarsky.setAttribute('data-type','Баварская');
    parentElem.appendChild(Margarita);
    parentElem.appendChild(Peperony);
    parentElem.appendChild(Bavarsky);
    return parentElem
  }

  this.SizeChoise = function(){
    let parentElem = document.createElement('div');
    let Big = document.createElement('button');
    Big.textContent="Большая";
    Big.setAttribute('class','changeSize');
    Big.setAttribute('data-size','Большая');
    let Small = document.createElement('button');
    Small.textContent="Маленькая";
    Small.setAttribute('class','changeSize');
    Small.setAttribute('data-size','Маленькая');
    parentElem.appendChild(Big);
    parentElem.appendChild(Small);
    return parentElem
  }

  this.ToppingChoise= function(){
    let parentElem = document.createElement('div');
    let CheeseBort = document.createElement('button');
    CheeseBort.textContent="Сырный борт";
    CheeseBort.setAttribute('class','changeTopping');
    CheeseBort.setAttribute('data-topping','сырный борт');
    let Mozarella = document.createElement('button');
    Mozarella.textContent="Моцарелла";
    Mozarella.setAttribute('class','changeTopping');
    Mozarella.setAttribute('data-topping','сливочная моцарелла');
    let Cheder = document.createElement('button');
    Cheder.textContent="Чедер";
    Cheder.setAttribute('class','changeTopping');
    Cheder.setAttribute('data-topping','чедер и пармезан');
    parentElem.appendChild(CheeseBort);
    parentElem.appendChild(Mozarella);
    parentElem.appendChild(Cheder);
    return parentElem
  }
  let pizzaContainer = document.getElementsByClassName("Choise_pizza")[0];
  let sizeContainer = document.getElementsByClassName("Component_size")[0];
  let toppingContainer = document.getElementsByClassName("Component_topping")[0];

  if (pizzaContainer) pizzaContainer.appendChild(this.renderParent());
  if (sizeContainer) sizeContainer.appendChild(this.SizeChoise());
  if (toppingContainer) toppingContainer.appendChild(this.ToppingChoise());

}

ListPizza();
LoadClick();