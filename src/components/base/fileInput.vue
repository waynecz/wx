<script type="text/ecmascript-6">
	/**
	 * Created by wcz on 2016/12/15.
	 */
	export default {
		props: {
			inputId: {
				default: '',
				require: true
			},
            onChange: {
			    default: false
            },
            camera: {
			    default: false
            },
			placeholder: {
				default: ''
            },
			readonly: {
				default: false
			},
			changeText: {
				default: '单击以修改'
            },
            ps: {
				default: '点击选择文件'
            },
            value: {
				default: undefined
            }
		},
		data () {
			return {
				file: [],
				imgChoosed: false,
				dataUrl: '',
				fileName: '',
			}
		},
		computed: {
			buttonTxt () {
				return '拍照或从相册选择'
            }
        },
		mounted () {
            if (this.imgSrc) {
            	this.dataUrl = this.imgSrc;
            	this.imgChoosed = true;
			}
		},
		methods: {
			handleFileChange () {
				let inputDOM = this.$refs.inputer;
				this.file    = inputDOM.files[0];

                // 双向绑定
				this.$emit('input', this.file);

				this.imgPreview(inputDOM);

				let filePath = inputDOM.value;
				if (filePath) {
					this.imgChoosed = true;
				}
				let m         = filePath.match(/([^\/\\]+)$/);
				this.fileName = m[1];
				this.onChange && this.onChange(this.fileName);
			},
			imgPreview (fileInputer) {
				let self  = this;
				let files = !!fileInputer.files ? fileInputer.files : [];

				if (!files.length || !window.FileReader) return;

				if (/^image/.test(files[0].type)) {
					var reader = new FileReader();
					reader.readAsDataURL(files[0]);

					reader.onloadend = function () {
						self.dataUrl = this.result;
					}

				}
			},
            compress (res) {
				let img = new Image(),
                    maxH = 900;

				img.onload = function () {
                    let cvs = document.createElement('canvas'),
                        ctx = cvs.getContext('2d');

                    if (img.height > maxH) {
						img.width *= maxH / img.height;
						img.height = maxH;
                    }

					cvs.width = img.width;
					cvs.height = img.height;

					ctx.clearRect(0, 0, cvs.width, cvs.height);
					ctx.drawImage(img, 0, 0, img.width, img.height);

					let data = cvs.toDataURL('image/jpeg', 0.6);
				};

				img.src = res;
            }
		},
        watch: {
			imgSrc (newval, oldval) {
				if (newval) {
					this.dataUrl = newval;
					this.imgChoosed = true;
                }
            }
        }
	};
</script>

<template>
    <div class="file-input" :class="{'selected': imgChoosed }">
        <i class="iconfont file-input__icon">&#xe62d;</i>
        <p class="file-input__ps">{{buttonTxt}}</p>
        <p class="file-input__placeholder">{{placeholder}}</p>
        <label :for="readonly ? '' : inputId" class="file-input__label"></label>
        <input ref="inputer" type="file" :id="inputId" accept="image/*,video/*;" capture="video" class="file-input__inputer" @change="handleFileChange"/>
    </div>
</template>