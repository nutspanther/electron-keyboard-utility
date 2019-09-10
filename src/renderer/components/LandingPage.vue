<template>
  <div id="wrapper">
      <main>
        <div class="left-side">
        <ports></ports>
        </div>
        <div class="right-side" >
          <img src="../assets/keyboard_background.png"  alt=""/>
          <SystemInformation></SystemInformation>
          </div>
        </main>
  </div>
</template>

<script>
  import Ports from './LandingPage/Ports'
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    components: { SystemInformation, Ports },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { 
  font-family: 'Roboto Condensed', sans-serif;
  }

  #wrapper {
    position: absolute;
    background-color:rgba(0, 0, 0, 0.74);
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
    z-index:-2;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }



  .left-side {
    flex-basis: min-content;
    display: flex;
    flex-direction: column;
  }

  .right-side {
    padding: 10px;
    flex-basis: fit-content;
    /* background: url('../assets/keyboard_background.png'); */
  }

  .right-side > img {
    position: absolute;
    z-index: -1;
    display: inline;
    width: 600px;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #ebebeb;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
    text-shadow: rgb(43, 43, 43) 0 0 1px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: rgb(255, 255, 255);
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
