<!-- uform 1.x 表单录入 -->
<template>
	<view class="bg">
		<view class="header" @click="onClickHeader">
			<image src="../../../../static/images/map/ic_arrow_down.png" class="header-img" v-if="isOpen"></image>
			<image src="../../../../static/images/map/ic_arrow_top.png" class="header-img" v-if="!isOpen"></image>
		</view>
		<view class="content">
			<u-form ref="formRef" :model="formData" :rules="formRules" labelPosition="left" labelWidth="140">
				<u-form-item label="名称:" required prop="name" borderBottom>
					<u-input v-model="formData.name" border="none" placeholder="请输入名称"></u-input>
				</u-form-item>
				<view v-show="isOpen">
					<u-form-item label="数量:" required prop="number" borderBottom>
						<u-input v-model="formData.number" border="none" placeholder="请输入数量"></u-input>
					</u-form-item>
					<u-form-item label="单选类型:" required prop="radioType" borderBottom>
						<!-- 单选 -->
						<view class="tag-bg">
							<view v-bind:class="[item.isSelected ? 'tag-item-select' : 'tag-item']"
								v-for="(item, index) in radios" :key="index" @click="onClickRadios(index)">
								{{item.label}}
							</view>
						</view>
					</u-form-item>
					<u-form-item label="多选类型:" required prop="checkboxType" borderBottom>
						<!-- 多选 -->
						<view class="tag-bg">
							<view v-bind:class="[item.isSelected ? 'tag-item-select' : 'tag-item']"
								v-for="(item, index) in checkboxs" :key="index" @click="onClickCheckboxs(index)">
								{{item.label}}
							</view>
						</view>
					</u-form-item>
					<u-form-item label="类型:" required prop="typeId" borderBottom>
						<input v-model="typeName" disabled disabledColor="#ffffff" border="none" placeholder="请选择"
							@click="onClickType" />
						<u-icon slot="right" name="arrow-right" @click="onClickType"></u-icon>
					</u-form-item>
				</view>

			</u-form>
		</view>
		<view class="footer">
			<view class="btns" :style="{ 'padding-bottom': safeHeight + 'rpx' }">
				<view class="btn1" style="background:rgb(243,106,101);" @click="onClickDelete"> 删除</view>
				<view class="btn1" style="background:rgb(0,149,184);" @click="onClickSubmit('save')"> 保存 </view>
				<view class="btn2" style="background:rgb(68,170,146);" @click="onClickSubmit('submit')"> 提交 </view>
			</view>
		</view>

		<u-select v-model="isShowTypePicker" :list="typeList" @confirm="onConfirmType" :default-value="defaultValue">
		</u-select>

	</view>
</template>

<script>
	const Dict = require('../../../../dataManager/dict.js')
	const app = getApp()

	export default {
		props: {
			// 传参,数组
			dialogData: {
				type: Array,
				default: () => [],
			},
			length: {
				type: Number,
				default: 0,
			},
			// dialogData: {
			// 	type: Object,
			// 	default: () => ({}),
			// },
			title: {
				type: String,
				default: ''
			},
			isShow: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				safeHeight: app.globalData.isIPhoneX ? 68 : 0,
				isOpen: true, // 是否展开
				radios: [],
				checkboxs: [],
				// 类型
				isShowTypePicker: false,
				typeList: [],
				defaultValue: [0],
				typeName: '',
				formData: {
					id: '',
					number: '',
					name: '',
					radioType: '',
					checkboxType: '',
					typeId: '',
					remarks: '',
				},
				formRules: {
					name: [
						// 对name字段进行长度验证
						{
							max: 5,
							message: '最多5字',
							trigger: 'change'
						},
						// 对name字段进行必填验证
						{
							required: true,
							type: 'string',
							message: '请输入名称',
							trigger: ['change', 'blur']
						},
					],
					radioType: [{
						validator: (rule, value, callback) => {
							const index = this.radios.findIndex(item => {
								return item.isSelected == true
							})
							if (index < 0) {
								return callback('请选择单选类型')
							}
							callback()
						},
						trigger: ['change', 'blur']
					}],
					checkboxType: [{
						validator: (rule, value, callback) => {
							const index = this.checkboxs.findIndex(item => {
								return item.isSelected == true
							})
							if (index < 0) {
								return callback('请选择多选类型')
							}
							callback()
						},
						trigger: ['change', 'blur']
					}],
					number: [{
							max: 3,
							message: '最长3位',
							trigger: ['change', 'blur']
						},
						{
							required: true,
							type: 'string',
							message: '请输入数量',
							trigger: ['change', 'blur']
						},
						// 正则判断为字母或数字
						{
							pattern: /^[1-9]\d*$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '仅支持录入正整数',
							trigger: ['change', 'blur']
						},
						// 自定义规则
						{
							validator: (rule, value, callback) => {
								console.log(value)
								if (value > 100) {
									return callback('100以内')
								}
								callback()
							},
							message: '100以内',
							trigger: ['change', 'blur']
						},
					],
					typeId: [{
						validator: (rule, value, callback) => {
							if (!this.formData.typeId) {
								return callback('请选择类型')
							}
							callback()
						},
						message: '请选择类型',
						trigger: ['change', 'blur']
					}],
				},
			};
		},
		watch: {
			dialogData: {
				handler: function(value) {
					console.log('dialogData222')
					this.formData.dataDetail = value.map((item) => {
						return {
							latitude: item.latitude,
							longitude: item.longitude,
							sort: item.id,
							position: item.address,
						}
					})
					console.log(JSON.stringify(this.formData.dataDetail))
				},
			},
		},
		mounted() {
			console.log('11')
			this.getDict()
		},
		onLoad: function() {
			console.log('222')
			// this.getDict()
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.formRef.setRules(this.formRules)
			uni.setNavigationBarTitle({
				title: 'uForm1.x表单'
			})
		},
		methods: {
			getDict() {
				this.radios = Dict.radioTypeDict
				this.checkboxs = Dict.checkboxTypeDict
				this.typeList = Dict.typeDict
			},
			onClickHeader() {
				this.isOpen = !this.isOpen
			},
			onClickRadios(name) {
				this.radios.map((item, index) => {
					item.isSelected = index === name ? true : false
					if (item.isSelected) {
						this.formData.radioType = item.value
					}
				})
			},
			onClickCheckboxs(name) {
				this.checkboxs[name].isSelected = !this.checkboxs[name].isSelected
				let tempArr = []
				this.checkboxs.forEach(function(item, index) {
					if (item.isSelected) {
						tempArr.push(item.value)
					}
				})
				this.formData.checkboxType = tempArr.join(",")
			},
			onClickType() {
				this.isShowTypePicker = true
				uni.hideKeyboard()
			},
			// 类型选择的回调
			onConfirmType(res) {
				console.log('类型选择', JSON.stringify(res));
				this.typeName = res[0].label
				this.formData.typeId = res[0].value
				const index = this.typeList.findIndex(item => {
					return item.value === res[0].value
				})
				this.defaultValue = index > -1 ? [index] : [0]
			},
			onClickDelete() {

			},
			onClickSubmit(type) {
				this.$refs.formRef.validate().then(res => {
					if (res) {
						this.submit(type)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			submit(type) {
				let that = this
				let params = this.formData
				params.dataStatus = type == 'save' ? 0 : 1
				console.log('参数：' + JSON.stringify(params))

				// uni.showLoading({
				// 	title: '正在提交...'
				// })
				// submit('/submit', params).then(res => {
				// 	uni.hideLoading()
				// 	console.log('新增成功')
				// 	console.log(res)
				// 	// uni.navigateBack()
				// }).catch(err => {
				// 	uni.hideLoading()
				// 	console.log(err)
				// })

			}
		}
	}
</script>

<style>
	.bg {
		background: white;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.header-img {
		width: 39rpx;
		height: 25rpx;
		padding: 15px 0px;
	}

	.content {
		padding: 0px 15px;
	}

	.tag-bg {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.tag-item {
		height: 30px;
		line-height: 30px;
		margin-top: 5px;
		margin-right: 10px;
		padding: 0px 15px;
		border-radius: 5px;
		border: 1px solid rgb(219, 219, 219);
		color: rgb(79, 79, 79);
	}

	.tag-item-select {
		height: 30px;
		line-height: 30px;
		margin-top: 5px;
		margin-right: 10px;
		padding: 0px 15px;
		border-radius: 5px;
		color: white;
		border: 1px solid rgb(7, 173, 44);
		background: rgb(7, 173, 44);
	}

	.footer {
		padding-top: 10px;
	}

	.dot {
		display: inline-block;
		margin: 0px 5px 2px 15px;
		width: 5px;
		height: 5px;
		border-radius: 2.5px;
		background: rgb(7, 173, 44);
	}

	.footer-text {
		display: inline-block;
		color: rgb(179, 179, 179);
		font-size: 14px;
	}

	.footer-text2 {
		display: inline-block;
		color: rgb(0, 168, 0);
		font-size: 18px;
		padding: 0px 5px;
	}

	.btns {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 10px;
		color: white;
	}

	.btn1 {
		flex: 1;
		padding: 15px;
		text-align: center;
	}

	.btn2 {
		flex: 2;
		padding: 15px;
		text-align: center;
	}
</style>
