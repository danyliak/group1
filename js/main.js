$(function(){
    'use strict';

    $('#header').load('header.html');
    $('#footer').load('footer.html');

    var counterFrom = 0;
    var counterTo = 4;
    var countStep = 4;

    function drawProducts(from, to) {
        $.ajax({
            url: "item.json",
            contentType: "application/json; charset=utf-8",
            dataType: "text"
        }).done(function(products) {
            products = JSON.parse(products);
            var productLength = $(products).length;


             var productsSliced = products.slice(from, to);

            productsSliced.forEach(function(product) {

                var productTemplate = $("#productTempalte");
                var template = $(productTemplate.html());

                template.find("div.item-photo").css('backgroundImage', "url(" + product.photo + ")");
                template.find("div.hover-photo").css('backgroundImage', "url('img/item1.png')");
                template.find("p.dark-blue").text(product['name']);
                template.find("p.orange").text(product['price']+"$");

                $('<div></div>').append(template).appendTo("#arrive");
            });

            counterFrom = counterFrom + countStep;
            counterTo = counterTo + countStep;

            if( productLength < counterTo){
                $('.arrival-add').hide();
            }


        }).fail(function(e) {
            console.error(e);
        });
    }


    drawProducts(counterFrom, counterTo);



    $('.arrival-add').on('click', function () {
        drawProducts(counterFrom, counterTo);
    })



});