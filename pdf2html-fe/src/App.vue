<template>
  <div id="app">
    <el-upload
      class="upload-demo"
      accept=".pdf"
      :auto-upload="false"
      drag
      action="http://49.235.109.180:4000/api/upload/pdf"
      :on-change="uploadRequest">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传pdf文件，且不超过20M</div>
    </el-upload>
  </div>
</template>

<script>


export default {
  name: 'App',
  methods: {
    uploadRequest(file) {
      console.log('e', file, file.raw)
      
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
