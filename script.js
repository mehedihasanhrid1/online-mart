const copyDiscountCoupon = document.getElementById('discount-coupon');

copyDiscountCoupon.addEventListener('click', function(){
  const discountText = copyDiscountCoupon.innerText;
  const textarea = document.createElement('textarea');
  textarea.value = discountText;
  document.body.appendChild(textarea);
  
  textarea.select();
  textarea.setSelectionRange(0, 99999); 

  document.execCommand('copy');

  document.body.removeChild(textarea);
  
  copyDiscountCoupon.textContent = 'Copied!';
  
  setTimeout(() => {
    copyDiscountCoupon.textContent = discountText;
  }, 2000);
});

const couponButton = document.getElementById('coupon-button');
const purchaseButton = document.getElementById('purchase-button');
const totalPriceElement = document.getElementById('total-price');
const discountElement = document.getElementById('total-discount');
const finalPriceElement = document.getElementById('price-after-discount');
const cartItemContainer = document.getElementById('cart-item');
const couponCodeInput = document.getElementById('coupon-code');


let itemList = [];
let totalPrice = 0;
let discount = 0;

couponButton.disabled = true;
purchaseButton.disabled = true;

function addItem(item, price) {
    itemList.push({ name: item, price: price });
    totalPrice += price; 
    updatePrice();
}

function removeItem(index) {
    if (index >= 0 && index < itemList.length) {
        totalPrice -= itemList[index].price;
        itemList.splice(index, 1); 
       updatePrice();
    }
}

function updatePrice(){
    totalPriceElement.innerText = totalPrice.toFixed(2);
    discountElement.innerText = discount.toFixed(2);
    finalPriceElement.innerText = (totalPrice - discount).toFixed(2);
    purchaseButton.disabled = totalPrice === 0;
    couponButton.disabled = totalPrice < 3000;
    renderList();
}

function renderList() {
    cartItemContainer.innerHTML = ''; 
    itemList.forEach((item, index) => {
        cartItemContainer.innerHTML +=  ` <div class="flex items-center justify-between">
                <span>${index + 1}. ${item.name}</span>
                <span>
                 <i onclick="removeItem(${index})" class="fa-solid fa-close text-red-600 text-xl font-semibold mt-1 cursor-pointer"></i>
                </span>
            </div> `;
    });
}

couponButton.addEventListener('click', () => {
    const couponCode = couponCodeInput.value.trim();
    if (couponCode === "DISCOUNT20" && totalPrice >= 3000) { 
        discount = totalPrice * 0.2;
    } else {
        discount = 0;
    }
    updatePrice();
});

purchaseButton.addEventListener('click', () => {
    itemList = [];
    totalPrice = 0;
    discount = 0;
    couponCodeInput.value = '';
    updatePrice();
});


