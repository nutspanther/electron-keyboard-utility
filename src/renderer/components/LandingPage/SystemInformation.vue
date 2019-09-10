<template>
  <div class="container" >
    <div class = "joystick">
      <p>{{message}}</p>

        <label>
            <input v-for="(item, index) in updated_joystick_key" :key="index" @keydown="getKey(event, index, 'joystick')" @blur="updateJoystick(index)" :disabled="item.disabled" :value="item.value"/>
        </label>
    </div>
    <div class="keyboard">
        <label>
            <input v-for="(item, index) in updated_key" :key="index" @keydown="getKey(event, index, 'keyboard')" @blur="updateKeyboard(index)" @click.right="clear(index)" :value="item.value"/>
        </label>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {ipcRenderer} from 'electron'

export default {
  data () {
    return {
      imgUrl: 'static/keyboard_background.png',
      keyCodes: Vue.config.keyCodes,
      message: '',
      updated_key: [
        {
          value: '',
          key: '',
          row: 0,
          col: 0
        },
        {
          value: '',
          key: '',
          row: 0,
          col: 1
        },
        {
          value: '',
          key: '',
          row: 0,
          col: 2
        },
        {
          value: '',
          key: '',
          row: 0,
          col: 3
        },
        {
          value: '',
          key: '',
          row: 0,
          col: 4
        },
        {
          value: '',
          key: '',
          row: 0,
          col: 5
        },
        {
          value: '',
          key: '',
          row: 1,
          col: 0
        },
        {
          value: '',
          key: '',
          row: 1,
          col: 1
        },
        {
          value: '',
          key: '',
          row: 1,
          col: 2
        },
        {
          value: '',
          key: '',
          row: 1,
          col: 3
        },
        {
          value: '',
          key: '',
          row: 1,
          col: 4
        },
        {
          value: '',
          key: '',
          row: 1,
          col: 5
        },
        {
          value: '',
          key: '',
          row: 2,
          col: 0
        },
        {
          value: '',
          key: '',
          row: 2,
          col: 1
        },
        {
          value: '',
          key: '',
          row: 2,
          col: 2
        },
        {
          value: '',
          key: '',
          row: 2,
          col: 3
        },
        {
          value: '',
          key: '',
          row: 2,
          col: 4
        },
        {
          value: '',
          key: '',
          row: 2,
          col: 5
        },
        {
          value: '',
          key: '',
          row: 3,
          col: 0
        },
        {
          value: '',
          key: '',
          row: 3,
          col: 1
        },
        {
          value: '',
          key: '',
          row: 3,
          col: 2
        },
        {
          value: '',
          key: '',
          row: 3,
          col: 3
        },
        {
          value: '',
          key: '',
          row: 3,
          col: 4
        },
        {
          value: '',
          key: '',
          row: 3,
          col: 5
        }
      ],
      updated_joystick_key: [
        {
          value: '',
          key: '',
          row: 0,
          col: 0,
          disabled: true
        },
        {
          value: '',
          key: '',
          row: 0,
          col: 1,
          disabled: false
        },
        {
          value: '',
          key: '',
          row: 0,
          col: 2,
          disabled: true
        },
        {
          value: '',
          key: '',
          row: 1,
          col: 0,
          disabled: false
        },
        {
          value: '',
          key: '',
          row: 1,
          col: 1,
          disabled: false
        },
        {
          value: '',
          key: '',
          row: 1,
          col: 2,
          disabled: false
        },
        {
          value: '',
          key: '',
          row: 2,
          col: 0,
          disabled: true
        },
        {
          value: '',
          key: '',
          row: 2,
          col: 1,
          disabled: false
        },
        {
          value: '',
          key: '',
          row: 2,
          col: 2,
          disabled: true
        }
      ]
    }
  },
  methods: {
    getKey (ev, idx, type) {
      console.log(event.key)
      event.preventDefault()
      if (type === 'keyboard') {
        switch (event.key) {
          case 'ArrowDown':
            this.updated_key[idx].value = 'Down'
            break
          case 'ArrowUp':
            this.updated_key[idx].value = 'Up'
            break
          case 'ArrowRight':
            this.updated_key[idx].value = 'Right'
            break
          case 'ArrowLeft':
            this.updated_key[idx].value = 'Left'
            break
          case 'PageDown':
            this.updated_key[idx].value = 'PgDn'
            break
          case 'PageUp':
            this.updated_key[idx].value = 'PgUp'
            break
          default:
            this.updated_key[idx].value = event.key
        }
        this.updated_key[idx].key = Vue.config.keyCodes[event.key]
        this.message = 'key ' + this.updated_key[idx].value + ' (' + this.updated_key[idx].key + ')'
      } else if (type === 'joystick') {
        switch (event.key) {
          case 'ArrowDown':
            this.updated_joystick_key[idx].value = 'Down'
            break
          case 'ArrowUp':
            this.updated_joystick_key[idx].value = 'Up'
            break
          case 'ArrowRight':
            this.updated_joystick_key[idx].value = 'Right'
            break
          case 'ArrowLeft':
            this.updated_joystick_key[idx].value = 'Left'
            break
          case 'PageDown':
            this.updated_joystick_key[idx].value = 'PgDn'
            break
          case 'PageUp':
            this.updated_joystick_key[idx].value = 'PgUp'
            break
          case ' ':
            this.updated_joystick_key[idx].value = 'Space'
            break
          default:
            this.updated_joystick_key[idx].value = event.key
        }
        this.updated_joystick_key[idx].key = Vue.config.keyCodes[event.key]
        this.message = 'key ' + this.updated_joystick_key[idx].value + ' (' + this.updated_joystick_key[idx].key + ')'
      }
    },
    updateKeyboard: function (idx) {
      let message = '<update key ' + this.updated_key[idx].row + ' ' + this.updated_key[idx].col + ' ' + this.updated_key[idx].key + '>'
      let success = ipcRenderer.sendSync('write-message', [message])
      console.log(this.updated_key[idx].key, success)
    },
    updateJoystick: function (idx) {
      let message = '<update joystick ' + this.updated_joystick_key[idx].row + ' ' + this.updated_joystick_key[idx].col + ' ' + this.updated_joystick_key[idx].key + '>'
      let success = ipcRenderer.sendSync('write-message', [message])
      console.log(this.updated_joystick_key[idx].key, success)
    },
    clear: function (idx) {
      this.updated_key[idx].key = ''
      this.updated_key[idx].value = ''
    }
  }
}
</script>

<style scoped>
.container {
  width: 400px;
  display: table-row;
  height: 310px;
  z-index: 2;
}

.container input {
  text-transform: capitalize;
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
  font-size: 14px;
  z-index: 2;
  color:beige;
  background-color: rgba(43, 43, 43, 0.6);
  overflow-x: visible;
  overflow-wrap: normal;
  border:1px inset rgb(44, 44, 44);
  box-shadow: inset 0 0 5px rgb(44, 44, 44);
  text-shadow: rgb(44, 44, 44) 0 0 1px;
  border-radius: 7px;
}
.joystick {
  display: table-cell;
  width: 150px;
  vertical-align: bottom;
  text-align: center;
  z-index: 2;
}

.joystick > input {
  width: 30px;
  height: 30px;
  margin: 5px;
}

.joystick > input:disabled {
  visibility:hidden;
}

.keyboard {
  width: 400px;
  padding-bottom: 42px;
  padding-left: 6px;
  display: table-cell;
  z-index: 2;
  vertical-align: bottom;
}

.keyboard > input {
  width: 55px;
  height: 55px;
  margin: 1px 5px 1px 2px;
  }

/*.title {
  color: #888;
  font-size: 18px;
  font-weight: initial;
  letter-spacing: .25px;
  margin-top: 10px;
}

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }*/

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
