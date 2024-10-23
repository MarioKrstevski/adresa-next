"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomPropertyImagesCollection = exports.randomSkopjeCoordinates = exports.orientationOptions = exports.locationPrecisionOptions = exports.districts = exports.populatedPlaces = exports.manucipalities = exports.listingTypeOptions = exports.listingCategoryOptions = exports.listingTransactionTypeOptions = exports.UserRoles = void 0;
exports.UserRoles = {
    USER: "USER",
    ADMIN: "ADMIN",
    SUPER_ADMIN: "SUPER_ADMIN",
    AGENCY: "AGENCY",
    SUPPORT: "SUPPORT",
};
exports.listingTransactionTypeOptions = ["sale", "rent"];
exports.listingCategoryOptions = [
    "residential",
    "commercial",
    "land",
    "other",
];
exports.listingTypeOptions = {
    residential: ["apartment", "house", "vacation house", "other"],
    commercial: [
        "office",
        "store",
        "warehouse",
        "industrial space",
        "other",
    ],
    land: ["construction", "agricultural", "other"],
    other: [
        "garage",
        "business",
        "assembly facilities", // montazni objekti
        "other",
    ],
};
// ------------------------------------------------------------
// opstini vo Makedonija
var manucipalitiesMkd = [
    "Аеродром",
    "Арачиново",
    "Берово",
    "Битола",
    "Богданци",
    "Боговиње",
    "Босилово",
    "Брвеница",
    "Бутел",
    "Валандово",
    "Василево",
    "Вевчани",
    "Велес",
    "Виница",
    "Врапчиште",
    "Гази Баба",
    "Гевгелија",
    "Ѓорче Петров",
    "Гостивар",
    "Градско",
    "Дебар",
    "Дебарца",
    "Делчево",
    "Демир Капија",
    "Демир Хисар",
    "Дојране",
    "Долнени",
    "Желино",
    "Зелениково",
    "Зрновци",
    "Илинден",
    "Јегуновце",
    "Кавадарци",
    "Карбинци",
    "Карпош",
    "Кисела Вода",
    "Кичево",
    "Конче",
    "Кочани",
    "Кратово",
    "Крива Паланка",
    "Кривогаштани",
    "Крушево",
    "Куманово",
    "Липково",
    "Лозово",
    "Маврово и Ростуша",
    "Македонска Каменица",
    "Македонски Брод",
    "Могила",
    "Неготино",
    "Новаци",
    "Ново Село",
    "Охрид",
    "Петровец",
    "Пехчево",
    "Пласница",
    "Прилеп",
    "Пробиштип",
    "Радовиш",
    "Ранковце",
    "Ресен",
    "Росоман",
    "Сарај",
    "Свети Николе",
    "Скопје",
    "Сопиште",
    "Старо Нагоричане",
    "Струга",
    "Струмица",
    "Студеничани",
    "Теарце",
    "Тетово",
    "Центар Жупа",
    "Чаир",
    "Чашка",
    "Чешиново",
    "Чучер Сандево",
    "Штип",
    "Центар",
    "Шуто Оризари",
];
exports.manucipalities = [
    "Berovo",
    "Bitola",
    "Bogdanci",
    "Bogovinje",
    "Bosilovo",
    "Brvenica",
    "Debar",
    "Debarca",
    "Demir Hisar",
    "Demir Kapija",
    "Dolneni",
    "Gevgelija",
    "Gostivar",
    "Grad Skopje",
    "Gradsko",
    "Ilinden",
    "Jegunovce",
    "Karbinci",
    "Kavadarci",
    "Kratovo",
    "Kriva Palanka",
    "Kumanovo",
    "Lozovo",
    "Makedonska Kamenica",
    "Makedonski Brod",
    "Mogila",
    "Negotino",
    "Novaci",
    "Novo Selo",
    "Ohrid",
    "Arachinovo",
    "Centar Zhupa",
    "Delchevo",
    "Dojran",
    "Kichevo",
    "Konche",
    "Kochani",
    "Krivogashtani",
    "Krushevo",
    "Lipkovo",
    "Mavrovo and Rostuša",
    "Pehchevo",
    "Probishtip",
    "Radovish",
    "Rankovce",
    "Opština Sopište",
    "Staro Nagorichane",
    "Studenichani",
    "Vevchani",
    "Vrapchishte",
    "Chashka",
    "Chucher Sandevo",
    "Shtip",
    "Zhelino",
    "Petrovec",
    "Plasnica",
    "Prilep",
    "Resen",
    "Rosoman",
    "Struga",
    "Strumica",
    "Sveti Nikole",
    "Tearce",
    "Tetovo",
    "Valandovo",
    "Vasilevo",
    "Veles",
    "Vinica",
    "Zelenikovo",
    "Zrnovci",
    "Češinovo-Obleševo",
];
// export const manucipalities = [
//   { label: "Kumanovo", value: "kumanovo" },
//   { label: "Skopje", value: "skopje" },
// ];
exports.populatedPlaces = ["Ajducka Cesma", "Tabanovce"];
exports.districts = ["Oktomvriska", "Dragomance"];
// ------------------------------------------------------------
// ------------------------------------------------------------
exports.locationPrecisionOptions = [
    "exact",
    "approximate",
    "wide",
];
exports.orientationOptions = [
    { label: "North", value: "north" },
    { label: "South", value: "south" },
    { label: "East", value: "east" },
    { label: "West", value: "west" },
    { label: "North East", value: "north-east" },
    { label: "North West", value: "north-west" },
    { label: "South East", value: "south-east" },
    { label: "South West", value: "south-west" },
];
exports.randomSkopjeCoordinates = [
    { lng: 21.432767, lat: 41.998129 },
    { lng: 21.42993, lat: 41.997674 },
    { lng: 21.435642, lat: 41.995537 },
    { lng: 21.439128, lat: 41.999824 },
    { lng: 21.440912, lat: 42.000245 },
    { lng: 21.446041, lat: 42.003854 },
    { lng: 21.442382, lat: 41.996148 },
    { lng: 21.447658, lat: 42.004211 },
    { lng: 21.451, lat: 42.001091 },
    { lng: 21.450118, lat: 41.998357 },
    { lng: 21.454189, lat: 42.001526 },
    { lng: 21.455627, lat: 41.999063 },
    { lng: 21.457192, lat: 42.003344 },
    { lng: 21.45886, lat: 42.002105 },
    { lng: 21.451975, lat: 42.004785 },
    { lng: 21.446798, lat: 41.995828 },
    { lng: 21.442011, lat: 41.999146 },
    { lng: 21.444968, lat: 42.000902 },
    { lng: 21.441582, lat: 41.996726 },
    { lng: 21.438715, lat: 42.003 },
    { lng: 21.436526, lat: 41.995283 },
    { lng: 21.441004, lat: 42.002758 },
    { lng: 21.448527, lat: 41.997513 },
    { lng: 21.444618, lat: 41.999605 },
    { lng: 21.452762, lat: 42.003662 },
    { lng: 21.447031, lat: 41.998712 },
    { lng: 21.450884, lat: 42.000623 },
    { lng: 21.455113, lat: 41.99899 },
    { lng: 21.448992, lat: 42.002219 },
    { lng: 21.442787, lat: 41.997235 },
    { lng: 21.436999, lat: 41.999357 },
    { lng: 21.451331, lat: 42.001788 },
    { lng: 21.437542, lat: 41.996912 },
    { lng: 21.443329, lat: 42.000543 },
    { lng: 21.444041, lat: 42.004911 },
    { lng: 21.445776, lat: 41.99914 },
    { lng: 21.437098, lat: 42.002504 },
    { lng: 21.449561, lat: 42.001387 },
    { lng: 21.440985, lat: 42.003472 },
    { lng: 21.450331, lat: 41.996925 },
    { lng: 21.45377, lat: 42.004134 },
    { lng: 21.4482, lat: 41.996811 },
    { lng: 21.45201, lat: 41.997962 },
    { lng: 21.440343, lat: 42.002762 },
    { lng: 21.455872, lat: 41.99638 },
    { lng: 21.448886, lat: 41.999311 },
    { lng: 21.450762, lat: 42.00329 },
    { lng: 21.44709, lat: 42.001563 },
    { lng: 21.441715, lat: 41.997711 },
];
exports.randomPropertyImagesCollection = [
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241006/l/stan-na-samom-keju-preko-puta-tvrdjave-5425644857183-71809625839.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241006/l/stan-na-samom-keju-preko-puta-tvrdjave-5425644857183-71809625825.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241006/l/stan-na-samom-keju-preko-puta-tvrdjave-5425644857183-71809625827.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241006/l/stan-na-samom-keju-preko-puta-tvrdjave-5425644857183-71809625828.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241006/l/stan-na-samom-keju-preko-puta-tvrdjave-5425644857183-71809625829.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241006/l/stan-na-samom-keju-preko-puta-tvrdjave-5425644857183-71809625830.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241006/l/stan-na-samom-keju-preko-puta-tvrdjave-5425644857183-71809625831.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241006/l/stan-na-samom-keju-preko-puta-tvrdjave-5425644857183-71809625833.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241006/l/stan-na-samom-keju-preko-puta-tvrdjave-5425644857183-71809625834.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241006/l/stan-na-samom-keju-preko-puta-tvrdjave-5425644857183-71809625835.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241006/l/stan-na-samom-keju-preko-puta-tvrdjave-5425644857183-71809625836.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241006/l/stan-na-samom-keju-preko-puta-tvrdjave-5425644857183-71809625837.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/240922/l/exkluzivan-generalski-stan-u-strogom-centru-5425644816917-71809485055.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/240922/l/exkluzivan-generalski-stan-u-strogom-centru-5425644816917-71809485056.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/240922/l/exkluzivan-generalski-stan-u-strogom-centru-5425644816917-71809486873.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/240922/l/exkluzivan-generalski-stan-u-strogom-centru-5425644816917-71809485051.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485965.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485966.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485968.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485970.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/240419/l/elitna-novogradnja-kod-crkve-svete-petke-5425643937711-71807961884.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485954.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485967.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485969.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485955.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485956.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485957.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485958.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485959.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485960.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485961.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485962.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485963.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485964.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/231201/l/elitna-novogradnja-kompleks-modna-5425643937711-71806485965.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241004/l/fenomenalan-dvoiposoban-stan-mokranjceva-77-5425644852975-71809614432.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241004/l/fenomenalan-dvoiposoban-stan-mokranjceva-77-5425644852975-71809614433.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241004/l/fenomenalan-dvoiposoban-stan-mokranjceva-77-5425644852975-71809614434.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241004/l/fenomenalan-dvoiposoban-stan-mokranjceva-77-5425644852975-71809614435.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241004/l/fenomenalan-dvoiposoban-stan-mokranjceva-77-5425644852975-71809614418.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241004/l/fenomenalan-dvoiposoban-stan-mokranjceva-77-5425644852975-71809614419.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241004/l/fenomenalan-dvoiposoban-stan-mokranjceva-77-5425644852975-71809614420.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241004/l/fenomenalan-dvoiposoban-stan-mokranjceva-77-5425644852975-71809614421.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241004/l/fenomenalan-dvoiposoban-stan-mokranjceva-77-5425644852975-71809614422.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241004/l/fenomenalan-dvoiposoban-stan-mokranjceva-77-5425644852975-71809614426.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241004/l/fenomenalan-dvoiposoban-stan-mokranjceva-77-5425644852975-71809614427.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241004/l/fenomenalan-dvoiposoban-stan-mokranjceva-77-5425644852975-71809614428.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241004/l/fenomenalan-dvoiposoban-stan-mokranjceva-77-5425644852975-71809614429.jpg",
    "https://img.halooglasi.com/slike/oglasi/Thumbs/241004/l/fenomenalan-dvoiposoban-stan-mokranjceva-77-5425644852975-71809614430.jpg",
];