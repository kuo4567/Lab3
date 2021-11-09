
let currentDevice;
let isPause = false;
let isFilt = false;
const serviceUUID='0000ff02-0000-1000-8000-00805f9b34fb';
const charUUID='0000aa02-0000-1000-8000-00805f9b34fb';
let package=[];






function scan(){
    navigator.bluetooth.requestDevice({
       acceptAllDevices: true,
       optionalServices: [serviceUUID]
    }).then(device => {
       currentDevice=device;
       console.log('選了',currentDevice);
    }).catch(err => console.log('拋出錯誤內容',err));
}

function connect(dev){
   dev.gatt.connect().then(server => {
       console.log(server);
       return server.getPrimaryService(serviceUUID);
   }).then(service => {
       console.log(service);
       return service.getCharacteristic(charUUID);
   }).then(char => {
       console.log(char);
       char.startNotifications().then(c => {
           c.addEventListener('characteristicvaluechanged',function(evt){
               if(!isPause){
                   package=Array.from(new Uint16Array(this.value.buffer));
                   $('#package-header')[0].innerHTML='Package點數: ' + package.length;
                   $('#package-body')[0].innerHTML='[' + package + ']';
               }
           });
       });
   }).catch(err => console.log('拋出錯誤內容',err));
}

function disconnect(dev){
   dev.gatt.disconnect();
   console.log(dev.name,'已斷線');
   package=[];
}

function toggle(flag){
    return !flag;
}











$('.btn').click(ble);
function ble(evt){
    console.log(evt.target.innerHTML,'被點擊');
    switch(evt.target.innerHTML){
        case 'Scan':
            scan();
            break;
        case 'Connect':
            connect(currentDevice);
            break;
        case 'Disconnect':
            disconnect(currentDevice);
            break;    
        case 'Pause/Run':
            isPause=toggle(isPause);
            break;
        case 'Filter_ON/OFF':
            isFilt=toggle(isFilt);
            break;
        default:
            console.log('No such case...');

    }
}
