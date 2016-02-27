'use strict'
var moment = require('moment');

module.exports = {
    //Convert unix timecode or date
    convertTime: function(toConvert) {
        var unix = null;
        var natural = ""
        if( isNaN(toConvert) && moment(toConvert, "MMMM DD, YYYY", true).isValid() ) {
				natural = toConvert;
				unix = moment(toConvert).unix();
		}
		else if( moment.unix(Number(toConvert)).isValid() ) {
			unix = Number(toConvert);
			natural = moment.unix(unix).format("MMMM DD, YYYY");
		}
		else //Not a valid unix timecode or date format
		    return { error: "Not an acceptable unix timestamp or properly formatted date." };
		return { unix, natural };
    }
    
};