//header
$(document).ready(() => {
    var header = {
        menu_list: 'none',

        menu_list_show: (select,cover) => {
                select.show(200);
                cover.show();
                header.menu_list = 'block'
        },

        menu_list_hide: (select,cover) => {
                select.hide(200);
                cover.hide();
                header.menu_list = 'none';
        }
    };

    $('.menu').bind('click', () => {
        (header.menu_list == 'none')?header.menu_list_show($('.menu-list'),$('.cover')):header.menu_list_hide($('.menu-list'),$('.cover'));
    });
    $('.cover').bind('click', () => {
        header.menu_list_hide($('.menu-list'),$('.cover'));
    })
});

//main order edit
$(document).ready( () => {
    var order = {
        uid: null,

        order_menu_list_show: (select) => {
            select.show(200);
            order.uid = select.parents('.order').attr('uid');
        },
        order_menu_list_hide: (select) => {
            select.hide(200);
            order.uid = null;
        },

        order_edit_show: (select, modify) =>{
            select.show();
            select.prev().hide();
            modify.prev().hide();
            modify.show();
            order.order_menu_list_hide(select.parent());
        },

        order_edit_hide: (select, modify) =>{
            select.hide();
            select.prev().show();
            modify.hide();
            modify.prev().show();
            order.order_menu_list_hide(select.parent());
        }
    };

    //order menu
    $('.order-menu').bind('click', function() {
        if(order.uid == null){
            order.order_menu_list_show($(this).next());
        }else if(order.uid == $(this).parents('.order').attr('uid')){
            order.order_menu_list_hide($(this).next());
        }else{
            order.order_menu_list_hide($('[uid=' + order.uid + ']').children('.order-menu-box').children('.order-menu-list'));
            order.order_menu_list_show($(this).next());
        }
    });

    //order edit
    $('.order-notEdit>.edit').bind('click', function(){
        order.order_edit_hide($('.order-edit'),$('.modify'));
        order.order_edit_show($(this).parent().next(),$(this).parents('.order').children('.note').children('.modify'));
    });

    //order edit candle
    $('.order-edit>.cancel').bind('click', function(){
        order.order_edit_hide($(this).parent(),$(this).parents('.order').children('.note').children('.modify'));
    });

    //order edit complete
    $('.order-notEdit .complete').bind('click', function(){
        if(confirm('是否完成订单')){
            $.ajax({
                url: '/',
                type: 'post',
                data: {'type': 'complete','val': order.uid},
                headers: {"X-CSRFtoken" : $.cookie("csrftoken")},
                success: (data) => {
                    if(data == 'OK'){
                        location.replace('/');
                    }
                }
            })
        }else{
            order.order_menu_list_hide($(this).parent().parent())
        }

    });

    //order edit cancle
    $('.order-notEdit .cancel').bind('click', function() {
        if(confirm('是否终止订单')){
            $.ajax({
                url: '/',
                type: 'post',
                data: {'type': 'cancle', 'val': order.uid},
                headers: {"X-CSRFtoken" : $.cookie("csrftoken")},
                success: (data) => {
                    if(data == 'OK'){
                        location.replace('/');
                    }
                }
            })
        }else{
            order.order_menu_list_hide($(this).parent().parent())
        }
    });

    //order edit modify
    $('.order-edit .complete').bind('click', function() {
        var value = $(this).parents('.order').children('.note').children('.modify').children('input').val();
        console.log(value);
        if(confirm('是否修改订单')){
            $.ajax({
                url: '/',
                type: 'post',
                data: {'type': 'modify', 'val': order.uid, 'value': value},
                headers: {"X-CSRFtoken" : $.cookie("csrftoken")},
                success: (data) => {
                    if(data == 'OK'){
                        location.replace('/');
                    }
                }
            })
        }else{
            order.order_edit_hide($(this).parent(),$(this).parents('.order').children('.note').children('.modify'));
        }
    });

    //delete
    $('.order-edit .remove').bind('click', function() {
        console.log(order.uid);
       if(confirm('是否删除此订单')){
           $.ajax({
               url: '/',
               type: 'post',
               data: {'type': 'remove','val': order.uid},
               headers: {"X-CSRFtoken" : $.cookie("csrftoken")},
               success: (data) => {
                   if(data == 'OK'){
                       location.replace('/');
                   }
               }
           })
       }else{
           order.order_edit_hide($(this).parent(),$(this).parents('.order').children('.note').children('.modify'));
       }
    });
});

$(document).ready(() =>{
   var status = $('head').attr('status');
   if(status){
       $('.order-menu-box').hide();
   }
});