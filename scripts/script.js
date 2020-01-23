	document.getElementsByTagName("body")[0].addEventListener("keydown", function(e){
		 if (event.keyCode === 9) {
             if (event.target['id'] === 'checkout') {
                event.preventDefault();
                document.getElementById('close').focus();
             }
             if (event.target['id'] === 'shopping') {
                event.preventDefault();
                document.getElementById('close').focus();
             }
		 }
	})
    
    const request_server = () => {
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
    
    const updateCart = (item_counter, cartItems, removedId) => {
        document.getElementsByClassName("cart-count")[0].innerHTML = item_counter;
        if(removedId){
            document.getElementById(removedId).style.display = "none";   
        }
        if (window.location.pathname == "/product") {
            window.location.href = "/cart";
        }
        updateCheckoutAmount();
    }
    
    const updateCheckoutAmount = () => {
        let checkoutAccumulation = document.getElementsByClassName("total");
    
        let totalCheckoutPrice = 0;
        for (let i = 0; i < checkoutAccumulation.length; i++) {
            totalCheckoutPrice = totalCheckoutPrice + parseInt(checkoutAccumulation[i].innerHTML);
        }
        if(document.getElementById("totalCheckoutAmount")){
            document.getElementById("totalCheckoutAmount").innerHTML = "Rs. "+totalCheckoutPrice;
        }
    }
    
    if (window.location.pathname === "/cart") {
        request_server();
        //updateCart();
        updateCheckoutAmount();
    }
    
    const buy = (id, operation) => { 
        const url = window.location.origin + "/cart/"+id+"/"+operation;
        fetch(url).then(function(response) {
            if(response.status === 200) {
                return response.json();
            }
        }).then((myJson) => {
            updateCart(myJson.item_counter, myJson.cartItems, myJson.productId);
        }); 

    }
    
    const addRemoveItem = (id, index, price, task) => { 
        let input = document.getElementById("prod" + index);
        let totalCost;
        if (task == 'minus') {
            if (input.value > 0) {
                input.value = input.value - 1;
                totalCost = input.value * price;
                document.getElementById("totalp" + index).innerHTML = "Rs."+totalCost;
                buy(id, 'remove');
                updateCart();
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
        let dots = document.getElementsByClassName("indexing__dot");
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
    const showMobileMenu = () => { 
      var x = document.getElementById("menuLinks");
      if (x.style.display === "block") {
        //x.style.display = "none";
        setTimeout(function(){
            x.style.display = "none";
        }, 300);
      } else {
        //x.style.display = "block";
            setTimeout(function(){
                x.style.display = "block";
            }, 300);
      }
    }
    const exploreCategory = (category_id) => { 
        window.location.href = "/products/"+category_id;
    }

    const closeCart = () => {
        window.location.href = "/products";
    }

    const navigateToHome = () => { 
        window.location.href = "/";
    }
    const navigateToProducts = () => { 
        window.location.href = "/products";
    }
    const isMobile = () => {
        var check = false;
        (function(a){
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) 
              check = true;
          })(navigator.userAgent||navigator.vendor||window.opera);
          return check;
    };
    function isMobileTablet(){
        var check = false;
        (function(a){
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) 
                check = true;
        })(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }

    if (window.location.pathname == "/cart") {
        let x = document.getElementById("bg-overlay");
        const smallDevice = isMobile();
        if(smallDevice || isMobileTablet()) {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }