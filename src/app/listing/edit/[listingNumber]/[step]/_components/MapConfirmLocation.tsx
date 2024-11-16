"use client";
import L, {
  LatLng,
  LatLngExpression,
  Map,
  Marker as MarkerType,
} from "leaflet";
import {
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { randomSkopjeCoordinates } from "@/global/dataa";
import { cn } from "@/lib/utils";
import { PopulatedPlace } from "@/lib/data/macedonia/macedoniaPopulatedPlaces";
import { getPlaceCoordinates } from "@/lib/data/macedonia/importantData";
interface Location {
  lat: number;
  lng: number;
}
interface MapConfirmLocationProps {
  pinLocation: Location | null;
  setPinLocation: (location: Location) => void;
  populatedPlace: PopulatedPlace | null;
  municipality: PopulatedPlace | null;
}
const kumanovoInfo = {
  type: "Feature",
  properties: {
    id: 13671771,
    name: "Куманово",
    "name:en": "Kumanovo",
    "name:eu": null,
    admin_level: "8",
    boundary: "administrative",
    alt_name: null,
    "alt_name:en": null,
    "official_name:en": null,
    old_name: null,
    "old_name:en": null,
    ref: null,
    source: "Cadastre",
    wikipedia: null,
    population: "105000",
    "population:census:2022": null,
  },
  geometry: {
    type: "MultiPolygon",
    coordinates: [
      [
        [
          [21.6686499, 42.1468494],
          [21.6704893, 42.1454599],
          [21.6710901, 42.1448235],
          [21.6722488, 42.1439007],
          [21.6733646, 42.1433279],
          [21.6748238, 42.1428825],
          [21.6751242, 42.1426597],
          [21.6751242, 42.1423415],
          [21.6748667, 42.1420233],
          [21.6746092, 42.1410687],
          [21.674695, 42.1395412],
          [21.6746092, 42.1394776],
          [21.6746092, 42.1387775],
          [21.674695, 42.1387138],
          [21.674695, 42.1378864],
          [21.6748667, 42.1375682],
          [21.6748667, 42.1366135],
          [21.674695, 42.1362316],
          [21.674695, 42.134704],
          [21.6743517, 42.1334947],
          [21.6744375, 42.1319034],
          [21.6743517, 42.1318397],
          [21.6743517, 42.1298665],
          [21.6744375, 42.1295482],
          [21.6741371, 42.1293254],
          [21.6723347, 42.1293254],
          [21.6713905, 42.1291345],
          [21.6709185, 42.1287844],
          [21.6704819, 42.1278584],
          [21.6703831, 42.1277843],
          [21.6704705, 42.1277979],
          [21.6706582, 42.127592],
          [21.6706733, 42.1275226],
          [21.6728497, 42.125697],
          [21.6732788, 42.125697],
          [21.6736221, 42.1258243],
          [21.6765234, 42.1262826],
          [21.6772391, 42.126403],
          [21.6772751, 42.1263875],
          [21.6773952, 42.1263875],
          [21.6774102, 42.126432],
          [21.6778935, 42.1264899],
          [21.6831226, 42.1270865],
          [21.6851758, 42.1270865],
          [21.6857641, 42.1271399],
          [21.6858482, 42.1262316],
          [21.6876372, 42.1261515],
          [21.6876613, 42.1260624],
          [21.6883457, 42.1260268],
          [21.6885618, 42.12657],
          [21.6884657, 42.1268194],
          [21.6886218, 42.1270242],
          [21.6887179, 42.1274516],
          [21.6891261, 42.1278167],
          [21.689006, 42.1274605],
          [21.68885, 42.1271667],
          [21.6886819, 42.1261782],
          [21.6896424, 42.1259377],
          [21.6904052, 42.1256604],
          [21.6927042, 42.1248246],
          [21.6936168, 42.1245307],
          [21.6942051, 42.1254479],
          [21.6960902, 42.1246999],
          [21.694025, 42.1218857],
          [21.6928243, 42.1196146],
          [21.6924641, 42.1188487],
          [21.6920078, 42.1184034],
          [21.6909512, 42.1178334],
          [21.6896544, 42.116533],
          [21.6892342, 42.1158383],
          [21.6919899, 42.1156382],
          [21.6920757, 42.1157018],
          [21.692934, 42.1157018],
          [21.6936207, 42.1159565],
          [21.6942215, 42.1159565],
          [21.6955948, 42.1149378],
          [21.6961098, 42.1146831],
          [21.6976976, 42.1134416],
          [21.6977835, 42.1129322],
          [21.6976118, 42.1126138],
          [21.6973543, 42.1112767],
          [21.6968393, 42.1096212],
          [21.6963243, 42.1086661],
          [21.6968393, 42.1076473],
          [21.6976118, 42.1068194],
          [21.6981268, 42.1064374],
          [21.6988993, 42.1049728],
          [21.6996717, 42.1044633],
          [21.7017317, 42.1007061],
          [21.7021179, 42.1004195],
          [21.7024612, 42.1003559],
          [21.7032337, 42.099719],
          [21.7044353, 42.0996553],
          [21.7047787, 42.099528],
          [21.705122, 42.0992732],
          [21.7057228, 42.0990822],
          [21.7065811, 42.0986364],
          [21.7070103, 42.0982543],
          [21.7072678, 42.0982543],
          [21.7076111, 42.0980632],
          [21.7080402, 42.0979995],
          [21.7088985, 42.0976811],
          [21.7090702, 42.09749],
          [21.7094135, 42.0974263],
          [21.710186, 42.0969805],
          [21.7110443, 42.0967258],
          [21.7122889, 42.0957386],
          [21.7126322, 42.0951654],
          [21.7130594, 42.0948484],
          [21.7131042, 42.0948151],
          [21.71525, 42.0950062],
          [21.7157221, 42.0947196],
          [21.7161512, 42.0937642],
          [21.7170608, 42.0929637],
          [21.7172839, 42.0929497],
          [21.7178396, 42.0929662],
          [21.7186369, 42.092939],
          [21.7195133, 42.0931074],
          [21.7190695, 42.0943374],
          [21.7188978, 42.0954202],
          [21.717782, 42.0979677],
          [21.717782, 42.0993051],
          [21.7182541, 42.0997827],
          [21.7185974, 42.0999101],
          [21.720314, 42.0999101],
          [21.7209148, 42.1000374],
          [21.7212152, 42.1002603],
          [21.7213869, 42.1007061],
          [21.7213869, 42.1010882],
          [21.7213011, 42.1016614],
          [21.7211294, 42.1019798],
          [21.7211294, 42.1034445],
          [21.7215157, 42.103731],
          [21.7227173, 42.103731],
          [21.7231035, 42.1040176],
          [21.7230177, 42.1066284],
          [21.7234468, 42.1080293],
          [21.7236185, 42.1100032],
          [21.722331, 42.1124865],
          [21.7220676, 42.1136263],
          [21.7220395, 42.11407],
          [21.7229193, 42.1141402],
          [21.7239645, 42.1141502],
          [21.7246363, 42.114207],
          [21.7249489, 42.1143011],
          [21.725357, 42.1144458],
          [21.7251676, 42.1145543],
          [21.7248584, 42.1149997],
          [21.7245523, 42.1152357],
          [21.7249485, 42.115592],
          [21.725753, 42.116113],
          [21.7267856, 42.1165272],
          [21.727428, 42.1166964],
          [21.727572, 42.1163446],
          [21.7282204, 42.1155608],
          [21.7286587, 42.1148839],
          [21.7290909, 42.1144163],
          [21.7292891, 42.1142559],
          [21.7305138, 42.1128843],
          [21.7310481, 42.1119089],
          [21.7312342, 42.1114725],
          [21.7315164, 42.1110583],
          [21.7316665, 42.1109781],
          [21.7318886, 42.1107331],
          [21.7321107, 42.1104303],
          [21.7321828, 42.1102922],
          [21.732525, 42.1102343],
          [21.7324709, 42.1105238],
          [21.7333595, 42.1108668],
          [21.7351905, 42.1116862],
          [21.7355748, 42.1118466],
          [21.735959, 42.1119356],
          [21.7362051, 42.1119624],
          [21.7364093, 42.1119668],
          [21.7369652, 42.1121363],
          [21.7379093, 42.112391],
          [21.7386818, 42.112391],
          [21.7397118, 42.1120089],
          [21.7423725, 42.1116906],
          [21.7429304, 42.1120408],
          [21.7436171, 42.1128685],
          [21.7437029, 42.1132505],
          [21.744175, 42.1136007],
          [21.7447758, 42.1137917],
          [21.7455482, 42.1137917],
          [21.7462349, 42.1136644],
          [21.747694, 42.1130277],
          [21.7479944, 42.1128048],
          [21.7491221, 42.1114955],
          [21.7491069, 42.1114656],
          [21.749144, 42.111458],
          [21.7498503, 42.1104137],
          [21.7500011, 42.1104627],
          [21.7507551, 42.1112947],
          [21.7511227, 42.1116164],
          [21.7511227, 42.1118052],
          [21.7514408, 42.1119664],
          [21.7518152, 42.1119785],
          [21.7522777, 42.1118554],
          [21.7524587, 42.1116898],
          [21.7523992, 42.1114359],
          [21.7524847, 42.1113495],
          [21.7545605, 42.1117543],
          [21.7557621, 42.1116906],
          [21.7562342, 42.1121045],
          [21.75632, 42.1125502],
          [21.7570496, 42.112773],
          [21.7576933, 42.1132505],
          [21.757865, 42.1135689],
          [21.7577791, 42.1142056],
          [21.7581654, 42.1144921],
          [21.7587662, 42.1146831],
          [21.7595387, 42.1147468],
          [21.7621136, 42.1157018],
          [21.7638302, 42.1160838],
          [21.7650318, 42.1166569],
          [21.7652893, 42.1166569],
          [21.7655897, 42.116434],
          [21.7656755, 42.1159883],
          [21.765976, 42.1157655],
          [21.7679508, 42.1158249],
          [21.7678635, 42.1163001],
          [21.7685514, 42.116502],
          [21.768508, 42.117389],
          [21.7680788, 42.1182167],
          [21.7681646, 42.119681],
          [21.767993, 42.1201266],
          [21.767478, 42.1208269],
          [21.7671347, 42.1217182],
          [21.7667913, 42.1221639],
          [21.7667055, 42.1224185],
          [21.7667913, 42.1229915],
          [21.766448, 42.1233734],
          [21.7652464, 42.124201],
          [21.7652464, 42.1244556],
          [21.7655897, 42.1250922],
          [21.7655897, 42.1254105],
          [21.7653751, 42.1255697],
          [21.7646027, 42.1254424],
          [21.7640018, 42.125697],
          [21.7619419, 42.125506],
          [21.7615128, 42.125506],
          [21.7612123, 42.1256652],
          [21.7610407, 42.1263018],
          [21.7605686, 42.1267155],
          [21.7594528, 42.1267155],
          [21.7591524, 42.1268747],
          [21.7588949, 42.1273203],
          [21.7588091, 42.1277659],
          [21.7584229, 42.128116],
          [21.7575645, 42.1280523],
          [21.7571783, 42.1284024],
          [21.7564058, 42.1314578],
          [21.75632, 42.1325399],
          [21.7567492, 42.1329218],
          [21.7570925, 42.133431],
          [21.7575216, 42.1342585],
          [21.7575216, 42.1345767],
          [21.7573929, 42.1347359],
          [21.7570496, 42.1348632],
          [21.7561054, 42.1350541],
          [21.755805, 42.1353405],
          [21.755805, 42.1357861],
          [21.7555475, 42.1362953],
          [21.7555475, 42.1371227],
          [21.7554617, 42.1371863],
          [21.7555475, 42.1399867],
          [21.7553759, 42.1408141],
          [21.75529, 42.1435507],
          [21.7546892, 42.1455235],
          [21.7536592, 42.1476872],
          [21.7534018, 42.1488326],
          [21.7531443, 42.1494053],
          [21.7534447, 42.1497553],
          [21.7565346, 42.1509007],
          [21.7584229, 42.1512189],
          [21.7596245, 42.1515371],
          [21.760397, 42.1519189],
          [21.7619419, 42.1524279],
          [21.7660618, 42.1531915],
          [21.7692285, 42.1543522],
          [21.7692808, 42.1543306],
          [21.7692422, 42.1544058],
          [21.7700028, 42.1546665],
          [21.7710774, 42.155156],
          [21.7721311, 42.1557391],
          [21.7727554, 42.1559972],
          [21.7739441, 42.1562286],
          [21.7721791, 42.1613198],
          [21.7710985, 42.1656808],
          [21.7710744, 42.1666954],
          [21.7710504, 42.1672472],
          [21.7712185, 42.1674074],
          [21.7710264, 42.1679057],
          [21.7711945, 42.1689025],
          [21.7713386, 42.1690982],
          [21.7718909, 42.1709315],
          [21.7715437, 42.1723841],
          [21.7686443, 42.1722198],
          [21.7674584, 42.1720405],
          [21.7652893, 42.1714509],
          [21.7646027, 42.1707512],
          [21.762886, 42.1706876],
          [21.7620277, 42.1705603],
          [21.7587662, 42.1696061],
          [21.7555046, 42.16897],
          [21.754303, 42.16897],
          [21.7536163, 42.1690972],
          [21.7526722, 42.1688428],
          [21.7518139, 42.1687791],
          [21.7464924, 42.1688428],
          [21.7458057, 42.1683974],
          [21.7451191, 42.168143],
          [21.7422009, 42.168143],
          [21.742115, 42.1680794],
          [21.7401409, 42.1680157],
          [21.7379951, 42.1692244],
          [21.7356777, 42.1699878],
          [21.7351627, 42.1702423],
          [21.7336178, 42.1701787],
          [21.7329311, 42.1702423],
          [21.731987, 42.1704967],
          [21.7308712, 42.1711329],
          [21.7292404, 42.1711965],
          [21.7261505, 42.1715145],
          [21.7255497, 42.171769],
          [21.7244339, 42.1726595],
          [21.7232323, 42.1730412],
          [21.722374, 42.1730412],
          [21.720314, 42.174059],
          [21.719799, 42.174059],
          [21.71422, 42.1725323],
          [21.7130616, 42.1721343],
          [21.7129153, 42.1721837],
          [21.7127213, 42.1717006],
          [21.7119026, 42.1712601],
          [21.7111301, 42.1710056],
          [21.7102718, 42.1711965],
          [21.7083836, 42.1712601],
          [21.7082119, 42.1711965],
          [21.7079115, 42.1709102],
          [21.7080832, 42.1694471],
          [21.7076969, 42.1691608],
          [21.7064953, 42.1694153],
          [21.7058086, 42.1699878],
          [21.705122, 42.1699242],
          [21.703577, 42.1692881],
          [21.7027187, 42.1694789],
          [21.7022038, 42.1694789],
          [21.7019033, 42.1691926],
          [21.702075, 42.1690018],
          [21.702075, 42.1688109],
          [21.7017746, 42.1685883],
          [21.7004871, 42.1682702],
          [21.7001867, 42.1679839],
          [21.7002726, 42.1677295],
          [21.7009592, 42.1669661],
          [21.7012167, 42.1661391],
          [21.701806, 42.1655227],
          [21.7020046, 42.1649663],
          [21.7019033, 42.1643577],
          [21.7027617, 42.16264],
          [21.7028475, 42.1620674],
          [21.70362, 42.1613039],
          [21.7041349, 42.1601587],
          [21.7048216, 42.159268],
          [21.7052937, 42.158918],
          [21.7066669, 42.158409],
          [21.7072248, 42.1579954],
          [21.7073965, 42.1577409],
          [21.7082119, 42.1572001],
          [21.7107868, 42.1563093],
          [21.7110014, 42.1560866],
          [21.7110014, 42.1558321],
          [21.7107439, 42.1554504],
          [21.7097139, 42.1541778],
          [21.7092419, 42.1538278],
          [21.7089415, 42.1537324],
          [21.7088985, 42.1535733],
          [21.7076111, 42.152937],
          [21.7047787, 42.1505826],
          [21.7039204, 42.1502008],
          [21.7029762, 42.1502008],
          [21.7007446, 42.1495008],
          [21.6999722, 42.1496917],
          [21.6976118, 42.1505369],
          [21.6965389, 42.1508371],
          [21.6952997, 42.1512308],
          [21.6946507, 42.1513462],
          [21.6941357, 42.1511553],
          [21.6936207, 42.1507735],
          [21.6916466, 42.1497553],
          [21.6903591, 42.1496917],
          [21.6896725, 42.1495644],
          [21.6884708, 42.1487372],
          [21.6877842, 42.1485463],
          [21.6871834, 42.1480372],
          [21.6867542, 42.1478463],
          [21.6863251, 42.1479099],
          [21.6856813, 42.1483872],
          [21.6855097, 42.1487054],
          [21.6850376, 42.1490554],
          [21.6846943, 42.1491826],
          [21.6842651, 42.1491826],
          [21.6834068, 42.1493735],
          [21.6824627, 42.1494372],
          [21.6816044, 42.149819],
          [21.6806602, 42.1498826],
          [21.6795444, 42.1502008],
          [21.6783428, 42.1502008],
          [21.6779995, 42.150328],
          [21.6773129, 42.1508371],
          [21.6764545, 42.151028],
          [21.6756821, 42.1514734],
          [21.6749096, 42.1514098],
          [21.6741371, 42.151728],
          [21.6736221, 42.151728],
          [21.673193, 42.1516007],
          [21.6724205, 42.1508371],
          [21.6720772, 42.1507735],
          [21.6718626, 42.1509326],
          [21.6716051, 42.151378],
          [21.671133, 42.151728],
          [21.6706147, 42.1519449],
          [21.6698316, 42.1508787],
          [21.6695264, 42.1497105],
          [21.6693735, 42.1482599],
          [21.6694593, 42.1478145],
          [21.6686499, 42.1468494],
        ],
      ],
    ],
  },
};
function snapToBoundary(
  point: LatLng,
  polygonCoordinates: LatLngExpression[][][],
): LatLng {
  // Convert the first array of coordinates to LatLng objects
  const polygonPoints = polygonCoordinates[0][0].map((coord) => {
    if (Array.isArray(coord)) {
      return L.latLng(coord[0], coord[1]);
    }
    return L.latLng(coord);
  });

  let closestPoint = polygonPoints[0];
  let minDistance = point.distanceTo(polygonPoints[0]);

  for (let i = 1; i < polygonPoints.length; i++) {
    const distance = point.distanceTo(polygonPoints[i]);
    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = polygonPoints[i];
    }
  }

  return closestPoint;
}
function isPointWithinPolygon(
  point: LatLng,
  polygonCoordinates: LatLngExpression[][][],
): boolean {
  // Create a Leaflet polygon from the coordinates
  const poly = L.polygon(polygonCoordinates[0]);
  const polyPoints = poly.getLatLngs()[0] as LatLng[];

  const x = point.lat;
  const y = point.lng;

  // console.log("Checking point:", { lat: x, lng: y });
  // console.log("First polygon point:", polyPoints[0]);
  // console.log("Number of polygon points:", polyPoints.length);
  // console.log("Sample of polygon points:", polyPoints.slice(0, 3));

  let inside = false;
  for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
    const xi = polyPoints[i].lat;
    const yi = polyPoints[i].lng;
    const xj = polyPoints[j].lat;
    const yj = polyPoints[j].lng;

    const intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) {
      console.log("Intersection found at points:", {
        point1: { lat: xi, lng: yi },
        point2: { lat: xj, lng: yj },
      });
      inside = !inside;
    }
  }

  console.log("Result:", inside);
  return inside;
}
export default function MapConfirmLocation({
  pinLocation,
  populatedPlace,
  municipality,
  setPinLocation,
}: MapConfirmLocationProps) {
  const [position, setPosition] = useState(pinLocation);
  const [isBigger, setIsBigger] = useState(false);
  const markerRef = useRef<MarkerType | null>(null);
  const municipalityCoordinates: LatLngExpression[][][] | null =
    getPlaceCoordinates(Number(municipality?.jsonId));
  const populatedPlaceCoordinates: LatLngExpression[][][] | null =
    getPlaceCoordinates(Number(populatedPlace?.jsonId));

  const mapRef = useRef<Map | null>(null);

  // console.log("municipalityCoordinates");
  // console.log(municipalityCoordinates);
  // console.log("populatedPlaceCoordinates");
  // console.log(populatedPlaceCoordinates);
  //update position when inputs change
  useEffect(() => {
    if (pinLocation && pinLocation.lat && pinLocation.lng) {
      // console.log(pinLocation);
      const marker = markerRef.current;
      marker?.setLatLng(pinLocation);
    }
  }, [pinLocation]);

  //update marker when they change municipality or populated place
  useEffect(() => {
    if (municipalityCoordinates) {
      const marker = markerRef.current;
      const map = mapRef.current;
      if (populatedPlaceCoordinates) {
        // find center of polygon
        const polygon = L.polygon(populatedPlaceCoordinates);
        const centerOfPolygon = polygon.getBounds().getCenter();
        marker?.setLatLng(centerOfPolygon);
        // fit map to polygon
        // const bounds = L.latLngBounds(populatedPlaceCoordinates[0][0]);
        const bounds = polygon.getBounds();
        map?.fitBounds(bounds, { animate: true, padding: [50, 50] });
        return;
      }
      const polygon = L.polygon(municipalityCoordinates);
      const centerOfPolygon = polygon.getBounds().getCenter();
      marker?.setLatLng(centerOfPolygon);
      // fit map to polygon
      const bounds = polygon.getBounds();
      map?.fitBounds(bounds, { animate: true, padding: [50, 50] });
    }
  }, [municipality, populatedPlace]);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          const polygonToCheckAgainst = populatedPlaceCoordinates
            ? populatedPlaceCoordinates
            : municipalityCoordinates
              ? municipalityCoordinates
              : null;
          if (
            polygonToCheckAgainst &&
            isPointWithinPolygon(marker.getLatLng(), polygonToCheckAgainst)
          ) {
            const fixedTo5 = {
              lat: parseFloat(lat.toFixed(5)),
              lng: parseFloat(lng.toFixed(5)),
            };
            setPosition(fixedTo5);
            setPinLocation(fixedTo5);
          } else {
            // alert("You are not in the selected area");
            const snappedPosition = snapToBoundary(
              marker.getLatLng(),
              polygonToCheckAgainst as LatLngExpression[][][],
            );
            setPosition(snappedPosition);
            setPinLocation(snappedPosition);
          }
        }
      },
    }),
    [municipalityCoordinates, populatedPlaceCoordinates],
  );
  //   const toggleDraggable = useCallback(() => {
  //     setDraggable((d) => !d);
  //   }, []);
  const kumanovoCoordinates: LatLngExpression[] =
    kumanovoInfo.geometry.coordinates[0][0].map(
      (coord) => [coord[1], coord[0]] as LatLngExpression,
    );
  // console.log(kumanovoCoordinates);
  function handleBS() {
    setIsBigger(!isBigger);
  }
  return (
    <div
      className={cn(
        "h-[250px] overflow-hidden bg-white",

        isBigger && "fixed left-10 top-10 z-[3200] h-[70vh] w-[75vw]",
      )}
    >
      <button onClick={handleBS}>Bigger/Smaller</button>
      <MapContainer
        center={randomSkopjeCoordinates[0]}
        zoom={7}
        ref={mapRef}
        className="h-full w-full"
        // style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {municipalityCoordinates && (
          <Polygon
            pathOptions={{ color: "black" }}
            positions={municipalityCoordinates}
          />
        )}

        {populatedPlaceCoordinates && (
          <Polygon
            pathOptions={{ color: "red" }}
            positions={populatedPlaceCoordinates}
          />
        )}
        {position && position.lat && position.lng && (
          <Marker
            draggable
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
          >
            {/* <Popup minWidth={90}> */}
            {/* <span onClick={toggleDraggable}>
              {draggable
                ? "Marker is draggable"
                : "Click here to make marker draggable"}
            </span> */}
            {/* </Popup> */}
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
