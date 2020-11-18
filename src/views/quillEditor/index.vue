<template>
    <quill-editor
        ref="myTextEditor"
        class="quillEditor"
        :options="editorOption"
        style="overflow:auto"
        v-model="content"
        @ready="onEditorReady($event)"
        @focus="onFocus($event)"
    >
    </quill-editor>
</template>
<script>
export default {
    data() {
        return {
            content: "",
            upImgEdit: "",
        };
    },
    methods: {
        // 富文本编辑器加载完毕，将图片上传替换为element upload 组件
        onEditorReady(e) {
            const quill = e;
            const toolbar = quill.getModule("toolbar");
            toolbar.addHandler("image", (item) => {
                this.upImgEdit = arguments[0];
                // quill.format('image', false);
                document.querySelector(".quill-img").click();
            });
        },
        async upImgChange(e) {
            let fileList = e.target.files;
            this.loading = true;
            for (let index = 0; index < fileList.length; index++) {
                const file = fileList[index];
                let form = new FormData();
                form.append("file", file, file.name);
                let { code, data } = await uploadImage(form);
                if (code === 200) {
                    let quill = this.upImgEdit;
                    let length = quill.getSelection().index;
                    let preFix = `${reConfig.orign}/${reConfig.projectName}/image/`;
                    quill.insertEmbed(length, "image", preFix + data);
                    quill.setSelection(length + 1);
                }
            }

            document.querySelector(".quill-img").value = "";
            this.loading = false;
        },
    },
};
</script>
<style lang="scss" scoped>
.quillEditor ::v-deep.ql-editor {
    overflow: auto;
    height: 300px;
}
</style>
