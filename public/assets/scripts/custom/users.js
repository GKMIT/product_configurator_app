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
        var response = '<option value="0">Select Production Plant</option>';
        for (i = 0; i < data.production_plants.length; ++i) {
            obj = data.production_plants[i];
            response += '<option value="'+obj.id+'">'+obj.name+'</option>';
        }
        $("#plants_id").html(response);

        response ='<option value="0">Select Property</option>';
        for (i = 0; i < data.product_properties.length; ++i) {
            obj = data.product_properties[i];
            response += '<option value="'+obj.id+'">'+obj.property_name+'</option>';
        }
        $("#table_body .props").html(response);
        $("#props_def").val(response);
    });
    validate_number('product_lines_id','Please select valid product line');
}

function fetch_plants_properties_pop(){
    var val = $("#product_lines_id_pop").val();

    $("#plants_id_pop").html('<option>Fetching..</option>');
    $.get("/users/fetch_plants_properties/"+val, function(data) {
        var i;
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
        $("#props_def_pop").val(response);
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
    var file_name = '/users/save_line_item/'+rfq_id;

    var flag1 = validate_number('product_lines_id','Please select valid Product Line');
    var flag2 = validate_number('plants_id','Please select valid Production plant');
    var flag3 = validate_number('number_of_units','Please input number of units');
    var flag4 = validate_date('delivery_date','Please select valid Date');
    if( flag4 && flag3 && flag2 && flag1 ){
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

function update_line_items(line_item_id){
    var val = $("#rfq_line_edit_form").serialize();
    var file_name = '/users/update_line_item/'+line_item_id;

    var flag1 = validate_number('product_lines_id_pop','Please select valid Product Line');
    var flag2 = validate_number('plants_id_pop','Please select valid Production plant');
    var flag3 = validate_number('number_of_units_pop','Please input number of units');
    var flag4 = validate_date('delivery_date_pop','Please select valid Date');
    if( flag4 && flag3 && flag2 && flag1 ){
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

function validate_number(id_info, alttext){
    var value = $("#"+id_info).val();
    var errorspan = $("#"+id_info).parent().find('span');
    var parent = $("#"+id_info).parent().parent();
    if (value.match(/^[0-9]+$/) == null || value == 0){
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

    $("#"+id_info).append('<tr><td><select id="product_properties_id" name="product_properties_id[]" class="props form-control">'+ val +'</select></td><td></td><td><input id="value" name="value[]" class="form-control"></td><td><input id="remark" name="remark[]" class="form-control"></td><td><a href="javascript:;" class="btn dark icn-only remove_prop"><i class="fa fa-times"></i></a></td></tr>');
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

$(document).on('change','.props', function() {
    var prop_line = $(this).parent().parent();
    var val = $(this).val();
    var file_name = '/users/fetch_unit/'
     $.get(file_name+val, function(data) {
        if(data.success == "true"){
            prop_line.find('td').eq(1).html(data.properties[0].unit_of_measurement);
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
        sortAsc    : 'icon-chevron-up',
        sortDesc   : 'icon-chevron-down',
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