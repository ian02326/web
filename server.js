var express = require("express");
var bodyParser = require("body-parser");

server = express();
var fs = require("fs");

server.use(express.static("OBJ"));//要跑在伺服器上的首頁母資料夾

server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

var DB = require("nedb-promises"); //定義資料庫
var tipDB = DB.create("tip.db");
// tipDB.insert([
//     {
//         id: "tip2",
//         marquee: "ARCTIC FOX ARCTIC FOX ARCTIC FOX ARCTIC FOX ARCTIC FOX ARCTIC FOX ARCTIC FOX ARCTIC FOX ARCTIC FOX",
//         imgsrc: "image/tips/tips_2.png",
//         title: "北極狐",
//         sub: "ARCTIC FOX",
//         desc: "冰島唯一的陸地哺乳動物，壽命3 ~ 6年，<br>北極狐的主食是旅鼠，但也會吃魚、鳥、蛋及貝類等等…。<br>牠的毛色會隨著季節與所處環境而換裝，在冬天時穿上純白的毛皮，<br>春夏時會逐漸轉變為青灰色。",
//         slogan: "譽有「雪中精靈」美稱，旅鼠們的大天敵!<br>　　百變毛色不僅能禦寒，春夏秋冬不盡相同?",
//         stips: "北極狐聞到在旅鼠窩的氣味或聽到旅鼠窩裡旅鼠的尖叫聲時，牠會迅速地挖掘位於雪下面的旅鼠窩。<br>當扒得差不多時，北極狐跳水運動員高高跳起將旅鼠窩壓塌，然後將窩裡的旅鼠一網打盡。"
//     },
//     {
//         id: "tip3",
//         marquee: "LEMMINGS LEMMINGS LEMMINGS LEMMINGS LEMMINGS LEMMINGS LEMMINGS LEMMINGS LEMMINGS",
//         imgsrc: "image/tips/tips_3.png",
//         title: "旅鼠",
//         sub: "LEMMINGS",
//         desc: "是北極圈繁殖速度最快的生物，壽命不超過一年。旅鼠一年能生7－8次，<br>每次可生12隻小旅鼠；族群數量一年內可增加十倍以上，且不冬眠，<br>終年可生殖。旅鼠的食物是草根、草莖和苔蘚。",
//         slogan: "繁殖怪獸 ? ! 北極圈最強生育機器<br>　　為何旅鼠大軍總是上演跳樓戲碼 ?",
//         stips: "旅鼠數量據增時，會進行一次大遷移。當他們看到一片海，<br>誤以為只是小河或湖泊，便跳了進去，卻一去不復返。"
//     },
//     {
//         id: "tip4",
//         marquee: "MUSK OX MUSK OX MUSK OX MUSK OX MUSK OX MUSK OX MUSK OX MUSK OX MUSK OX MUSK OX",
//         imgsrc: "image/tips/tips_4.png",
//         title: "麝牛",
//         sub: "MUSK OX",
//         desc: "別名麝香牛，壽命為12 ~ 20 年，<br>麝牛因雄麝牛在發情時會散發出一種類似麝香的氣味，故得名。<br>是羚牛的近親，儘管像牛，但是許多方面都更像羊。<br>主食為草、地衣、苔蘚和其他木本植物，只要有草和苔原就不會餓肚子",
//         slogan: "麝牛是一種介於牛和羊之間的動物<br>　　可以說是一種超大型的野羊 !",
//         stips: "麝牛勇敢而團結，在任何情況下都不會逃跑。當狼和熊等敵害出現時，一群麝牛會立即展開防禦陣形，<br>成年公牛站在最前面，把幼牛圍在中間。公牛會出其不意地發動進攻，用尖角襲擊對方。"
//     },
//     {
//         id: "tip5",
//         marquee: "SEAL SEAL SEAL SEAL SEAL SEAL SEAL SEAL SEAL SEAL SEAL SEAL SEAL SEAL SEAL SEAL",
//         imgsrc: "image/tips/tips_5.png",
//         title: "海豹",
//         sub: "SEAL",
//         desc: "海豹集中於兩極地區，多數時間在海洋裡活動。<br>雌海豹的壽命為30～35歲，而雄海豹則只為20～25歲。<br>雄性海豹需爭奪地盤及交配權，因此雄性海豹平均壽命<br>會比雌性海豹還要來的短。主食為磷蝦、魚類和魷魚。",
//         slogan: "全球海豹多達12種，可愛的模樣深受大眾喜愛。<br>　　出生時長著絨毛，長大才會換上適合游泳的剛毛。",
//         stips: "海豹在水裡可以拍手，但是在陸地上拍不到手，所以他只能拍自己的身體。<br>拍手是因為要吸引異性的注意。"
//     },
//     {
//         id: "tip6",
//         marquee: "NARWHALL NARWHALL NARWHALL NARWHALL NARWHALL NARWHALL NARWHALL NARWHALL NARWHALL",
//         imgsrc: "image/tips/tips_6.png",
//         title: "獨角鯨",
//         sub: "NARWHALL",
//         desc: "因為牠頭上有一根螺旋狀的犄角，也稱一角鯨。壽命25～50年。<br>在中世紀以前，因為價值非凡，被視為獻給皇帝或女皇的珍稀寶物。<br>主食為遠洋魚類（特別是鱈魚）、魷魚、蝦、<br>以及底棲生物如格陵蘭大比目魚。",
//         slogan: "一角鯨的「犄角」其實是特化的左側尖牙。<br>　　潛水時間可達20分鐘，深處超過1,000公尺。",
//         stips: "雄鯨靠著犄角來吸引大多數沒有獨角的雌鯨注意，爭取交配生子的機會。<br>牠的犄角就像雷達一樣，具有感測能力，可以接收海裡鹽度、溫度和壓力，再把訊息傳達至大腦。"
//     },
//     {
//         id: "tip7",
//         marquee: "SNOWY OWL SNOWY OWL SNOWY OWL SNOWY OWL SNOWY OWL SNOWY OWL SNOWY OWL SNOWY OWL SNOWY OWL SNOWY OWL",
//         imgsrc: "image/tips/tips_7.png",
//         title: "雪鴞",
//         sub: "SNOWY OWL",
//         desc: "是唯一不遷徙的鳥類，與大多數貓頭鷹不同，<br>牠是習慣白天行動的乖寶寶，頂多在黃昏後打打獵。<br>喜歡在視野良好的枝頭高處棲息，並憑藉聽覺來打獵覓食。",
//         slogan: "牠的眼球不能動，但頭可以旋轉到 270 度 !<br>　　有雙千里眼與順風耳，可以觀察到極遠的小物體。",
//         stips: "《 哈利波特 》當中的信使其實就是雪鴞喔！"
//     },
//     {
//         id: "tip8",
//         marquee: "ARCTIC PUFFIN ARCTIC PUFFIN ARCTIC PUFFIN ARCTIC PUFFIN ARCTIC PUFFIN ARCTIC PUFFIN ARCTIC PUFFIN ARCTIC PUFFIN ARCTIC PUFFIN",
//         imgsrc: "image/tips/tips_8.png",
//         title: "北極海鸚",
//         sub: "ARCTIC PUFFIN",
//         desc: "喜歡集體活動，以捕獵魚類為食。平均壽命30年。<br>因為翅膀太短導致牠飛行需要助跑，才能比較順利的起飛，<br>著陸必須撞擊水面減速，才能落在水面上。",
//         slogan: "近年因為地球暖化、人為捕獵等因素而瀕臨絕種。<br>　　但現在已有專門的保護機構，目前已穩定下來。",
//         stips: "因為顏色和企鵝十分相似，鳥嘴上的橘紅色非常醒目，也因此牠們被稱做「海上小丑」。"
//     },
//     {
//         id: "tip9",
//         marquee: "FERRETS FERRETS FERRETS FERRETS FERRETS FERRETS FERRETS FERRETS FERRETS FERRETS FERRETS FERRETS FERRETS",
//         imgsrc: "image/tips/tips_9.png",
//         title: "獨角鯨",
//         sub: "FERRETS",
//         desc: "天性喜愛冒險，總是四處亂竄，壽命5 – 10 年。<br>馴化已有千年的歷史，漸漸被馴養為寵物的寵物貂已經不適合野外生活。<br>家養雪貂通常作為寵物餵養，或被用來驅趕洞穴中的老鼠和兔子。<br>雪貂常常讓人誤是全白色，其實純白色野生雪貂極為罕見。",
//         slogan: "在倫敦等地有利用雪貂來鋪設電線及電纜。<br>　　紐西蘭甚至有矇眼貂註冊為電工助手。",
//         stips: "比貓還愛搗蛋，比狗的好奇心還要旺盛，極具破壞性，<br>他們喜愛偷偷跑到別人家偷牠們的家禽，北極圈的屁孩^^"
//     }
// ])

// server.get("/service", function (req, res) {

//     Services = [
//         { icon: "fa-shopping-cart", title: "E-Commerce", desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur porro laborum fuga repellat necessitatibus corporis nulla, in ex velit recusandae obcaecati maiores, doloremque quisquam similique, tempora aspernatur eligendi delectus! Rem." },
//         { icon: "fa-laptop", title: "Responsive Design", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime qua architecto quo inventore harum ex magni, dicta impedit." },
//         { icon: "fa-lock", title: "Web Security", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit." }
//     ]
//     res.send(Services);
// })

// server.get("/portfolio", function (req, res) {

//     portfolios = [
//         { href: "#portfolioModal1", imgSrc: "img/portfolio/roundicons.png", title: "Round Icons", text: "Graphic Design" },
//         { href: "#portfolioModal2", imgSrc: "img/portfolio/startup-framework.png", title: "Startup Framework", text: "Website Design" },
//         { href: "#portfolioModal3", imgSrc: "img/portfolio/treehouse.png", title: "Treehouse", text: "Website Design" },
//         { href: "#portfolioModal1", imgSrc: "img/portfolio/roundicons.png", title: "Round Icons", text: "Graphic Design" },
//         { href: "#portfolioModal2", imgSrc: "img/portfolio/startup-framework.png", title: "Startup Framework", text: "Website Design" },
//         { href: "#portfolioModal3", imgSrc: "img/portfolio/treehouse.png", title: "Treehouse", text: "Website Design" }
//     ]
//     res.send(portfolios);
// })

server.get("/tip", function (req, res) {
    tipDB.find({}).then(results => {
        if (results != null) {
            res.send(results);
        } else {
            res.send("Error!");
        }
    })
})

// server.get("", function (req, res) {
//     res.send("");
//     res.redirect("/index Vue.html"); //找檔案時只需要找index.html
// });

// server.post("", function (req, res) {
//     console.log(req.body);
//     ContactDB.insert(req.body);  //加入資料庫
//     res.send();
//     // res.redirect("/index Vue.html");  //找檔案時只需要找index.html
// })

server.listen(8080, function () {
    console.log("Server is running at port 8080!")
})