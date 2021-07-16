<template>
	<view>

	</view>
</template>

<script>
	const EncryptUtils = require('../../../../common/utils/encrypt/encryptUtils.js');
	export default {
		data() {
			return {
				title: "AES、RSA、SHA256、MD5、base64使用",
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title
			})
			this.test()
		},
		methods: {
			test() {
				console.log('======== AES =========');
				console.log(EncryptUtils.AESEncrypt('123'));
				console.log(EncryptUtils.AESDecrypt(EncryptUtils.AESEncrypt('123')));
				console.log('======== RSA =========');
				console.log(EncryptUtils.RSAEncrypt('123'));
				console.log(EncryptUtils.RSADecrypt(EncryptUtils.RSAEncrypt('123')));
				console.log('======== SHA256 =========');
				console.log(EncryptUtils.SHA256('123'));
				console.log('======== MD5 =========');
				console.log(EncryptUtils.MD5('123'));
				console.log('======== Base64 =========');
				console.log(EncryptUtils.Base64EnCode('123'));
				console.log(EncryptUtils.Base64DeCode(EncryptUtils.Base64EnCode('123')));
			}

		}
	}
</script>

<style>

</style>
