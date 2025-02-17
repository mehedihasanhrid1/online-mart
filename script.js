const copyDiscountCoupon = document.getElementById('discount-coupon');
copyDiscountCoupon.addEventListener('click', function() {
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
  }, 900);
});