<template>
  <div>
    <div class="row">
      <h5>上传文件</h5>
    </div>
    <div class="row" style="margin-bottom: 0;">
      <div class="center row" v-if="upload.files.length===0">
        <h5 style="font-size: 1.5rem; margin: 0; padding-top: 2rem; padding-bottom: 2rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;">
          在这里上传文件
        </h5>
      </div>
      <div class="center row" v-if="upload.files.length>0">
        <div class="col s12" style="font-size: 1.5rem; margin: 0; padding-top: 2rem; padding-bottom: 2rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;">
          <button class="btn"
                  style="cursor: pointer"
                  :class="{ green: file.success, teal: file.active, red: file.error, 'blue-grey': !file.success && !file.active && !file.error}"
                  v-for="(file, index) in upload.files" :key="file.id">
            {{file.name}}&nbsp
            <span v-if="file.error">{{file.error}}</span>
            <span v-else-if="file.success">成功</span>
            <span class="detail" v-else-if="file.active">{{file.progress}}%</span>
            <span class="detail" v-else></span>
            <i class="material-icons right"
               style="cursor: pointer"
               @click.prevent="$refs.upload.remove(file)">
              clear
            </i>
          </button>
        </div>
      </div>
      <div class="center row">
        <file-upload
          class="waves-effect waves-light btn blue-grey lighten-1"
          :post-action="upload.url"
          :size="upload.size"
          :maximum="upload.maximum"
          v-model="upload.files"
          ref="upload">
          <i class="material-icons right">attach_file</i>
          选择文件
        </file-upload>
        <button type="button" class="btn green"
                v-if="!$refs.upload || !$refs.upload.active"
                @click.prevent="$refs.upload.active = true">
          <i class="material-icons right" aria-hidden="true">file_upload</i>
          开始上传
        </button>
        <button type="button" class="btn red" v-else @click.prevent="$refs.upload.active = false">
          <i class="material-icons right" aria-hidden="true">clear</i>
          停止上传
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from "vue-upload-component";

export default {
  name: "Upload",
  components: { FileUpload },
  data: function () {
    return {
      upload: {
        files: [],
        web_io: "http://118.89.229.204:8080",
        url: 'http://118.89.229.204:8080/ERM-WebIO-1.0/file/upload.do',
        size: 100 * 1024 * 1024,
        maximum: 1
      },
    }
  },
  methods: {
    check_upload: function() {
      let files = this.upload.files;
      if (files.length === 0) {
        M.toast({
          html: "<span style='font-weight: bold;'>请上传文件</span>",
          classes: 'yellow darken-2 rounded'
        });
        return false;
      } else {
        if (!files[0].success) {
          M.toast({
            html: "<span style='font-weight: bold;'>请先点“开始上传”</span>",
            classes: 'yellow darken-2 rounded'
          });
          return false;
        }
      }
      return true;
    },

    get_upload_link: function() {
      let files = this.upload.files;
      let upload_resp = JSON.parse(files[0].response);
      let file_url = this.upload.web_io + "/" + upload_resp.link;
      return file_url;
    }
  }
}
</script>

<style scoped>

</style>
