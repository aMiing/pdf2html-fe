<template>
  <div id="app">
    <div class="main">
      <h2>pdf文件一键转换成网页</h2>
      <div class="upload-content">
        <el-upload
          ref="fileUpload"
          class="upload-demo"
          accept=".pdf"
          :auto-upload="false"
          drag
          action="#"
          :show-file-list="false"
          :on-change="uploadRequest"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传pdf文件，且不超过20M
          </div>
        </el-upload>
      </div>
      <div class="progress" v-show="transProgress">
        <span class="fileName">{{ fileName }}</span>
        <!-- <div class="progress-list">
          <span>上传进度：</span>
          <div class="progress-box">
            <el-progress
              :text-inside="true"
              :stroke-width="16"
              :percentage="uploadProgress"
            ></el-progress>
          </div>
        </div> -->
        <div class="progress-list">
          <span>转换进度：</span>
          <div class="progress-box">
            <el-progress
              :text-inside="true"
              :stroke-width="16"
              :percentage="transProgress"
              :color="statusColor"
            ></el-progress>
          </div>
        </div>
        <div class="operate">
          <el-button
            type="primary"
            :disabled="transProgress < 100"
            @click="openLink"
          >
            预览</el-button
          >
          <el-button
            type="success"
            :disabled="transProgress < 100"
            @click="downloadHtml"
            >下载</el-button
          >
        </div>
      </div>
    </div>
    <a :href="downloadLink" vissible="false"></a>
  </div>
</template>

<script>
import { axios, postPoint } from "./utils";

export default {
  name: "App",
  data() {
    return {
      uploadProgress: 0,
      transProgress: 0,
      timer: null,
      fileName: "",
      downloadLink: "",
    };
  },
  mounted() {
    postPoint();
  },
  methods: {
    initData() {
      this.uploadProgress = 0;
      this.transProgress = 0;
      this.timer = null;
    },
    async uploadRequest(file) {
      postPoint();
      this.initData();
      const _this = this;
      const formData = new FormData();
      const name = file.name.replaceAll(" ", "");
      this.fileName = name;
      formData.append("file", file.raw);
      formData.append("filename", name);
      await axios.post(
        this.GOLBAL.baseUrl || "" + "/api/upload/pdf",
        formData,
        {
          onUploadProgress(ev) {
            let { loaded, total } = ev;
            _this.transProgress = (loaded / total) * 10;
          },
        }
      );
      this.doTransform(name);
    },
    doTransform(name) {
      this.simulateProgress(0);
      const formData = new FormData();
      formData.append("name", name);
      axios
        .post(this.GLOBAL.baseUrl || "" + "/api/pdf2html", formData)
        .then(({ data, msg }) => {
          if (msg === "success") {
            this.simulateProgress(1);
            this.transData = data;
          } else {
            alert("失败：", msg);
          }
        })
        .catch((err) => {
          console.log("err", err);
          alert("失败：", err);
        });
    },
    simulateProgress(status) {
      if (status) {
        clearInterval(this.timer);
        this.transProgress = 100;
        return;
      }
      this.timer = setInterval(() => {
        this.transProgress += 1;
        if (this.transProgress >= 90) {
          clearInterval(this.timer);
        }
      }, 100);
    },
    openLink() {
      window.open(this.transData.uri, "_blank");
    },
    async downloadHtml() {
      const data = await axios.get(this.transData.uri, null, {
        responseType: "blob",
      });
      let url = window.URL.createObjectURL(new Blob([data]));
      const oa = document.createElement("a");
      oa.href = url;
      oa.setAttribute("download", this.transData.name);
      oa.click();
    },
    statusColor() {
      return `rgba(103, 194, 58, ${this.transProgress / 100})`;
    },
  },
};
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
.main {
  width: 380px;
  text-align: center;
  margin: 24px auto;
  /* display: flex;
  flex-direction: column; */
}
.progress {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 120px;
  padding: 12px;
}
.progress-list {
  display: flex;
}
.progress-box {
  flex: 1;
}
.fileName {
  color: #606266;
  font-size: 14px;
  text-align: left;
}
</style>
