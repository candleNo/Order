$(document).ready( () => {


    $('#ok').bind('click', () => {
        var copy = {
            copyText : $("#copy").val(),
            copyVal: [],
            name: '',
            model: '',
            addr: '',
            tel: ''
        };

        copy.copyVal = copy.copyText.split('\n');
        for(var i=0; i<copy.copyVal.length; i++){
            switch (i){
                case 0:
                    copy.name = copy.copyVal[0].split('：')[1];
                    $('#name').val(copy.name);
                    break;
                case 1:
                    copy.model = copy.copyVal[1].split('：')[1];
                    $('#model').val(copy.model);
                    break;
                case 2:
                    copy.addr = copy.copyVal[2].split('：')[1];
                    $('#addr').val(copy.addr);
                    break;
                case 3:
                    copy.tel = copy.copyVal[3].split('：')[1];
                    $('#tel').val(copy.tel);
                    break;
            }
        }

    $('#copy').val('');
    });
});