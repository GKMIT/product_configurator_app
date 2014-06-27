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
    var flag1 = validate_number('product_lines_id','Please select valid Product line');
    var flag2 = validate_number('tendering_teams_id','Please select valid Tendering team');
    var flag3 = validate_number('tendering_teams_members_id','Please select valid Tendering team member');
    if( flag1 && flag2 && flag3  ){
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

    var flag1 = validate_number('sales_hub_id','Please select valid Sales Hub');var flag2 = validate_number('customer_country','Please select valid Customer country');var flag3 = validate_number('customers_id','Please select valid Customer');var flag4 = validate_number('sales_person_id','Please select valid Sales Person');var flag5 = validate_number('type_of_quote_id','Please select valid Quote');var flag6 = validate_number('sales_segments_id','Please select valid Sales Segments');var flag7 = validate_number('probability','Please select valid Probability');var flag8 = validate_date('date_rfq','Please select valid Date');var flag9 = validate_date('requested_quotation','Please select valid Date');
    if( flag7 && flag6 && flag5 && flag4 && flag3 && flag2 && flag1 && flag9 && flag8  ){
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
    var flag2 = validate_number('plants_id','Please select valid Production plant');
    var flag3 = validate_number('number_of_units','Please input number of units');
    var flag4 = validate_date('delivery_date','Please select valid Date');
    var flag5 = validate_tech('table_body');
    if( flag4 && flag3 && flag2 && flag1 && flag5 ){
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
    var flag2 = validate_number('plants_id_pop','Please select valid Production plant');
    var flag3 = validate_number('number_of_units_pop','Please input number of units');
    var flag4 = validate_date('delivery_date_pop','Please select valid Date');
    var flag5 = validate_tech('table_body_pop');
    if( flag4 && flag3 && flag2 && flag1 && flag5 ){
        $("#btn_update").html("Updating.. Please Wait");
        $.post(file_name,val, function(data) {
            if(data.success == "true"){
                $('#close_btn').trigger('click');
                $("#row_line_item_"+line_item_id).find('td').eq(0).html($("#product_lines_id_pop").find('option:selected').text());
                $("#row_line_item_"+line_item_id).find('td').eq(1).html($("#plants_id_pop").find('option:selected').text());
                $("#row_line_item_"+line_item_id).find('td').eq(2).html($("#number_of_units_pop").val());
                $("#row_line_item_"+line_item_id).find('td').eq(3).html($("#delivery_date_pop").val());
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

    $("#btn_submit").removeAttr("onclick");
    
    var flag1 = validate_number('estimated_sales_price','Please input a valid number');
    if(flag1){
         $.post("/users/rfq_submit_bid/"+rfq_id,{estimated_sales_price:$("#estimated_sales_price").val()}, function(data) {
            $("#btn_submit").html("Saving.. Please Wait");
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
    $(".modal-title").html('Select Product Design');
    $("#select_btn").removeAttr('onclick');
    $(".modal-body").html('Loading..');
    $("#select_btn").attr('onclick','select_design('+rfq_id+','+rfq_lines_id+')');
    
    var tableform= $("#property_table_"+rfq_lines_id);
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
        $.post("/users/product_designs/"+rfq_id+"/"+rfq_lines_id,{properties:jsonArr}, function(data) {
           if(data.success == 'false'){
            bootbox.alert(data.message);
           } else {
                $("#basic").modal("show");
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

    var flag1 = validate_number('sales_price','Please select valid Sales price',1);
    var flag2 = validate_number('weeks_sel','Please select valid no of weeks',1);
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
             $("#product_design_details_"+rfq_lines_id).html('<a href="javascript:;" onclick="product_designs('+rfq_id+','+rfq_lines_id+')" class="btn blue">Apply Filters</a>');
                portlet_design.find('.portlet-title .choose_btn').html('Choose');

                $("#property_table_"+rfq_lines_id).append('<div class="row"><div class="com-md-12"><a id="add_more" href="javascript:;" style="margin-bottom:20px;margin-left:15px;" onclick="add_more_props(\'property_tbody_'+rfq_lines_id+'\',1)" class="btn purple">Add More Properties</a></div></div>');

        } else{
            bootbox.alert(data.message);
        }
    });
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
    $("#product_design_details_"+rfq_lines_id).html('<a href="javascript:;" onclick="product_designs('+rfq_id+','+rfq_lines_id+')" class="btn blue">Apply Filters</a>');

    $("#property_table_"+rfq_lines_id).append('<div class="row"><div class="com-md-12"><a id="add_more" href="javascript:;" style="margin-bottom:20px;margin-left:15px;" onclick="add_more_props(\'property_tbody_'+rfq_lines_id+'\',1)" class="btn purple">Add More Properties</a></div></div>');

}

function minimum_price_ui(rfq_lines_id,product_design_id){
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
            $("#product_design_details_"+rfq_lines_id).find("#sales_price").val($("#minimum_sales_price_to_customer").val());
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
    var flag3 = validate_date('quote_submission_date','Please select valid Date');
    var flag4 = validate_number('sales_price','Please select valid Date');
    if(type == 1){
         if( flag1 && flag3 && flag4 ){
            if(prob == 6){
                var flag2 = validate_number('rejection_remarks_id','Please select a valid remark');
            } else {
                var flag2 = true;
            }
            if(flag2){
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
                flag2 = true;
            } else {
               flag2 = validate_number('rejection_remarks_id','Please select a valid remark'); 
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
    } else {
        $("#rejection_remarks_div").find('select option:first-child').attr('selected','selected').show();
        $("#rejection_remarks_div").hide();
    }
}

function mark_obsolete(rfq_id){
    $("#mark_obsolete").html("Saving.. Please Wait");
    $.post("/users/mark_obsolete/"+rfq_id+"/8",{}, function(data) {
        if(data.success == "true"){
            window.location.replace("/users/follow_up");
        } else {
            bootbox.alert(data.message);
        }
    });
}

function follow_up(type,rfq_id){
    var val = $("#quote_finalize").serialize();
    var prob = $("#probability").val();
    var flag1 = validate_date('quote_validity_date','Please select valid Date');
    var flag3 = validate_date('quote_submission_date','Please select valid Date');
    var flag4 = validate_number('sales_price','Please select valid Date');
    if(type == 1){
         if( flag1 && flag3 && flag4 ){
            if(prob == 6){
                var flag2 = validate_number('rejection_remarks_id','Please select a valid remark');
            } else {
                var flag2 = true;
            }
            if(flag2){
                $("#follow_up").html("Saving.. Please Wait");
                $.post("/users/save_finalize_quote/"+rfq_id+"/6",val, function(data) {
                    if(data.success == "true"){
                        window.location.replace("/users/follow_up");
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
                flag2 = true;
            } else {
               flag2 = validate_number('rejection_remarks_id','Please select a valid remark'); 
            }
            
        } else {
            var flag2 = false;
            bootbox.alert('You must select probability Win or Lost, if closing document.');
        }

         if( flag1 && flag2 && flag3 && flag4 ){
            $("#close_document_follow_up").html("Saving.. Please Wait");
            $.post("/users/save_finalize_quote/"+rfq_id+"/7",val, function(data) {
                if(data.success == "true"){
                    window.location.replace("/users/follow_up");
                } else {
                    bootbox.alert(data.message);
                }
            });
        } 
    }
   
}
