// 校验 

module.exports = {
	Jh_isPhone,
	Jh_isEmpty,
}

const regular_phone = /^1[3-9][0-9]{9}$/;

function Jh_isEmpty(text) {
	return text.isEmpty()
}

function Jh_isPhone(phone) {
	return regular_phone.test(phone)
}


/* 正则：
var myreg = /^1[3-9][0-9]{9}$/;
var myreg = new RegExp('^1[3-9][0-9]{9}$');
myreg.test(str)
*/

/*
import CheckUtils from '@/common/utils/checkUtils.js'
const CheckUtils = require('@/common/utils/checkUtils.js');
const CheckUtils = require('../../utils/checkUtils.js');
*/
