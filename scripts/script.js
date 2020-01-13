
    if (window.location.pathname == "/cart") {
        let x = document.getElementById("bg-overlay");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    function request_server() {
        const url = window.location.origin + "/cart/allitem";
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let data = myJson;
                //let totalCheckoutSpan = document.getElementById("totalCheckoutAmount");
                document.getElementById("item_counter").innerHTML = data.item_counter;
                let totalCheckoutPrice = 0;
                data.cartItems.forEach(function(element) {
                    totalCheckoutPrice = totalCheckoutPrice + element.total_price;
                });
                document.getElementById("totalCheckoutAmount").innerHTML = "Rs. "+totalCheckoutPrice;
            });
    }
    
    function updateCart(item_counter, cartItems) {
        document.getElementsByClassName("cart-count")[0].innerHTML = item_counter;
        if (window.location.pathname == "/product") {
            window.location.href = "/cart";
        }
        updateCheckoutAmount();
    }
    
    function updateCheckoutAmount() {
        let checkoutAccumulation = document.getElementsByClassName("total");
        //let totalCheckoutSpan = document.getElementById("totalCheckoutAmount");
        let totalCheckoutPrice = 0;
        for (let i = 0; i < checkoutAccumulation.length; i++) {
            totalCheckoutPrice = totalCheckoutPrice + parseInt(checkoutAccumulation[i].innerHTML);
        }
        document.getElementById("totalCheckoutAmount").innerHTML = "Rs. "+totalCheckoutPrice;
    }
    
    if (window.location.pathname === "/cart") {
        request_server();
        updateCheckoutAmount();
    }
    
    
    function buy(id, operation) {  
        const url = window.location.origin + "/cart/"+id+"/"+operation;
        fetch(url).then(function(response) {
            if(response.status === 200) {
                return response.json();
            }
        }).then((myJson) => {
            console.log("myJson--",myJson);
            updateCart(myJson.item_counter, myJson.cartItems);
        }); 
 

    }
    
    function addRemoveItem(id, index, price, task) {
        let input = document.getElementById("prod" + index);
        let totalCost;
        if (task == 'minus') {
            if (input.value > 0) {
                input.value = input.value - 1;
                totalCost = input.value * price;
                document.getElementById("totalp" + index).innerHTML = "Rs."+totalCost;
                buy(id, 'remove');
                request_server();
            } else { }
        } else if (task == 'plus') {
            input.value++;
            totalCost = input.value * price;
            document.getElementById("totalp" + index).innerHTML = "Rs."+totalCost;
            buy(id, 'add');
            request_server();
        } else { }
    }
    let slideIndex = 1;
    if (window.location.pathname == "/") {
        showSlides(slideIndex);
    }
    
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    
    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }
    
    let carousal = document.getElementById("next");
    setInterval(function() {
        if(carousal){
            carousal.click();
        }
    }, 5000); 

/*hamburger menu*/
    function showMobileMenu() {
      var x = document.getElementById("menuLinks");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    }

    function exploreCategory(category_id) {
        window.location.href = "/products/"+category_id;
    }

    //const closeCart = () => {
    function closeCart() {
         window.history.back();
    }

//function myFunction() {
//    var x = document.getElementById("Demo");
//    if (x.className.indexOf("display-block") == -1) {
//        x.className += "display-block";
//    } else { 
//        x.className = x.className.replace("display-block", "");
//    }
//}


function navigateToHome(){
    window.location.href = "/";
}
function navigateToProducts(){
    window.location.href = "/products";
}