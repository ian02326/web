//漢堡選單內容
const hamburger = document.querySelector(".hamburger"); //索引
const sitesetLinks = document.querySelector(".siteset");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  sitesetLinks.classList.toggle("active"); //切換
})
sitesetLinks.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  sitesetLinks.classList.toggle("active");
})
//購物車內容
const shop = document.querySelector("#cart");
const shoppinglist = document.querySelector(".shoppinglist");
shop.addEventListener("click", () => {
  shop.classList.toggle("active");
  shoppinglist.classList.toggle("active");
})
//喜歡的商品
const follow = document.querySelector("#follow");
const followlist = document.querySelector(".followlist");
follow.addEventListener("click", () => {
  follow.classList.toggle("active");
  followlist.classList.toggle("active");
})


//商品清單
var product_list_template = "<div class='item'><img class='pic-prod' alt=''src='{{prod-img}}'/><h3 class='name'>{{name}}</h3><h4 class='price'>{{price}}</h4><div class='btn-list'><div data-pdid='{{id}}' class='add-cart'><i class='fas fa-shopping-cart'></i></div><div data-fpdid='{{fpdid}}' class='add-follow'><i class='far fa-heart'></i></div></div></div>";
//購物車清單
var cart_list_template = "<li class='shop-item'><img class='pic-prod' alt=''src='{{prod-img}}'/>{{name}} <input data-list='{{listid}}' data-prod='{{prodtag}}' type='number' min='1' value='{{quantity}}'/><div class='price'>NT$ {{price}}</div><div data-delid='{{delid}}' data-prodid='{{prodid}}' class='btn-del'> <i class='fas fa-times'></i></div></li>";
//購物車總計
var cart_total_template = "<li class='summary'><div class='detailColor'>訂單摘要</div><div class='sum'><p>商品總計</p><span class='price'>{{total}}</span><p>營利30%會捐給綠色組織！</p><div class='divider'></div><p>結帳總金額</p><button class='btn-blue'>前往結帳</button></div></li>";
//愛心清單
var follow_list_template = "<li class='follow-item'><img class='pic-prod' alt=''src='{{prod-img}}'/>{{name}}<div class='price'>NT$ {{price}}</div><div data-delid='{{delid}}' data-pdid='{{pdid}}' class='btn-del'> <i class='fas fa-times'></i></div></li>";

//Data Setting
var products = [
  { name: "高腰牛仔短褲", price: 865, src: "https://tw.906studio.kr/web/product/big/202106/48428bb00743bc5ed42b869240bf7048.jpg", cart: false, follow: false },
  { name: "綁帶A字長裙", price: 840, src: "https://tw.906studio.kr/web/product/big/202105/fc9aee31a0c05b6ef536216c8566cd69.jpg", cart: false, follow: false },
  { name: "短版針織外套", price: 599, src: "https://tw.906studio.kr/web/product/big/202106/1cd6fbcde8a5b8df1984c992ef86e73b.jpg", cart: false, follow: false },
  { name: "風衣長洋裝", price: 2205, src: "https://tw.906studio.kr/web/product/big/202105/6c5e6c93b6342932d639143da1fb1652.jpg", cart: false, follow: false },
  { name: "藤編肩背包", price: 910, src: "https://tw.906studio.kr/web/product/big/202105/1a2172862f30c8ae2e31d31d12a996c1.jpg", cart: false, follow: false },
  { name: "翻蓋長方肩背包", price: 840, src: "https://tw.906studio.kr/web/product/big/202105/305fe0bae774dc1a44088d858f723f3f.jpg", cart: false, follow: false }
];

var cart_list = [];
var cart_item_number = 0;
var follow_list = [];

//Show Product
for (var i = 0; i < products.length; i++) {
  var current_prod_html =
    product_list_template
      .replace("{{prod-img}}", products[i].src)
      .replace("{{name}}", products[i].name)
      .replace("{{price}}", products[i].price)
      .replace("{{id}}", i)
      .replace("{{fpdid}}", i);
  $(".item-list").append(current_prod_html);
}

var intervalFunc;
var count = 0;
//Cart number scale animation
function scaleSize() {
  intervalFunc =
    setInterval(function () {
      count++;
      if (count < 50) {
        $(".num-cart").css("transform", "scale(1.5)");
      } else {
        $(".num-cart").css("transform", "scale(1)");
      }
      if (count > 100) {
        stopInterval();
      }
    }, 10);
}

//Stop interval
function stopInterval() {
  clearInterval(intervalFunc);
  count = 0;
}
//Get product into cart
$(".add-cart").click(function () {
  var select_prod = $(this).attr("data-pdid");

  if (!products[select_prod].cart) {
    cart_item_number++;
    scaleSize();
    products[select_prod].cart = !products[select_prod].cart;
    cart_list.push({
      name: products[select_prod].name,
      price: products[select_prod].price,
      prodid: select_prod,
      quantity: 1
    });
    $(".num-cart").text(cart_item_number);
    $($(this)).addClass("cart-full");
  }
  showCart();
});

function showCart() {
  $("#cartlist").html("");
  var total_price = 0;
  for (var i = 0; i < cart_list.length; i++) {
    var current_cart_item = cart_list[i];
    total_price += parseInt(current_cart_item.price);
    var current_cart_list =
      cart_list_template
        .replace("{{prod-img}}", products[i].src)
        .replace("{{prodid}}", cart_list[i].prodid)
        .replace("{{prodtag}}", cart_list[i].prodid)
        .replace("{{name}}", cart_list[i].name)
        .replace("{{price}}", cart_list[i].price)
        .replace("{{delid}}", i)
        .replace("{{listid}}", i)
        .replace("{{quantity}}", cart_list[i].quantity);
    $("#cartlist").append(current_cart_list);
  }
  document.getElementById("total").textContent = total_price;
  document.getElementById("sum").textContent = total_price + 60;
  document.getElementById("donate").textContent = Math.round(total_price * 0.3);



  // Call remove function
  $(".btn-del").click(function () {
    var relate_prod = products[parseInt($(this).attr("data-prodid"))];
    removeItem(parseInt($(this).attr("data-delid")));
    $(".add-cart[data-pdid='" + parseInt($(this).attr("data-prodid")) + "']").removeClass("cart-full");
    relate_prod.cart = false;
  });

  // Detect quantity value change
  $(".shop-item input").change(function () {
    var prodid = $(this).attr("data-prod");
    var listid = $(this).attr("data-list");
    var quan = $(this).val();
    cart_list[listid].quantity = quan;
    itemTotal(prodid, listid, quan);
  });

}

showCart();

//Delete item
function removeItem(delid) {
  cart_list.splice(delid, 1);
  cart_item_number--;
  $(".num-cart").text(cart_item_number);
  showCart();
}

//Change item total
function itemTotal(prod, list, quan) {
  cart_list[list].price = parseInt(products[prod].price) * quan;
  showCart();
}

//Show follow list
function showFollow() {
  $("#waitlist").html("");
  if (follow_list.length == 0) {
    $("#waitlist").html("<li class='follow-item'>尚無收藏項目</li>");
  } else {
    for (var i = 0; i < follow_list.length; i++) {
      var current_follow_item = follow_list[i];
      var current_follow_list =
        follow_list_template
          .replace("{{prod-img}}", products[i].src)
          .replace("{{pdid}}", follow_list[i].pdid)
          .replace("{{name}}", follow_list[i].name)
          .replace("{{price}}", follow_list[i].price)
          .replace("{{delid}}", i)
      $("#waitlist").append(current_follow_list);
    }
  }
  // Call remove function
  $(".btn-fdel").click(function () {
    var relate_prod = products[parseInt($(this).attr("data-pdid"))];
    removeFollow(parseInt($(this).attr("data-delid")));
    $(".add-follow[data-fpdid='" + parseInt($(this).attr("data-pdid")) + "']").removeClass("followed");
    $(".add-follow[data-fpdid='" + parseInt($(this).attr("data-pdid")) + "']").html("<i class='far fa-heart'></i>");
    relate_prod.follow = false;
  });
}

//Add follow list
$(".add-follow").click(function () {
  var f_current_id = $(this).attr("data-fpdid");
  var f_current_item = products[f_current_id];
  if (!products[f_current_id].follow) {
    products[f_current_id].follow = !products[f_current_id].follow;
    follow_list.push({
      name: f_current_item.name,
      price: f_current_item.price,
      pdid: f_current_id
    });
    $(this).addClass("followed");
    $(this).html("<i class='fas fa-heart'></i>");
  }
  showFollow();
});

//Delete follow item
function removeFollow(delid) {
  follow_list.splice(delid, 1);
  showFollow();
}


// 上架預覽
document.getElementById('readUrl').addEventListener('change', function () {
  if (this.files[0]) {
    var picture = new FileReader();
    picture.readAsDataURL(this.files[0]);
    picture.addEventListener('load', function (event) {
      document.getElementById('uploadedImage').setAttribute('src', event.target.result);
      document.getElementById('uploadedImage').style.display = 'block';
    });
  }
})