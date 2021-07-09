let isDevelop = process.env.NODE_ENV === 'development';

module.exports = {
	Jh_getStorageSync,
	Jh_setStorageSync,
	Jh_removeStorageSync,
	Jh_clear,
	Jh_getStorageInfoSync,
};

function Jh_getStorageSync(key) {
	try {
		return uni.getStorageSync(key)
	} catch (e) {
		if (isDevelop) {
			console.log('===== torageUtils =====');
			console.log('key:' + key + '取数据失败：' + e);
		}
		return null
	}
}

function Jh_setStorageSync(key, data) {
	try {
		uni.setStorageSync(key, data);
	} catch (e) {
		if (isDevelop) {
			console.log('===== torageUtils =====');
			console.log('key:' + key + '存数据失败：' + e);
		}
	}
}

function Jh_removeStorageSync(key) {
	try {
		uni.removeStorageSync(key);
	} catch (e) {
		if (isDevelop) {
			console.log('===== torageUtils =====');
			console.log('key:' + key + '删数据失败：' + e);
		}
	}
}

function Jh_getStorageInfoSync() {
	try {
		const res = uni.getStorageInfoSync();
		if (isDevelop) {
			console.log('===== torageUtils =====');
			console.log('keys:' + res.keys);
			console.log('currentSize:' + res.currentSize);
			console.log('limitSize:' + res.limitSize);
		}
		return res
	} catch (e) {
		if (isDevelop) {
			console.log('===== torageUtils =====');
			console.log('获取本地Info失败：' + e);
		}
	}
}

function Jh_clear() {
	try {
		uni.clearStorageSync();
	} catch (e) {
		if (isDevelop) {
			console.log('===== torageUtils =====');
			console.log('清空本地数据失败：' + e);
		}
	}
}



/*
  使用方法：

  import TorageUtils from '@/common/utils/torageUtils.js'
  const TorageUtils = require('@/common/utils/torageUtils.js')

  TorageUtils.Jh_setStorageSync('key1', 'value1111')
  TorageUtils.Jh_getStorageSync('key1')
  console.log(TorageUtils.Jh_getStorageInfoSync());

  */
