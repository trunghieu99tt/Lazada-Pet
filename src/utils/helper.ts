const encodeStr = (encodeStr: string): string => {
    try {
        encodeStr = encodeStr.toString().toLowerCase().trim();
        encodeStr = encodeStr.replace(
            /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
            "a"
        );
        encodeStr = encodeStr.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ.+/g, "e");
        encodeStr = encodeStr.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        encodeStr = encodeStr.replace(
            /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ.+/g,
            "o"
        );
        encodeStr = encodeStr.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        encodeStr = encodeStr.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        encodeStr = encodeStr.replace(/đ/g, "d");

        encodeStr = encodeStr.replace(/[^\w\s]/gi, "");
        encodeStr = encodeStr.replace(/\(|\)|\:/g, "");
        encodeStr = encodeStr.replace(/\//g, "-");
        encodeStr = encodeStr.replace(/^\-+|\-+$/g, "");
        encodeStr = encodeStr.replace(/ /g, "-");
        encodeStr = encodeStr.replace(/-+-/g, "-");

        return encodeStr;
    } catch (err) {
        return "";
    }
};

export { encodeStr };
