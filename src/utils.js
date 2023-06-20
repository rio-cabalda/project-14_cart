export const getTotal = (cart) => {
    let totalAmount = 0;
    let totalCost = 0;
    for (let {amount, price} of cart.values()){
        totalAmount += parseFloat(amount); //+= will get the totalAmount then add the amount then update the totalAmount
        totalCost += amount * price; // when many decimal will show, use in the CartItem.jsx the value.toFixed(2) showing 2 decimal places.
    }

    return {totalAmount, totalCost};
}