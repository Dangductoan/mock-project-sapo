package com.sapo.mockproject.utils;

public enum Regex2 {
    VIETNAMESE_NAME_REGEX("^[A-Za-z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$",
            "Tên không chứa số, ký tự đặc biệt"),
    CODE_REGEX("^[A-Z0-9]*$",
            "Mã chỉ chứa chữ hoa và số, không chứa dấu cách"),
    VIETNAMESE_ADDRESS_REGEX("^[A-Za-z0-9_,ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]*$",
            "Địa chỉ không chứa ký tự đặc biệt"),
    VIETNAM_PHONE_REGEX("((0|84)(9|3|7|8|5)+([0-9]{8})\\b)",
            "Số điện thoại không hợp lệ");

    private final String value;
    private final String defaultMessage;

    Regex2(String value, String defaultMessage) {
        this.value = value;
        this.defaultMessage = defaultMessage;
    }

    public String getValue() {
        return this.value;
    }

    public String getDefaultMessage() {
        return this.defaultMessage;
    }
}
