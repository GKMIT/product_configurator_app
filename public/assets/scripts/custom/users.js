function fetch_sales_persons(){
    var val = $("#sales_hub_id").val();
    $("#sales_person_id").html('<option>Fetching..</option>');
    $.get("/users/fetch_sales_persons/"+val, function(data) {
        var i;
        var response = '<option value="0">Select Sales Person</option>';
        for (i = 0; i < data.length; ++i) {
            obj = data[i];
            response += '<option value="'+obj.id+'">'+obj.user_name+'</option>';
        }
        $("#sales_person_id").html(response);
    });
    validate_number('sales_hub_id','Please select valid Sales Hub');
}

function fetch_tendering_teams(){
    var val = $("#product_lines_id").val();
    $("#tendering_teams_id").html('<option>Fetching..</option>');
    $.get("/users/fetch_tendering_teams/"+val, function(data) {
        var i;
        var response = '<option value="0">Select Tendering Team</option>';
        for (i = 0; i < data.length; ++i) {
            obj = data[i];
            response += '<option value="'+obj.id+'">'+obj.name+'</option>';
        }
        $("#tendering_teams_id").html(response);
    });
    validate_number('product_lines_id','Please select valid product line');
}

function fetch_tendering_teams_members(){
    var val = $("#tendering_teams_id").val();
    $("#tendering_teams_members_id").html('<option>Fetching..</option>');
    $.get("/users/fetch_tendering_teams_members/"+val, function(data) {
        var i;
        var response = '<option value="0">Select Tendering Team Member</option>';
        for (i = 0; i < data.length; ++i) {
            obj = data[i];
            response += '<option value="'+obj.id+'">'+obj.user_name+'</option>';
        }
        $("#tendering_teams_members_id").html(response);
    });
    validate_number('tendering_teams_id','Please select valid tendering team');
}

function fetch_sales_agents(){
    var val = $("#customer_country").val();
    $("#sales_agent").html('<option>Fetching..</option>');
    $.get("/users/fetch_sales_agents/"+val, function(data) {
        var i;
       var response = '<option value="0">Select Sales Agent</option>';
        for (i = 0; i < data.length; ++i) {
            obj = data[i];
            response += '<option value="'+obj.id+'">'+obj.name+'</option>';
        }
        $("#sales_agent").html(response);
    });
    validate_number('customer_country','Please select valid Customer country');
}

function fetch_plants_properties(){
    var val = $("#product_lines_id").val();

    $("#plants_id").html('<option>Fetching..</option>');
    $.get("/users/fetch_plants_properties/"+val, function(data) {
        var i;
        var mans = data.mandatory_properties[0].mandatory_properties.split(",");
        var response = '<option value="0">Select Production Plant</option>';
        for (i = 0; i < data.production_plants.length; ++i) {
            obj = data.production_plants[i];
            response += '<option value="'+obj.id+'" >'+obj.name+'</option>';
        }
        $("#plants_id").html(response);

        response ='<option value="0">Select Property</option>';
        for (i = 0; i < data.product_properties.length; ++i) {
            obj = data.product_properties[i];
            response += '<option value="'+obj.id+'" ';
            response += '>'+obj.property_name+'</option>';
        }
        $("#table_body .props").html(response);

        for (i = 0; i < mans.length; ++i) {
           $("#table_body .props").eq(i).find("option[value="+mans[i]+"]").attr('selected', 'selected');
           put_property_value(i);
        }

        $("#props_def").val(response);
        $("#man_table_body").val(data.mandatory_properties[0].mandatory_properties);
    });
    validate_number('product_lines_id','Please select valid product line');
}

function put_property_value(i){
     var prop_line = $("#table_body .props").eq(i).parent().parent();
    var val = $("#table_body .props").eq(i).val();
    var file_name = ''
     $.get('/users/fetch_unit/'+val, function(data) {
        if(data.success == "true"){
            prop_line.find('td').eq(1).html(data.properties[0].unit_of_measurement);
             var td_target = prop_line.find('.value_in').parent();
            if(data.value.length > 0){
                var text = '<select id="value" name="value[]" class="form-control value_in" data-type="'+data.properties[0].data_type+'">';
                var j = 0;
                for (j=0; j < data.value.length; ++j) {
                    text += '<option value='+data.value[j].id+'>'+data.value[j].name+'</option>';
                }
                text += '</select>';
                td_target.html(text);
             } else {
                td_target.find('.value_in').removeAttr('data-type');
                td_target.find('.value_in').attr('data-type',data.properties[0].data_type);
            }
        }
    });
}

function fetch_plants_properties_pop(){
    var val = $("#product_lines_id_pop").val();

    $("#plants_id_pop").html('<option>Fetching..</option>');
    $.get("/users/fetch_plants_properties/"+val, function(data) {
        var i;
        var mans = data.mandatory_properties[0].mandatory_properties.split(",");

        var response = '<option value="0">Select Production Plant</option>';
        for (i = 0; i < data.production_plants.length; ++i) {
            obj = data.production_plants[i];
            response += '<option value="'+obj.id+'">'+obj.name+'</option>';
        }
        $("#plants_id_pop").html(response);

        response ='<option value="0">Select Property</option>';
        for (i = 0; i < data.product_properties.length; ++i) {
            obj = data.product_properties[i];
            response += '<option value="'+obj.id+'">'+obj.property_name+'</option>';
        }
        $("#table_body_pop .props").html(response);

        for (i = 0; i < mans.length; ++i) {
           $("#table_body_pop .props").eq(i).find("option[value="+mans[i]+"]").attr('selected', 'selected');
           put_property_value(i);
        }

        $("#props_def_pop").val(response);
        $("#man_table_body_pop").val(data.mandatory_properties[0].mandatory_properties);

    });
    validate_number('product_lines_id_pop','Please select valid product line');
}

function rfq_pro_save(type, rfq_id){
    var val = $("#rfq_pro_form").serialize();
    var flag2 = validate_number('tendering_teams_id','Please select valid Tendering team');
    var flag3 = validate_number('tendering_teams_members_id','Please select valid Tendering team member');
    if(  flag2 && flag3  ){
        $("#btn_save_pro_data").removeAttr("onclick");
        $("#btn_next_pro_data").removeAttr("onclick");
        if(type == 1){
            $("#btn_save_pro_data").html("Saving.. Please Wait");
            val += '&rfq_status_id=1';
            $.post("/users/save_rfq_product_data/"+rfq_id,val, function(data) {
                if(data.success == "true"){
                    $("btn_save_pro_data").html("Data Saved");
                    window.location.replace("/users/");
                } else {
                    bootbox.alert(data.message);
                }
            });
        } else {
             $("#btn_next_pro_data").html("Saving.. Please Wait");
             val += '&rfq_status_id='+ $("#rfq_stat").val();
              $.post("/users/save_rfq_product_data/"+rfq_id,val, function(data) {
                if(data.success == "true"){
                    $("btn_save_pro_data").html("Proceeding..");
                    window.location.replace("/users/rfq_line_items/"+rfq_id);
                } else {
                    bootbox.alert(data.message);
                }
            });
        }
    }
}

function rfq_gen_save(type, rfq_id){

    var val = $("#rfq_gen_form").serialize();

    if(rfq_id !=0 && typeof rfq_id != "undefined"){
        var file_name = '/users/update_rfq_general_data';
        val += '&rfq_id='+rfq_id;
    } else {
        var file_name = '/users/newrfq';
    }

    var flag1 = validate_number('sales_hub_id','Please select valid Sales Hub');var flag2 = validate_number('customer_country','Please select valid Customer country');var flag3 = validate_number('customers_id','Please select valid Customer');var flag4 = validate_number('sales_person_id','Please select valid Sales Person');var flag5 = validate_number('type_of_quote_id','Please select valid Quote');var flag6 = validate_number('sales_segments_id','Please select valid Sales Segments');var flag7 = validate_number('probability','Please select valid Probability');var flag8 = validate_date('date_rfq','Please select valid Date');var flag9 = validate_number('product_lines_id','Please select valid Product Line');
    if( flag7 && flag6 && flag5 && flag4 && flag3 && flag2 && flag1 && flag8 && flag9  ){
        $("#btn_save").removeAttr("onclick");
        $("#btn_next").removeAttr("onclick");
        if(type == 1){
            $("#btn_save").html("Saving.. Please Wait");
            val += '&rfq_status_id=1';
            $.post(file_name,val, function(data) {
                if(data.success == "true"){
                    $("btn_save").html("Data Saved");
                    window.location.replace("/users/");
                } else {
                    bootbox.alert(data.message);
                }
            });
        } else {
             $("#btn_next").html("Saving.. Please Wait");
                val += '&rfq_status_id='+$("#rfq_stat").val();
              $.post(file_name,val, function(data) {
                if(data.success == "true"){
                    $("btn_save").html("Proceeding..");
                    // alert("/users/rfq_product_data/"+data.rfq_id);
                    window.location.replace("/users/rfq_product_data/"+data.rfq_id);
                } else {
                    bootbox.alert(data.message);
                }
            });
        }
    }
}

function delete_line_item(line_item){
    $("#line_item_"+line_item+" .dark").html('Deleting');

    $.post("/users/delete_line_item",{ rfq_lines_id: line_item}, function(data) {
        if(data.statusCode == 200){
            $("#row_line_item_"+line_item).hide("slow", function(){
                $("#row_line_item_"+line_item).remove();
            });
        } else {
            bootbox.alert(data.message);
        }
    });
}

function variant_line_item(line_item){
    $(this).html('Generating');

    $.post("/users/variant_to",{ rfq_lines_id: line_item}, function(data) {
        if(data.statusCode == 200){
            $(this).html('Variant');
            window.location.reload(true);
            //$("#row_line_item_"+line_item).hide("slow", function(){
            //    window.location.reload(true);
            //});
        } else {
            bootbox.alert(data.message);
        }
    });
}

function edit_line_item(rfq_id,line_item){
    $(".modal-body").html("Loading..");
    $.get("/users/fetch_rfq_line_items/"+rfq_id+"/"+line_item, function(data) {
         $(".modal-body").html(data);
         initialize();
    });
}

function rfq_line_save(type, rfq_id){
    var val = $("#rfq_line_form").serialize();
    val = val.replace(/&remark%5B%5D=&/g, '&remark%5B%5d= &');
    var file_name = '/users/save_line_item/'+rfq_id;

    var flag1 = validate_number('product_lines_id','Please select valid Product Line');
    var flag3 = validate_number('number_of_units','Please input number of units');
    var flag4 = validate_date('delivery_date','Please select valid Date');
    var flag5 = validate_tech('table_body');
    if( flag4 && flag3 && flag1 && flag5 ){
        if(type == 1){
            $("#btn_save").html("Saving.. Please Wait");
            val += '&rfq_status_id=1';
            $.post(file_name,val, function(data) {
                if(data.success == "true"){
                    $("btn_save").html("Data Saved");
                    window.location.replace("/users/");
                } else {
                    bootbox.alert(data.message);
                }
            });
        } else if(type == 2) {
             $("#btn_add_more").html("Saving.. Please Wait");
                val += '&rfq_status_id='+$("#rfq_stat").val();
              $.post(file_name,val, function(data) {
                if(data.success == "true"){
                    $("btn_add").html("Proceeding..");
                    window.location.replace("/users/rfq_line_items/"+ rfq_id);
                } else {
                    bootbox.alert(data.message);
                }
            });
        }

    }
}

function validate_tech(table_name){
    var i =0;
    var value;
    var mans = $("#man_"+table_name).val().split(',');

    $( "#"+table_name+' .props').each(function() {
        //alert($(this).val());
      if(mans.indexOf($(this).val()) != -1) {
        var r = mans.indexOf($(this).val());
        mans.splice(r,1);
      }
    });

    if(mans.length > 0){
        bootbox.alert("Please fill mandatory technical properties ");
        return false;
    }
    var flag = true;
    var alttext = '';

    $( "#"+table_name+' .props').each(function() {
      var input_box = $(this).parent().parent().find('td').eq(2).find('.value_in');
      var datatype = input_box.attr('data-type');
      var value = input_box.val();

      if(datatype == 'number'){
        if (value.match(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/) == null || value == 0){
            input_box.parent().addClass('has-error');
            flag = false;
            alttext += $(this).find('option:selected').text() + ' must be a valid number <br>';
        }
      } else if(datatype == 'string') {
        if (value == ''){
            input_box.parent().addClass('has-error');
            flag = false;
            alttext += $(this).find('option:selected').text() + ' must be a valid string <br>';
        }  
      }
    
    });
 
    if(flag == true) return true;
    else {
        bootbox.alert(alttext);
        return false;
    }

}

function update_line_items(line_item_id){
    var val = $("#rfq_line_edit_form").serialize();
    val = val.replace(/&remark%5B%5D=&/g, '&remark%5B%5d= &');
    var file_name = '/users/update_line_item/'+line_item_id;

    var flag1 = validate_number('product_lines_id_pop','Please select valid Product Line');
    var flag3 = validate_number('number_of_units_pop','Please input number of units');
    var flag4 = validate_date('delivery_date_pop','Please select valid Date');
    var flag5 = validate_tech('table_body_pop');
    if( flag4 && flag3 && flag1 && flag5 ){
        $("#btn_update").html("Updating.. Please Wait");
        $.post(file_name,val, function(data) {
            if(data.success == "true"){
                $('#close_btn').trigger('click');
                if(Integer.parseInt($("#variant_to").val())>0){
                    $("#row_line_item_"+line_item_id).find('td').eq(0).html($("#product_lines_id_pop").find('option:selected').text()+"<span class='badge label-warning'>V</span>");
                }
                else{
                    $("#row_line_item_"+line_item_id).find('td').eq(0).html($("#product_lines_id_pop").find('option:selected').text());
                }
                console.log($("#row_line_item_"+line_item_id).find('td'));

                $("#row_line_item_"+line_item_id).find('td').eq(1).html($("#number_of_units_pop").val());
                $("#row_line_item_"+line_item_id).find('td').eq(2).html($("#delivery_date_pop").val());
            } else {
                bootbox.alert(data.message);
            }
        });
    }
}


function rfq_complete(rfq_id){

    var file_name = '/users/rfq_complete/'+rfq_id;
    $("#btn_complete").html("Processing..");
    
      $.post(file_name,{rfq_status_id:2}, function(data) {
        if(data.success == "true"){
            window.location.replace("/users/");
        } else {
            bootbox.alert(data.message);
            $("#btn_complete").html("Complete RFQ");

        }
    });
}

function rfq_save_for_now(rfq_id){

    var file_name = '/users/rfq_complete/'+rfq_id;
    $("#btn_save").html("Saving.. Please Wait");
    
      $.post(file_name,{rfq_status_id:1}, function(data) {
        if(data.success == "true"){
            window.location.replace("/users/");
        } else {
            bootbox.alert(data.message);
            $("#btn_save").html("Save For Now");

        }
    });
}

function validate_number(id_info, alttext, parent_up){
    var value = $("#"+id_info).val();
    var errorspan = $("#"+id_info).parent().find('span');
    
    if(parent_up == 1) var parent = $("#"+id_info).parent();
    else var parent = $("#"+id_info).parent().parent();

    if (value.match(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/) == null || value == 0){
        errorspan.text(alttext);
        parent.addClass("has-error");
        return false;
    }
    else {
        errorspan.text("");
        parent.removeClass("has-error");
        return true;
    }
}

function validate_date(id_info, alttext){
    var value = $("#"+id_info).val();
    var errorspan = $("#"+id_info).parent().find('span');
    var parent = $("#"+id_info).parent().parent();
    if(value.match(/^\d{2}-\d{2}-\d{4}$/) == null){
        errorspan.text(alttext);
        parent.addClass("has-error");
        return false;
    }
    else {
        errorspan.text("");
        parent.removeClass("has-error");
        return true;
    }
}

function validate_email(id_info, alttext){
    var value = $("#"+id_info).val();
    var errorspan = $("#"+id_info).parent().find('span');
    var parent = $("#"+id_info).parent().parent();

    if(value.match(/([\w\-]+\@[\w\-]+\.[\w\-]+)/) == null){
        errorspan.text(alttext);
        parent.addClass("has-error");
        return false;
    }
    else {
        errorspan.text("");
        parent.removeClass("has-error");
        return true;
    }
}


function validate_entry(id_info, alttext){
    var value = $("#"+id_info).val();
    var errorspan = $("#"+id_info).parent().find('span');
    var parent = $("#"+id_info).parent().parent();
    
    if(value.match(/^.+$/) == null){
        errorspan.text(alttext);
        parent.addClass("has-error");
        return false;
    }
    else {
        errorspan.text("");
        parent.removeClass("has-error");
        return true;
    }
}

function add_more_line_items(id_info){
    if(id_info == 'table_body'){
        var val = $("#props_def").val();
    } else {
        var val = $("#props_def_pop").val();
    }

    $("#"+id_info).append('<tr><td><select id="product_properties_id" name="product_properties_id[]" class="props form-control">'+ val +'</select></td><td></td><td><input id="value" name="value[]" class="form-control value_in "></td><td><input id="remark" name="remark[]" class="form-control"></td><td><a href="javascript:;" class="btn dark icn-only remove_prop"><i class="fa fa-times"></i></a></td></tr>');
    initialize();   
}

$(document).on('click','.remove_prop', function() {
    var prop_line = $(this).parent().parent();
        bootbox.confirm("Are you sure to delete property?", function(result) {
          if(result){
            prop_line.hide("slow", function(){
                prop_line.remove();
            });
          }
        });
});

$(document).on('keyup','.value_in', function() {
    $(this).parent().removeClass('has-error');
});

$(document).on('change','input[name=is_bid]', function() {
    if($(this).val() == 0){
        $("#remark").slideDown();
    } else {
        $("#remark").slideUp();
    }
});


$(document).on('change','.props', function() {
    var prop_line = $(this).parent().parent();
    var val = $(this).val();
    var file_name = '/users/fetch_unit/'
     $.get(file_name+val, function(data) {
        if(data.success == "true"){
            prop_line.find('td').eq(1).html(data.properties[0].unit_of_measurement);
            var td_target = prop_line.find('.value_in').parent();
            if(data.value.length > 0){
                var text = '<select id="value" name="value[]" class="form-control value_in" data-type="'+data.properties[0].data_type+'">';
                var j = 0;
                for (j=0; j < data.value.length; ++j) {
                    text += '<option value='+data.value[j].id+'>'+data.value[j].name+'</option>';
                }
                text += '</select>';
            } else {
                 var text = '<input id="value" name="value[]" class="form-control value_in" data-type="'+data.properties[0].data_type+'">';
            }
            td_target.html(text);
        } else {
            bootbox.alert('Invalid Property');
        }
    });
});

function initialize(){
    ComponentsPickers.init();
    $(function() {

    $.extend($.tablesorter.themes.bootstrap, {
        // these classes are added to the table. To see other table classes available,
        // look here: http://twitter.github.com/bootstrap/base-css.html#tables
        table      : 'table table-bordered',
        header     : 'bootstrap-header', // give the header a gradient background
        footerRow  : '',
        footerCells: '',
        icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
        sortNone   : 'bootstrap-icon-unsorted',
        sortAsc    : 'fa fa-chevron-up',
        sortDesc   : 'fa fa-chevron-down',
        active     : '', // applied when column is sorted
        hover      : '', // use custom css here - bootstrap class may not override it
        filterRow  : '', // filter row class
        even       : '', // odd row zebra striping
        odd        : ''  // even row zebra striping
    });

    // call the tablesorter plugin and apply the uitheme widget
    $(".tablesorter").tablesorter({
        // this will apply the bootstrap theme if "uitheme" widget is included
        // the widgetOptions.uitheme is no longer required to be set
        theme : "bootstrap",
        widthFixed: true,
        dateFormat : "ddmmyyyy",

        headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!

        // widget code contained in the jquery.tablesorter.widgets.js file
        // use the zebra stripe widget if you plan on hiding any rows (filter widget)
        widgets : [ "uitheme", "filter", "zebra" ],

        widgetOptions : {
            // using the default zebra striping class name, so it actually isn't included in the theme variable above
            // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
            zebra : ["even", "odd"],

            // reset filters button
            filter_reset : ".reset"

            // set the uitheme widget to use the bootstrap theme class names
            // this is no longer required, if theme is set
            // ,uitheme : "bootstrap"

        },
        headers: {
            0:{
                // disable it by setting the property sorter to false
                sorter: false
            }
        }
        }).tablesorterPager({

            // target the pager markup - see the HTML block below
            container: $(".ts-pager"),

            // target the pager page select dropdown - choose a page
            cssGoto  : ".pagenum",

            // remove rows from the table to speed up the sort of large tables.
            // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
            removeRows: false,

            // output string - default is '{page}/{totalPages}';
            // possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
            output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'

        });
    });
}

function save_questions(rfq_id,type){
    var val = $("#rfq_questions").serialize();
    $("#save_bid").removeAttr("onclick");
    $("#save_nobid").removeAttr("onclick");
    if(type == 1){
        $("#save_bid").html("Saving.. Please Wait");
    } else {
        $("#save_nobid").html("Saving.. Please Wait");
    }
    
    $.post("/users/save_questions/"+rfq_id,val, function(data) {
        if(data.success == "true"){
            if(type == 1){
                window.location.replace("/users/bid_rfq/"+rfq_id);
            } else{
                window.location.replace("/users/no_bid_rfq/"+rfq_id);
            }
        } else {
            bootbox.alert(data.message);
        }
    });
}

function rfq_submit_tender(rfq_id){

    var flag1 = validate_number('estimated_sales_price','Please input a valid number');
    if(flag1){
         $.post("/users/rfq_submit_bid/"+rfq_id,{estimated_sales_price:$("#estimated_sales_price").val()}, function(data) {
            $("#btn_submit").html("Saving.. Please Wait");
             $("#btn_submit").removeAttr("onclick");
            if(data.success == "true"){
                window.location.replace("/users/");
            } else {
                bootbox.alert(data.message);
            }
        });
    }
}

function close_document(rfq_id){
    var val = $("#no_bid_form").serialize();
    var file_name = "/users/rfq_submit_no_bid/"+rfq_id;

    var flag1 = validate_number('rejection_remarks_id','Please select valid Remark');
    var flag2 = validate_number('estimated_sales_price','Please input a valid number');
    if( flag2 && flag1 ){

        $("#btn_close").removeAttr("onclick");
        $("#btn_close").html("Saving.. Please Wait");

        $.post(file_name,val, function(data) {
            if(data.success == "true"){
                window.location.replace("/users/");
            } else {
                bootbox.alert(data.message);
            }
        });
    }
}

function product_designs(rfq_id,rfq_lines_id){
    //alert(complexity_id);
    $("#select_btn").hide();
    $(".modal-title").html('Select Product Design');
    $("#select_btn").removeAttr('onclick');
    $(".modal-body").html('Loading..');
    $("#select_btn").attr('onclick','select_design('+rfq_id+','+rfq_lines_id+')');

    
    var tableform= $("#property_table_"+rfq_lines_id);
    var plants_id= $("#plants_id_"+rfq_lines_id).val();
    var jsonArr = [];
    var flag = true;
    $( "#property_table_"+rfq_lines_id+' input[type=checkbox]').each(function() {
            
            var alttext = '';
            if($(this).is(':checked')){
              var parent_element = $(this).parent().parent();
              var input_box = parent_element.find('td').eq(4).find('.value_in');
              var datatype = input_box.attr('data-type');
              var value = input_box.val();
              var prop = input_box.attr('prop-name');

            if(datatype == 'number'){
                if (value.match(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/) == null || value == 0){
                    input_box.parent().addClass('has-error');
                    flag = false;
                    alttext += prop + ' must be a valid number <br>';
                }
              } else if(datatype == 'string') {
                if (value == ''){
                    input_box.parent().addClass('has-error');
                    flag = false;
                    alttext += prop + ' must be a valid string <br>';
                }  
              }

              if(flag == true){
                jsonArr.push({
                    id: parent_element.find('.property_id').val(),
                    value: parent_element.find('.value_in').val()
                });
                } else {
                    bootbox.alert(alttext);
                } 
                
            }
    });

    if(flag == true){
        $.post("/users/product_designs/"+rfq_id+"/"+rfq_lines_id,{properties:jsonArr,plants_id:plants_id}, function(data) {
           if(data.success == 'false'){
            $(".modal-body").html(data.message);
           } else {
                $("#select_btn").show();
                $(".modal-title").html("Select Product Design");
                $(".modal-body").html(data);
           }
        });
    }
}
 
function select_design(rfq_id, rfq_lines_id){
    var design_id = $("input[name='product_design']:checked").val();
    $("#close_btn").trigger('click');
    $("#product_design_details_"+rfq_lines_id).html('Loading..');
   // alert(design_id+"/"+rfq_lines_id+"/"+plants_id+"/"+complexity_id);
    $.get("/users/product_designs_details/"+design_id+"/"+rfq_lines_id, function(data) {
        $("#plants_id_"+rfq_lines_id).attr('disabled', 'disabled');
        $("#product_design_details_"+rfq_lines_id).html(data);
        $("#product_design_details_"+rfq_lines_id).append('<a href="javascript:;" class="btn green submit_sales" onclick="submit_sales('+rfq_id+','+rfq_lines_id+')">Submit</a>&nbsp;&nbsp;<a href="javascript:;" class="btn yellow reset_initial" onclick="reset_initial('+rfq_id+','+rfq_lines_id+')">Reset</a>');

        $("#property_table_"+rfq_lines_id).find('#add_more').remove();
    });
}
 
// $(document).on('click','input[name="product_design"]', function() {
//     $(this).parent().find('input[name="product_cost"]').attr('checked', 'checked');
// });
 
$(document).on('click','.choose_btn', function() {
    var portlet = $(this).parent().parent().find('.portlet-body');
 
    if(portlet.hasClass('portlet-open')){
        portlet.slideUp();
        portlet.removeClass('portlet-open');
    } else {
        portlet.slideDown();
        portlet.addClass('portlet-open');
    }
});
 
 
// $(document).on('click','.submit_sales', function() {
//     var form_element = $(this).parent();
//     var val = form_element.serialize();
//     alert(val);
// });
 
function submit_sales(rfq_id, rfq_lines_id){
    var design_id = $("#product_design_details_"+rfq_lines_id).find('input[name="design_id_sel"]').val();
    var material_cost = $("#product_design_details_"+rfq_lines_id).find('input[name="material_cost"]').val();
    var labor_cost = $("#product_design_details_"+rfq_lines_id).find('input[name="labor_cost"]').val();
    var labor_hours = $("#product_design_details_"+rfq_lines_id).find('input[name="labor_hours"]').val();
    var sales_price = $("#product_design_details_"+rfq_lines_id).find('input[name="sales_price"]').val();
    var no_weeks = $("#product_design_details_"+rfq_lines_id).find('input[name="weeks_sel"]').val();
    labor_cost = labor_cost.replace(/,/g, '');

    var tableform= $("#property_table_"+rfq_lines_id);

    var jsonArr = [];
    $( "#property_table_"+rfq_lines_id+' input.prop_id').each(function() {
        var parent_element = $(this).parent().parent();
        if(parent_element.find('.property_id').val() != 0) {
            jsonArr.push({
                id: $(this).val(),
                property_id: parent_element.find('.property_id').val(),
                value: parent_element.find('.value_in').val(),
                remark: parent_element.find('input.remark').val()
            });
        }
    });

    var flag1 = validate_number('product_design_details_'+rfq_lines_id+' #sales_price','Please select valid Sales price',1);
    var flag2 = validate_number('product_design_details_'+rfq_lines_id+' #weeks_sel','Please select valid no of weeks',1);
    var flag3 = validate_tender_tech(rfq_lines_id);
 
    if(flag1 && flag2 && flag3){
        $("#product_design_details_"+rfq_lines_id).find('.submit_sales').html('Processing..');

        $.post("/users/submit_to_sales", {rfq_id:rfq_id, rfq_lines_id:rfq_lines_id, product_designs_id:design_id, sales_price:sales_price, confirmed_delivery_date:no_weeks, material_cost:material_cost, labor_cost:labor_cost, no_of_labor_hours:labor_hours, properties:jsonArr}, function(data) {
            if(data.success == 'true'){
                
                var portlet_design = $("#product_design_details_"+rfq_lines_id).parent().parent();
                portlet_design.removeClass('red').addClass('green');
                portlet_design.find('.portlet-body').slideUp();
                portlet_design.find('.portlet-body').removeClass('portlet-open');
                portlet_design.find('.portlet-title .choose_btn').html(data.product_designs[0].design_number);
                
                $("#product_design_details_"+rfq_lines_id).find('input[name="sales_price"]').parent().html(sales_price);
                
                $("#product_design_details_"+rfq_lines_id).find('input[name="sales_price_per_unit"]').parent().parent().hide();
                $("#product_design_details_"+rfq_lines_id).find('#min_price_per_unit').hide();

                $("#product_design_details_"+rfq_lines_id).find('input[name="weeks_sel"]').parent().html(no_weeks);
                $("#product_design_details_"+rfq_lines_id).find('.submit_sales').remove();
                $("#product_design_details_"+rfq_lines_id).find('.reset_initial').remove();
                $("#product_design_details_"+rfq_lines_id).append('<a href="javascript:;" onclick="product_designs_reset('+rfq_id+','+rfq_lines_id+')" class="btn yellow reset">Reset</a>');


 
            } else{
                bootbox.alert(data.message);
            }
        });
    }
}
 
function product_designs_reset(rfq_id, rfq_lines_id){
    $("#product_design_details_"+rfq_lines_id).parent().parent().removeClass('green').addClass('red');
    $("#product_design_details_"+rfq_lines_id).find('.reset').html('Processing..');
    
    var tableform= $("#property_table_"+rfq_lines_id);

    var jsonArr = [];
    $( "#property_table_"+rfq_lines_id+' input.prop_id').each(function() {
        var parent_element = $(this).parent().parent();
        jsonArr.push({
            id: $(this).val(),
            property_id: parent_element.find('.property_id').val(),
            value: parent_element.find('.value_in').val(),
            remark: parent_element.find('input.remark').val()
        });
    });

    $.post("/users/submit_to_sales", {rfq_id:rfq_id, rfq_lines_id:rfq_lines_id, product_designs_id:0, sales_price:0, confirmed_delivery_date:0,material_cost:0, labor_cost:0, no_of_labor_hours:0, properties: jsonArr}, function(data) {
        if(data.success == 'true'){
            var portlet_design = $("#product_design_details_"+rfq_lines_id).parent().parent();
             $("#product_design_details_"+rfq_lines_id).html('<a href="#basic" data-toggle="modal" onclick="product_designs('+rfq_id+','+rfq_lines_id+')" class="btn blue">Apply Filters</a>');
                portlet_design.find('.portlet-title .choose_btn').html('Choose');

                $("#property_table_"+rfq_lines_id).append('<div class="row"><div class="com-md-12"><a id="add_more" href="javascript:;" style="margin-bottom:20px;margin-left:15px;" onclick="add_more_props(\'property_tbody_'+rfq_lines_id+'\',1)" class="btn purple">Add More Properties</a></div></div>');

        } else{
            bootbox.alert(data.message);
        }
    });
}

function request_designs(rfq_id){
    var flag1 = validate_date('design_require_date','Please select valid Date');
    if(flag1) {
        var jsonArr = [];
        var i = 0;

        $("input.rfq_line:checked").each(function () {
            jsonArr.push({
                id: $(this).val()
            });
            i++;
        });

        if(i > 0){
            $.post("/users/request_designs/"+rfq_id,{line_items:jsonArr, design_require_date:$("#design_require_date").val()}, function(data) {
               if(data.success == 'false'){
                bootbox.alert(data.message);
               } else {
                    location.reload();
               }
            });
        } else {
            bootbox.alert('Please select line item(s)');
        }
    }


}

function submit_to_sales_final(rfq_id){
 
    $("#submit_to_sales_final").html('Processing..');
    $.post("/users/submit_to_sales_final", {rfq_id:rfq_id}, function(data) {
        if(data.success == 'true'){
            window.location.replace("/users/tendering_quote");
        } else{
            bootbox.alert(data.message);
        $("#submit_to_sales_final").html('Submit to Sales');

        }
    });
}

function reset_initial(rfq_id, rfq_lines_id){
    $("#plants_id_"+rfq_lines_id).removeAttr('disabled');
    $("#product_design_details_"+rfq_lines_id).html('<a href="#basic" data-toggle="modal" onclick="product_designs('+rfq_id+','+rfq_lines_id+')" class="btn blue">Apply Filters</a>');

    $("#property_table_"+rfq_lines_id).append('<div class="row"><div class="com-md-12"><a id="add_more" href="javascript:;" style="margin-bottom:20px;margin-left:15px;" onclick="add_more_props(\'property_tbody_'+rfq_lines_id+'\',1)" class="btn purple">Add More Properties</a></div></div>');

}

function minimum_price_ui(rfq_lines_id,product_design_id){
    $("#select_btn").show();
    $("#basic .modal-title").html("Select Minimum Price");
    $("#basic .modal-body").html("Loading..");
    $("#select_btn").removeAttr('onclick');
    $.get("/users/minimum_price_ui/"+rfq_lines_id+"/"+product_design_id, function(data) {
        $("#basic .modal-body").html(data);
        $("#select_btn").attr('onclick','put_minimum_value('+rfq_lines_id+','+product_design_id+')');

    });
}

$(document).on('click','.check_input', function() {
    var tr_body = $(this).parent().parent();
    if(!this.checked){
        tr_body.find('input[type="text"]').removeAttr('name');
    } else {
        tr_body.find('input[type="text"]').attr('name','value');
    }
    
});

function put_minimum_value(rfq_lines_id, product_design_id){
    $("#select_btn").html('Processing..');
    var val = $("#minimum_price_form").serialize();
    $.post("/users/put_minimum_price/"+rfq_lines_id+"/"+product_design_id, val, function(data) {
        if(data.success == "true"){
            $("#product_design_details_"+rfq_lines_id).find("#sales_price_per_unit").val($("#minimum_sales_price_to_customer").val());
            $("#product_design_details_"+rfq_lines_id).find("#sales_price").val($("#total_minimum_sales_price_to_customer").val());
            
            validate_number('product_design_details_'+rfq_lines_id+' #sales_price','Please select valid Sales Price',1);

            $("#close_btn").trigger('click');
            $("#select_btn").html('Select');
        } else {
            alert(data.message);
        }
    });
    

}

function view_quote(rfq_id){
   $(".modal-title").html("Full Quote");
   $(".modal-body").html("Loading..");

    $.get("/users/view_quote/"+rfq_id, function(data) {
        $(".modal-body").html(data);
    });  
}

function add_more_props(id_info, product_lines_id){

    $.get("/users/fetch_plants_properties/"+product_lines_id, function(data) {
        var i;

        response ='<option value="0">Select Property</option>';
        for (i = 0; i < data.product_properties.length; ++i) {
            obj = data.product_properties[i];
            response += '<option value="'+obj.id+'" ';
            response += '>'+obj.property_name+'</option>';
        }

        // $("#"+id_info).append('<tr><td><a href="javascript:;" class="btn dark icn-only remove_prop"><i class="fa fa-times"></i></a></td><td></td><td><select id="property_id" name="property_id[]" class="props form-control">'+ response +'</select></td><td></td><td><input id="value" name="value" class="form-control value_in "></td><td><input id="remark" name="remark[]" class="form-control"></td></tr>');

        $("#"+id_info).append('<tr><td><a href="javascript:;" class="btn dark icn-only remove_prop"><i class="fa fa-times"></i></a></td><td></td><td><select id="property_id" name="property_id[]" class="tender_props form-control property_id">'+ response +'</select><input type="hidden" name="prop_id[]" value="0" class="prop_id"></td><td></td><td><input type="text" name="value" value="" class="form-control value_in"></td><td><input type="text" name="remark[]" value="" class="form-control remark"></td></tr>');
    });
 
}

$(document).on('change','.tender_props', function() {
    var prop_line = $(this).parent().parent();
    var val = $(this).val();
    var file_name = '/users/fetch_unit/'
     $.get(file_name+val, function(data) {
        if(data.success == "true"){
            prop_line.find('td').eq(3).html(data.properties[0].unit_of_measurement);
            prop_line.find('td').eq(1).html('<input type="checkbox" name="property[]" value="'+data.properties[0].id+'" checked="">');

            var td_target = prop_line.find('.value_in').parent();
            if(data.value.length > 0){
                var text = '<select id="value" name="value" class="form-control value_in" data-type="'+data.properties[0].data_type+'" prop-name="'+data.properties[0].property_name+'">';
                var j = 0;
                for (j=0; j < data.value.length; ++j) {
                    text += '<option value='+data.value[j].id+'>'+data.value[j].name+'</option>';
                }
                text += '</select>';
            } else {
                 var text = '<input id="value" name="value" class="form-control value_in" data-type="'+data.properties[0].data_type+'" prop-name="'+data.properties[0].property_name+'">';
            }
            td_target.html(text);
        } else {
            bootbox.alert('Invalid Property');
        }
    });
});

function validate_tender_tech(rfq_lines_id){

    var flag = true;
    var alttext = '';
   

    $( "#property_table_"+rfq_lines_id+' table .tender_props').each(function() {
      var input_box = $(this).parent().parent().find('td').eq(4).find('.value_in');
      var datatype = input_box.attr('data-type');
      var value = input_box.val();
      var prop = input_box.attr('prop-name');

      if(datatype == 'number'){
        if (value.match(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/) == null || value == 0){
            input_box.parent().addClass('has-error');
            flag = false;
            alttext += prop + ' must be a valid number <br>';
        }
      } else if(datatype == 'string') {
        if (value == ''){
            input_box.parent().addClass('has-error');
            flag = false;
            alttext += prop + ' must be a valid string <br>';
        }  
      }
    
    });
    

    if(flag == true) return true;
    else {
        bootbox.alert(alttext);
        return false;
    }

}
function finalize_rfq(type,rfq_id){
    var val = $("#quote_finalize").serialize();
    var prob = $("#probability").val();
    var flag1 = validate_date('quote_validity_date','Please select valid Date');
    var flag4 = validate_number('sales_price','Please put valid price');
    if(type == 1){
         if( flag1  && flag4 ){
            if(prob == 6){
                var flag2 = validate_number('rejection_remarks_id','Please select a valid remark');
                var flag5 = validate_number('won_gross_sale','Please input a valid number');

            } else if(prob == 1){
                var flag2 = validate_number('won_gross_sale','Please input a valid number');
                var flag5 = true;
            }else {
                var flag2 = true;
                var flag5 = true;
            }
            if(flag2 && flag5){
                $("#finalize_rfq").html("Saving.. Please Wait");
                $.post("/users/save_finalize_quote/"+rfq_id+"/6",val, function(data) {
                    if(data.success == "true"){
                        window.location.replace("/users/quote_finalize");
                    } else {
                        bootbox.alert(data.message);
                    }
                });
            }
        }
    } else {
        var prob = $("#probability").val();

        if(prob == 1 || prob == 6){
            if(prob == 1){
               var flag2 = validate_number('won_gross_sale','Please input a valid number');
            } else {
               var flag2 = validate_number('rejection_remarks_id','Please select a valid remark'); 
            }
            
        } else {
            var flag2 = false;
            bootbox.alert('You must select probability Win or Lost, if closing document.');
        }

         if( flag1 && flag2 && flag3 && flag4 ){
            $("#close_document_finalize").html("Saving.. Please Wait");
            $.post("/users/save_finalize_quote/"+rfq_id+"/7",val, function(data) {
                if(data.success == "true"){
                    window.location.replace("/users/quote_finalize");
                } else {
                    bootbox.alert(data.message);
                }
            });
        } 
    }
   
}

function check_for_lost(){
    if($("#probability").val() == 6){
        $("#rejection_remarks_div").show();
        $("#won_gross_sale_div").show();
        $("#won_gross_sale").val('');
    } else if($("#probability").val() == 1){
        $("#won_gross_sale_div").show();
        $("#rejection_remarks_div").find('select option:first-child').attr('selected','selected').show();
        $("#rejection_remarks_div").hide();
    } else {
        $("#rejection_remarks_div").find('select option:first-child').attr('selected','selected').show();
        $("#rejection_remarks_div").hide();
        $("#won_gross_sale_div").hide();
        $("#won_gross_sale").val('');

    }
}

function mark_obsolete(rfq_id,status){
    $("#mark_obsolete").html("Saving.. Please Wait");
    $.post("/users/mark_obsolete/"+rfq_id+"/"+status,{}, function(data) {
        if(data.success == "true"){
            window.location.replace("/users/follow_up");
        } else {
            bootbox.alert(data.message);
        }
    });
}
function mark_hold(rfq_id,status){
    $("#on_hold").html("Saving.. Please Wait");
    $.post("/users/mark_onhold/"+rfq_id+"/"+status,{}, function(data) {
        if(data.success == "true"){
            window.location.replace("/users/follow_up");
        } else {
            bootbox.alert(data.message);
        }
    });
}

function extend_validity(rfq_id){
    var flag1 = validate_date('quote_validity_date','Please select valid Date');
    if(flag1){
        $("#extend_btn").html("Saving.. Please Wait");
        var validity_date = $("#quote_validity_date").val();
        $.post("/users/extend_validity/"+rfq_id,{validity_date:validity_date}, function(data) {
            if(data.success == "true"){
                window.location.replace("/users/follow_up");
            } else {
                $("#extend_btn").html("Extend Validity Period");
                bootbox.alert(data.message);
            }
        });
    } 
}

function follow_up(type,rfq_id){
    var val = $("#quote_finalize").serialize();
    var prob = $("#probability").val();
    var flag1 = validate_date('quote_validity_date','Please select valid Date');
    //var flag3 = validate_date('quote_submission_date','Please select valid Date');
    var flag4 = validate_number('sales_price','Please put valid price');
    if(type == 1){
        var flag5 = validate_entry('next_action','Please input valid action');
        var flag6 = validate_date('by_when','Please input valid Date');
         if( flag4 && flag1 && flag5 && flag6 ){
             if(prob == 6){
                var flag2 = validate_number('rejection_remarks_id','Please select a valid remark');
            } else if(prob == 1){
                var flag2 = validate_number('won_gross_sale','Please input a valid number');
            }else {
                var flag2 = true;
            }
            if(flag2){
                $("#follow_up").html("Saving.. Please Wait");
                $.post("/users/save_followup_quote/"+rfq_id+"/6",val, function(data) {
                    if(data.success == "true"){
                        window.location.replace("/users/follow_up");
                    } else {
                        $("#follow_up").html("Follow Up");
                        bootbox.alert(data.message);
                    }
                });
            }
        }
    } else {
        var prob = $("#probability").val();
        if(prob == 1 || prob == 6){
            if(prob == 1){
               flag2 = validate_number('won_gross_sale','Please input a valid number');
            } else {
               flag2 = validate_number('rejection_remarks_id','Please select a valid remark'); 
            }
            
        } else {
            var flag2 = false;
            bootbox.alert('You must select probability Win or Lost, if closing document.');
        }

         if( flag2 && flag4 && flag1 ){
            $("#close_document_follow_up").html("Saving.. Please Wait");
            $.post("/users/save_followup_quote/"+rfq_id+"/7",val, function(data) {
                if(data.success == "true"){
                    window.location.replace("/users/follow_up");
                } else {
                    $("#follow_up").html("Follow Up");
                    bootbox.alert(data.message);
                }
            });
        } 
    }
   
}

function create_customer(){
    var flag1 = validate_entry('customer_name','Please input customer name');
    var sap_customer_id = 0;

    if($("#sap_customer_id").val() != ''){
        sap_customer_id = $("#sap_customer_id").val();
    }
    
    if( flag1){
        $("#select_btn").html("Saving.. Please Wait");
        $.post("/users/customer",{name:$("#customer_name").val(), email:$("#customer_email").val(), sap_customer_id: sap_customer_id }, function(data) {
            if(data.success == "true"){
               $("#customer_name").val('');
               $("#customer_email").val('');
               $("#sap_customer_id").val('');
               $("#close_btn").trigger('click');
               $("#select_btn").html("Create");
                $("#customers_id").html('<option>Fetching..</option>');

                $.get("/users/customer", function(data) {
                        var i;
                        var response = '<option value="0">Select Customer</option>';
                        for (i = 0; i < data.length; ++i) {
                            obj = data[i];
                            response += '<option value="'+obj.id+'">'+obj.name+'</option>';
                        }
                        $("#customers_id").html(response);
                });
            } else {
                bootbox.alert(data.message);
                $("#select_btn").html("Create");
            }
        });
    } 
}

function change_password(){
    var flag1 = validate_entry('old_p','Please fill old password');
    var flag2 = validate_password('new_p','Please fill atleast 8 character for new password');
    var flag3 = validate_password_check('re_new_p','New passwords do not match');

    if( flag1 && flag2 && flag3){
        $("#change_p").html("Saving.. Please Wait");
        $.post("/users/change_password",{old_password:$("#old_p").val(), new_password:$("#new_p").val(), confirmed_password: $("#re_new_p").val() }, function(data) {

            if(data.success == "true"){
                 $("#change_p").addClass('yellow').removeClass('green').html("Your password has been reset").removeAttr('onclick');
              
            } else {
                bootbox.alert(data.message);
                $("#change_p").html("Change Password");
            }

        });
    } 

}

function validate_password(id_info, alttext){
    var value = $("#"+id_info).val();
    var errorspan = $("#"+id_info).parent().find('span');
    var parent = $("#"+id_info).parent().parent();
    
    if(value.match(/^.{8,}$/) == null){
        errorspan.text(alttext);
        parent.addClass("has-error");
        return false;
    }
    else {
        errorspan.text("");
        parent.removeClass("has-error");
        return true;
    }
}

function validate_password_check(id_info, alttext){
    var value = $("#"+id_info).val();
    var errorspan = $("#"+id_info).parent().find('span');
    var parent = $("#"+id_info).parent().parent();
    
    if(value != $("#new_p").val()){
        errorspan.text(alttext);
        parent.addClass("has-error");
        return false;
    }
    else {
        errorspan.text("");
        parent.removeClass("has-error");
        return true;
    }
}

function revert_to_sales(rfq_id){
    var file_name = '/users/revert_to_sales/'+rfq_id;

    $("#revert_"+rfq_id).html("Processing..");
      $.post(file_name,{rfq_status_id:1}, function(data) {
        if(data.success == "true"){
            $("#tr_"+rfq_id).hide(500, function(){
                $("#tr_"+rfq_id).remove();
            });
        } else {
            bootbox.alert(data.message);
            $("#revert_"+rfq_id).html("Revert to Sales");

        }
    });
}

function copy_rfq(rfq_id){

    var file_name = '/users/copy_rfq/'+rfq_id;

    $("#copy_"+rfq_id).html("Processing..");
      $.post(file_name,{rfq_status_id:1}, function(data) {
        if(data.success == "true"){
            bootbox.alert("A copy has been successfully created.");
            $("#copy_"+rfq_id).html("Copy RFQ");

        } else {
            bootbox.alert(data.message);
            $("#copy_"+rfq_id).html("Copy RFQ");
        }
    });
}

function rfq_delete(rfq_id){
    var file_name = '/users/delete_rfq/'+rfq_id;
    var prop_line = $("#delete_"+rfq_id).parent().parent();

     bootbox.confirm("Are you sure to delete RFQ?", function(result) {
          if(result){
            
            $("#delete_"+rfq_id).html("Deleting..");
              $.post(file_name,{rfq_id:rfq_id}, function(data) {
                if(data.success == "true"){
                   prop_line.hide("slow", function(){
                        prop_line.remove();
                    });

                } else {
                    bootbox.alert(data.message);
                    $("#delete_"+rfq_id).html("Delete");
                }
            });

          }
     });
}


function copy_archive_rfq(rfq_id){
    var file_name = '/users/archive_rfq_copy/';
    var prop_line = $("#copy_"+rfq_id);

    $("#copy_"+rfq_id).html("Coping...");
    $.post(file_name,{rfq_id:rfq_id}, function(data) {
        if(data.success == "true"){
            bootbox.alert(data.message);
            prop_line.hide("slow", function(){
                prop_line.html("Copy");
            });
            prop_line.show("slow", function(){
                prop_line.html("Copy");
            });

        } else {
            bootbox.alert(data.message);
            $("#copy_"+rfq_id).html("Copy");
        }
    });
}

//VERSION 2
function print_element(elem){
    Popup($(elem).html());
}

function Popup(data){
    var mywindow = window.open('', 'my div', 'height=800,width=800');
    mywindow.document.write('<html><head><title>Minimum Price</title>');
    mywindow.document.write('<link rel="stylesheet" href="/assets/plugins/bootstrap/css/bootstrap.min.css" type="text/css" />');
    mywindow.document.write('<link rel="stylesheet" href="/assets/css/print.css" type="text/css" />');
    mywindow.document.write('</head><body onload="window.print(); window.close();">');
    mywindow.document.write('<div style="" class="modal-body"><a class="btn default">Number of Transformers: '+$("#trans_numbers").val()+'</a><br><br><div class="portlet blue box"><div class="portlet-title"><div class="caption">DCP</div><div class="tools pull-right"><a class="collapse"></a></div><input id="dcp" readonly="readonly" name="dcp" value="'+$("#dcp").val()+'" class="pull-right caption-input"></div><div id="dcp_body" class="portlet-body"><table class="table table-hover table-striped table-bordered"><tbody><tr><td>Material Cost</td><td>(EUR)</td><td><input id="material_cost" name="material_cost" class="count_change form-control" value="'+$("#material_cost").val()+'"></td></tr><tr><td>Labour Cost</td><td>(EUR)</td><td><input id="labor_cost" name="labor_cost" class="count_change form-control" value="'+$("#labor_cost").val()+'"></td></tr><tr> <td>Labour Hours</td><td>(hrs)</td><td><input id="labor_hours" name="labor_hours" class="form-control" value="'+$("#labor_hours").val()+'"></td></tr><tr> <td>Extra Engineering Hours</td><td>(hrs)</td><td><input id="extra_engineering_hours" value="'+$("#extra_engineering_hours").val()+'" name="extra_engineering_hours" class="form-control"></td></tr><tr> <td>ACC Cost</td><td>(EUR)</td><td><input id="acc_cost" name="acc" readonly="readonly" value="'+$("#acc_cost").val()+'" class="form-control"></td></tr><tr> <td>ACC Factor</td><td>(EUR)</td><td><input id="acc_factor" name="acc_factor" value="'+$("#acc_factor").val()+'" class="form-control"></td></tr></tbody></table></div></div><div class="portlet blue box"><div class="portlet-title"><div class="caption">PACKAGING</div><div class="tools pull-right"><a class="collapse"></a></div><input id="packaging" readonly="readonly" name="packaging" value="'+$("#packaging").val()+'" class="pull-right caption-input"></div><div id="packaging_body" class="portlet-body"><table class="table table-hover table-striped table-bordered"><tbody><tr><td>Cost Packaging </td><td>(EUR)</td><td>'+$("#cost_packaging option:selected").text()+'</td></tr><tr><td>Packaging Cost Transformer</td><td>(EUR)</td><td><input id="packaging_cost_transformer" name="packaging_cost_transformer" value="'+$("#packaging_cost_transformer").val()+'" class="form-control"></td></tr><tr> <td>Extra Packaging Costs Build of Parts</td><td>(EUR)</td><td><input id="extra_packaging_costs_build_of_parts" name="extra_packaging_costs_build_of_parts" value="'+$("#extra_packaging_costs_build_of_parts").val()+'" class="form-control"></td></tr></tbody></table></div></div><div class="portlet blue box"><div class="portlet-title"><div class="caption">OVERHEADS</div><div class="tools pull-right"><a class="collapse"></a></div><input id="overheads" readonly="readonly" name="overheads" value="'+$("#overheads").val()+'" class="pull-right caption-input"></div><div id="overheads_body" class="portlet-body"><table class="table table-hover table-striped table-bordered"><tbody><tr><td>Engineering Overheads</td><td>1%</td><td><input id="engineering_overheads" name="engineering_overheads" value="'+$("#engineering_overheads").val()+'" readonly="readonly" class="form-control"></td></tr><tr><td>Plant Overheads</td></td><td>10.07%</td><td><input id="plant_overheads" name="plant_overheads" value="'+$("#plant_overheads").val()+'" readonly="readonly" class="form-control"></td></tr><tr> <td>Site Overheads</td><td>6.86%</td><td><input id="site_overheads" name="site_overheads" value="'+$("#site_overheads").val()+'" readonly="readonly" class="form-control"></td></tr><tr> <td>Regional Overheads</td><td>3.61%</td><td><input id="regional_overheads" name="regional_overheads" value="'+$("#regional_overheads").val()+'" readonly="readonly" class="form-control"></td></tr><tr> <td>Product Line Overheads</td><td>1.05%</td><td><input id="product_line_overheads" name="product_line_overheads" value="'+$("#product_line_overheads").val()+'" readonly="readonly" class="form-control"></td></tr><tr> <td>Corporate Overheads</td><td>2.7%</td><td><input id="corporate_overheads" name="corporate_overheads" value="'+$("#corporate_overheads").val()+'" readonly="readonly" class="form-control"></td></tr><tr> <td>Depreciation</td><td>3.37%</td><td><input id="depreciation" name="depreciation" value="'+$("#depreciation").val()+'" readonly="readonly" class="form-control"></td></tr></tbody></table></div></div><div class="portlet blue box"><div class="portlet-title"><div class="caption">TRANSPORT</div><div class="tools pull-right"><a class="collapse"></a></div><input id="transport" readonly="readonly" name="transport" value="'+$("#transport").val()+'" class="pull-right caption-input"></div><div id="transport_body" class="portlet-body"><table class="table table-hover table-striped table-bordered"><tbody><tr><td>Freight-F term </td><td>(EUR)</td><td><input id="frieght_f_term" name="frieght_f_term" value="'+$("#frieght_f_term").val()+'" class="form-control"></td></tr><tr><td>Freight-C term</td><td>(EUR)</td><td><input id="frieght_c_term" name="friegth_c_term" value="'+$("#frieght_c_term").val()+'" class="form-control"></td></tr><tr> <td>Freight-D term</td><td>(EUR)</td><td><input id="frieght_d_term" name="friegth_d_term" value="'+$("#frieght_d_term").val()+'" class="form-control"></td></tr></tbody></table></div></div><div class="portlet blue box"><div class="portlet-title"><div class="caption">EXTRA COSTS</div><div class="tools pull-right"><a class="collapse"></a></div><input id="extra_cost" readonly="readonly" name="extra_cost" value="'+$("#extra_cost").val()+'" class="pull-right caption-input"></div><div id="extra_cost_body" class="portlet-body"><table class="table table-hover table-striped table-bordered"><tbody><tr><td>Financial Cost LOC</td><td>(EUR)</td><td><input id="financial_cost_loc" name="financial_cost_loc" value="'+$("#financial_cost_loc").val()+'" class="form-control count_change"></td></tr><tr><td>Financial Cost Bonds</td><td>(EUR)</td><td><input id="financial_cost_bonds" name="financial_cost_bonds" value="'+$("#financial_cost_bonds").val()+'" class="form-control count_change"></td></tr><tr> <td>Maintenance Equipment</td><td>(EUR)</td><td><input id="maintenance_equipment" name="maintenance_equipment" value="'+$("#maintenance_equipment").val()+'" class="form-control count_change"></td></tr><tr> <td>Administrative Cost Various</td><td>(EUR)</td><td><input id="administrative_cost_various" name="administrative_cost_various" value="'+$("#administrative_cost_various").val()+'" class="form-control count_change"></td></tr><tr> <td>Extra Documentation Required</td><td>(EUR)</td><td><input id="extra_documentation_required" name="extra_documentation_required" value="'+$("#extra_documentation_required").val()+'" class="form-control count_change"></td></tr><tr> <td>Supervision</td><td>(EUR)</td><td><input id="supervision" name="supervision" value="'+$("#supervision").val()+'" class="form-control count_change"></td></tr><tr> <td>Erection/Comm</td><td>(EUR)</td><td><input id="erection_comm" name="erection_comm" value="'+$("#erection_comm").val()+'" class="form-control count_change"></td></tr><tr> <td>Factory Training</td><td>(EUR)</td><td><input id="factory_training" name="factory_training" value="'+$("#factory_training").val()+'" class="form-control count_change"></td></tr><tr> <td>Onsite Training</td><td>(EUR)</td><td><input id="onsite_training" name="onsite_training" value="'+$("#onsite_training").val()+'" class="form-control count_change"><input id="extra_cost_with_percent" value="0" style="display:none" class="form-control count_change"></td></tr><tr> <td>Warranty On Full Cost</td><td>(%)</td><td><input id="warranty_on_full_cost" name="warranty_on_full_cost" value="'+$("#warranty_on_full_cost").val()+'" class="form-control"></td></tr></tbody></table></div></div><div class="portlet blue box"><div class="portlet-title"><div class="caption">FULL COST EXCLUDING COMMISION</div><div class="tools pull-right"><a class="collapse"></a></div></div><div class="portlet-body"><table class="table table-hover table-striped table-bordered"><tbody><tr><td>Full Cost Excluding Commision</td><td>(EUR)</td><td><input id="full_cost_excluding_commision" name="full_cost_excluding_commision" readonly="readonly" value="'+$("#full_cost_excluding_commision").val()+'" class="form-control"></td></tr><tr><td>EBIT percentage</td><td>(%)</td><td><input id="ebit_percentage" name="ebit_percentage" value="'+$("#ebit_percentage").val()+'" class="form-control"></td></tr><tr> <td>EBIT</td><td>(EUR)</td><td><input id="ebit" name="ebit" readonly="readonly" class="form-control" value="'+$("#ebit").val()+'"></td></tr></tbody></table></div></div><div class="portlet blue box"><div class="portlet-title"><div class="caption">COMMISSION</div><div class="tools pull-right"><a class="collapse"></a></div><input id="commission" value="'+$("#commission").val()+'" name="commission" class="pull-right caption-input"></div><div class="portlet-body"><table class="table table-hover table-striped table-bordered"><tbody><tr><td>Commission on net sales price </td><td>(%)</td><td><input id="commission_on_net_sales_price" name="commission_on_net_sales_price" value="'+$("#commission_on_net_sales_price").val()+'" class="form-control"></td></tr><tr><td>Commission on F-term </td><td>(%)</td><td><input id="commission_on_f_term" name="commission_on_f_term" value="'+$("#commission_on_f_term").val()+'" class="form-control"></td></tr><tr> <td>Commission on gross sales</td><td>(%)</td><td><input id="commission_on_gross_sales" name="commission_on_gross_sales" value="'+$("#commission_on_gross_sales").val()+'" class="form-control"><input id="commission_on_gross_sales_value" style="display:none" class="form-control"></td></tr></tbody></table></div></div><table class="table table-hover table-striped table-bordered"><tbody><tr><td>MINIMUM INTERCOMPANY SALES</td><td>(EUR)</td><td><input id="minimum_intercompany_sales" name="minimum_intercompany_sales" readonly="readonly" class="caption-input form-control" value="'+$("#minimum_intercompany_sales").val()+'"></td></tr><tr> <td>MINIMUM SALES PRICE TO CUSTOMER</td><td>(EUR)</td><td><input id="minimum_sales_price_to_customer" name="minimum_sales_price_to_customer" readonly="readonly" class="caption-input form-control" value="'+$("#minimum_sales_price_to_customer").val()+'"></td></tr></tbody></table></form></div>');
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10
    return true;
}

function fetch_customer(){
    var cid = $("#customers_id").val();
    if(cid == 0 || cid == ''){
        bootbox.alert('Please select a customer');
    } else {
        var file_name = '/users/customer/'+cid;
        $.get(file_name, function(data) {
            data 
            if(data.success == "true"){
                $("#basic_edit").modal("show");
                $("#customer_id_edit").val(data.customer[0].id);
                $("#customer_name_edit").val(data.customer[0].name);
                $("#customer_email_edit").val(data.customer[0].email);
                $("#sap_customer_id_edit").val(data.customer[0].sap_customer_id);
            } else {
                bootbox.alert(data.message);
            }
        });
    }
}

function edit_customer(){

    var val = $("#customer_form_edit").serialize();
    var flag1 = validate_entry('customer_name_edit','Please input customer name');
    if( flag1  ){
        var file_name = '/users/customer_edit';
        $.post(file_name,val, function(data) {
        if(data.success == "true"){
            bootbox.alert(data.message);
            $("#basic_edit").modal("hide");
            $("#customers_id option:selected").text(data.name);
            $(".select2-chosen").html(data.name);
        } else {
            bootbox.alert(data.message);
        }
        });
    }
}

function save_design_submit(rfq_lines_id){

    var item = $("save_"+rfq_lines_id);
    var value = $("#date_rfq_"+rfq_lines_id).val();
    if(value.match(/^\d{2}-\d{2}-\d{4}$/) == null){
        bootbox.alert('Input a valid date');
    } else {
        item.html('Saving');
        var file_name = '/users/save_design_submit/'+rfq_lines_id;
        $.post(file_name,{date_submit:value}, function(data) {
            if(data.success == "true"){
                $("#tr_"+rfq_lines_id).find("td").eq(4).html(value);
                $("#tr_"+rfq_lines_id).find("td").eq(5).html(data.diff);
                $("#rfq_input_"+rfq_lines_id).addClass("hidden");
                $("#reset_"+rfq_lines_id).removeClass("hidden");
            } else {
                bootbox.alert(data.message);
            }
        });
    }
}

function reset_design_submit(rfq_lines_id){
    var item = $("save_"+rfq_lines_id);
    item.html('Saving');
    var file_name = '/users/save_design_submit/'+rfq_lines_id;
    $.post(file_name,{date_submit:''}, function(data) {
        if(data.success == "true"){
            $("#tr_"+rfq_lines_id).find("td").eq(4).html('');
            $("#tr_"+rfq_lines_id).find("td").eq(5).html(data.diff);
            $("#rfq_input_"+rfq_lines_id).removeClass("hidden");
            $("#reset_"+rfq_lines_id).addClass("hidden");
        } else {
            bootbox.alert(data.message);
        }
    });
}