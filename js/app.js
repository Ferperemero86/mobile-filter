$(document).ready(function() {


  $.getJSON('products.json', function(data) {
    var mainProducts = {
       list:[]
    };

     $.each(data, function(idx,val) {
       mainProducts.list.push(val);
     });

     console.log(mainProducts);
     var showRes ='';

     $.each(mainProducts.list,function(idx,val) {
         showRes += "<li>";
         showRes += "<a href=\"#\" class=\"product-photo\">";
         showRes += "<img src=\"" + 'http:'+val.image.small+"\""+"height=\"130\""+"/>";
         showRes += "<a/>";
         showRes += "<h2><a href='#'>"+val.name+"</a></h2>";
         showRes += "<ul class=\"product-description\">";
         showRes += "<li><span>Manufacturer: </span>"+val.specs.manufacturer+"</li>";
         showRes += "<li><span>Storage:</span>"+val.specs.os+"</li>";
         showRes += "<li><span>Os:</span>"+val.specs.os+"</li>";
         showRes += "<li><span>Camera</span>"+val.specs.camera+"</li>";
         showRes += "<li><span>Description:</span>"+val.description+"</li>";
         showRes += "</ul>";
         showRes += "<p class=\"product-price\""+">Price: "+val.price+"</p>";
         showRes += "</li>";
     });

      $('.products-list').html(showRes);

   });//End Json

  //Get products objects from  JSON
  $.getJSON('products.json', function(data) {
    var products = {
      list: []
    };
     //Store products  in product's array
     $.each(data, function(idx,val) {
       products.list.push(val);
     });

     //Call function event when checkbox status changes
     $('input').change(function() {
        //Create objectfor taking all the checked checkboxes values
        var checkboxes = {};
        var value = $('input[type=checkbox]:checked');
        //Loop throw the checked checkboxes
        $.each(value,function(idx,val) {

           var valu = $(val).val();
           var clas = $(val)[0].className;
           //Insert properties in checkboxes object from checked boxes
           if(checkboxes[clas] === undefined) {
              checkboxes[clas] = [];
           }
           //Make string numbers integers
           if($.inArray(valu,checkboxes[clas]) === -1) {
              if(clas === 'storage' || clas === 'camera') {
                 checkboxes[clas].push(parseInt(valu));
              } else {
                 checkboxes[clas].push(valu);
              }

            }
          });//End each function


       function applyFilters(products,checkboxes) {
           //Get keys from chckboxes object
           var filterKeys = Object.keys(checkboxes)
              //Filter products array
              return products.filter(function(item) {
               //Test every filter value from the checked boxes matches products specs
                 return filterKeys.every(function(key) {
                   return  $.inArray(item.specs[key],checkboxes[key]) > -1;
                 });
              });
        }//end filters

        var filtered = applyFilters(products.list, checkboxes);
        if(filtered.length <1) {
          alert('no maches');
        }
        var showFilteredRes ='';

        $.each(filtered,function(idx,val) {
            showFilteredRes += "<li>";
            showFilteredRes += "<a href=\"#\" class=\"product-photo\">";
            showFilteredRes += "<img src=\"" + 'http:'+val.image.small+"\""+"height=\"130\""+"/>";
            showFilteredRes += "<a/>";
            showFilteredRes += "<h2><a href='#'>"+val.name+"</a></h2>";
            showFilteredRes += "<ul class=\"product-description\">";
            showFilteredRes += "<li><span>Manufacturer: </span>"+val.specs.manufacturer+"</li>";
            showFilteredRes += "<li><span>Storage:</span>"+val.specs.os+"</li>";
            showFilteredRes += "<li><span>Os:</span>"+val.specs.os+"</li>";
            showFilteredRes += "<li><span>Camera</span>"+val.specs.camera+"</li>";
            showFilteredRes += "<li><span>Description:</span>"+val.description+"</li>";
            showFilteredRes += "</ul>";
            showFilteredRes += "<p class=\"product-price\""+">Price: "+val.price+"</p>";
            showFilteredRes += "</li>";
        });

        $('.products-list').html(showFilteredRes);


     });// Change function

        //Clear checkboxes and empty products display and checkboxes array
        $('form').submit(function(e) {
          e.preventDefault();
          $('input[type=checkbox]:checked').attr('checked',false);
          checkboxes = {};
          var res='';
          $.each(products.list,function(idx,val) {
              res += "<li>";
              res += "<a href=\"#\" class=\"product-photo\">";
              res += "<img src=\"" + 'http:'+val.image.small+"\""+"height=\"130\""+"/>";
              res += "<a/>";
              res += "<h2><a href='#'>"+val.name+"</a></h2>";
              res += "<ul class=\"product-description\">";
              res += "<li><span>Manufacturer: </span>"+val.specs.manufacturer+"</li>";
              res += "<li><span>Storage:</span>"+val.specs.os+"</li>";
              res += "<li><span>Os:</span>"+val.specs.os+"</li>";
              res += "<li><span>Camera</span>"+val.specs.camera+"</li>";
              res += "<li><span>Description:</span>"+val.description+"</li>";
              res += "</ul>";
              res += "<p class=\"product-price\""+">Price: "+val.price+"</p>";
              res += "</li>";
          });
          $('.products-list').html(res);
        });

 }); //End  json

});//End Ready
