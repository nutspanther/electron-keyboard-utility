<template>
    <div class="box">
        <div>
    <span class="title">
      Port List
    </span>
            <ul>
                <li v-for="port in ports" :key="port.comName"><a
                        @click="openPort(port.comName)">{{port.comName}}</a><span
                        v-show="port.comName === activePort.path">-active</span></li>
            </ul>
        </div>
        <div>
            <h1 class="title" @click="readPort">Data Stream</h1>
            <div class="fill border">
                {{message}}
            </div>
            <label>
                <input type="text" @keyup.enter="writeMessage(portMessage, port)" v-model="portMessage"/>
            </label>
            <button type="submit" @click="writeMessage(portMessage, port)">Send</button>
        </div>
    </div>
</template>

<script>
  import SerialPort from 'serialport'
  import {ipcRenderer} from 'electron'
  // var main = remote.require('./index.js')

  export default {
    data () {
      return {
        ports: SerialPort.list((err, ports) => {
          console.log('ports', ports)
          if (err) console.log(err)
          this.ports = ports
        }),
        activePort: {},
        message: '',
        portMessage: ''
      }
    },
    methods: {
      writeMessage: function (message, port) {
        let success = ipcRenderer.sendSync('write-message', [message, port])
        if (!success) {
          this.message = success
        } else {
          this.message = 'message sent'
        }
      },
      openPort: function (name) {
        this.message = 'Port opening...'
        this.activePort = ipcRenderer.sendSync('open-port', name)
        this.message = 'Port opened on ' + this.activePort.path
      },
      readPort: function () {

      }
    },
    created: function () {
      ipcRenderer.on('new-data', (event, arg) => {
        console.log(arg)
        arg = Utf8ArrayToStr(arg)
        this.message = arg
      })
    }
  }

  /**
   * @return {string}
   */
  function Utf8ArrayToStr (array) {
    var out, i, len, c
    var char2, char3

    out = ''
    len = array.length
    i = 0
    while (i < len) {
      c = array[i++]
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c)
          break
        case 12:
        case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++]
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F))
          break
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++]
          char3 = array[i++]
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0))
          break
      }
    }

    return out
  }
</script>
<style>
    ul {
        list-style: none;
        padding: 15px;
    }

    .box {
        display: flex;
        flex-direction: column;
        height: 100%;
        color: beige;
    }

    .box > div {
        flex: 1 0 0;
        flex-direction: column;
        height: 0 !important;
    }

    .border {
        flex: 0 0 100%;
        border: 1px solid rgb(44, 44, 44);
        box-shadow: inset 0 0 5px rgb(50, 50, 50);
        padding: 5px;
        overflow: auto;
        height: 200px;
    }

    .fill {

    }
</style>
