let str = "78 78 22 22 0F 0C 1D 02 33 05 C9 02 7A C8 18 0C 46 58 60 00 14 00 01 CC 00 28 7D 00 1F 71 00 00 01 00 08 20 86 0D 0A";

//String To Array conversion for find status Value
var arary = str.split(" ");

//Array To Sub Array conversion for find status Value
const StartArray = arary.slice(0, 2);
const PacketArray = arary.slice(2, 3);
const ProtocolArray = arary.slice(3, 4);
const DateTimeArray = arary.slice(4, 10);
const QuantityArray = arary.slice(10, 11);
const LatitudeArray = arary.slice(11, 15);
const LongitudeArray = arary.slice(15, 19);
const SpeedArray = arary.slice(19, 20);
const StatusArray = arary.slice(20, 22);

//get the value of Every Bits
let StartBit = StartArray.join(" ");
let PacketLength = PacketArray.join(" ");
let ProtocolNumber = ProtocolArray.join(" ");
let DateTimes = DateTime(DateTimeArray);
let Quantity = hexToDec(QuantityArray);
let Latitude = (hexToDec(LatitudeArray.join("")) / 1800000);
let Longitude = (hexToDec(LongitudeArray.join("")) / 1800000);
let Speed = hexToDec(SpeedArray);

//Print the every Bits
console.log('Start Bit' ,StartBit);
console.log('Packet Length' ,PacketLength);
console.log('Date Time' ,DateTimes);
console.log('Quantity of GPS information satellites' ,Quantity);
console.log('Latitude' ,Latitude);
console.log('Longitude' ,Longitude);
console.log('Speed' ,Speed);
console.log('Course, Status');
console.log('\n');

let Status = getCouse(StatusArray);

//decleartion of Functions

function hexToDec(num) {
    return parseInt(num, 16).toString(10);
}

function binToDec(num) {
    return parseInt(num, 2).toString(10);
} 

function hexToBin(num) {
    let bin = parseInt(num, 16).toString(2);
    if (bin.length < 7) {
        let diff = (7 - (bin.length));
        let str = ""
        for (let index = 0; index < diff; index++) {
            str += '0';
        }
        return str + bin;
    } else {
        return bin;
    }

}

function DateTime(array) {
    let str = "";
    array.forEach(element => {
        str += hexToDec(element) + " ";
    });
    return str;
}

function getCouse(array) {
    let str = "";
    var bin = "";
    array.forEach(element => {
        str += hexToBin(element) + "";
    });
    
    for (let index = 0; index < str.length; index++) {
        switch (index) {
            case 0:
                console.log(str[index])
                break;
            case 1:
                console.log(str[index])
                break;
            case 2:
                console.log("real time GPS",str[index])
                break;
            case 3:
                if (str[index] == 0) {
                    console.log("GPS having been not positioning" , str[index])
                } else {
                    console.log("GPS having been positioning" , str[index])
                }
                break;
            case 4:
                if (str[index] == 0) {
                    console.log("East Longitude" , str[index])
                } else {
                    console.log("West Longitude" , str[index])
                }
                break;
            case 5:
                if (str[index] == 0) {
                    console.log("South Latitude" , str[index])
                } else {
                    console.log("North Latitude" , str[index])
                }
                break;
            default:
                bin += str[index];
        }
    }
    let deci = binToDec(bin);
    console.log(`Course ${deci}° (${bin} in Binary, or ${deci} in decimal)`);
}