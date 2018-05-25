$(document).ready(function() {

  //Get json data
  $.getJSON('products.json', function(data) {
    var products = {
       list:[]
    };

     //Store Json data in products's object array list
     $.each(data, function(idx,val) {
       products.list.push(val);
     });


     //Loop list array and store in Product's display variable
     function showProducts(array) {
        var res = '';
        $.each(array,function(idx,val) {
           res += "<li class=\"product\">";
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
        return res;
      }

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
       }//End filters

      //Call function and display
      var showRes = showProducts(products.list);

      $('.products-list').html(showRes);

      $('input[type=checkbox]').click(function() {

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

        var filtered = applyFilters(products.list, checkboxes);
        if(filtered.length < 1) {
          $('.col-md-10 h2').removeClass("hide");
        } else {
          $('.col-md-10 h2').addClass("hide");
        }

        var showFilteredRes = showProducts(filtered);
        $('.products-list').html(showFilteredRes);


     });//End Change function
   });//End click

        //Clear checkboxes and empty products display and checkboxes array
        $('form').submit(function(e) {
          e.preventDefault();
          $('input[type=checkbox]:checked').attr('checked',false);
          checkboxes = {};
          var res='';
          //Display products after filters are cleared
          var displayAfterClear = showProducts(products.list);
          $('.products-list').html(displayAfterClear);
        });

 }); //End  json

});//End Ready
