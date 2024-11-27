// Функция для получения и отображения товаров с ограниченным по количеству

async function fetchProducts(limit = 6) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
        const products = await response.json();

        console.log(products);

        displayProducts(products);
    } catch (error) {
        console.error("Ошибка добавления товаров:", error);
    }
};

// Функция для отображения товаров

function displayProducts(products) {
    const productList = document.getElementById("product-list");
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
        <h2>${product.title}</h2>
        <p>${produc.price} USD</p>
        <p>${product.description}</p>
        <button onclick="deleteProduct(${product.id})">Удалить</button>
        `;
        productList.appendChild(productCard);
    });
};

// Функция для добавления нового товара

async function addProduct(title, price, description, category) {
    try {
        const response = await fetch("https://fakestoreapi.com/products", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, price, description, category }),
        });
        const newProduct = await response.json();
        alert("Товар успешно добавлен!");
        fetchProducts(); //Обновляем список товаров
    } catch (error) {
        console.error("Ошибка добавления товара:", error);
    }
};

// Функция для удаления товара

async function deleteProduct(id) {
    try {
        await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "DELETE",
        });
        alert("Товар удалён!");
        document.getElementById("product-list").innerHTML = "https://fakestoreapi.com/products"; //Очищаем список
        fetchProducts(); //Загружаем заново
    } catch (error) {
        console.error("Ощибка удаления товара:", error);
    }
};

//Обработчик для отправки формы добавления товара
document.getElementById("add-product-form").addEventListener("submit", function (event) {
    event.preventDefault(); //Оставляем стандартное поведение формы
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    addProduct(title, price, description, category);
});

// Пагинация: Обработчик кнопки "Загрузить ещё"
let loadedProducts = 6;
document.getElementById("load-more").addEventListener("click", function(){
    loadedProducts += 6;
    fetchProducts(loadedProducts);
});

// Первоначальная загрузка товаров при загрузке страницы
fetchProducts();






