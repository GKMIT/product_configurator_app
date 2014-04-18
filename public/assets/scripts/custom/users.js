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
            $.post("/users/save_rfq_product_data/"+rfq_id,val, function(data) {
                if(data == "true"){
                    $("btn_save_pro_data").html("Data Saved");
                    window.location.replace("/users/");
                } else {

                }
            });
        } else {
             $("#btn_next_pro_data").html("Saving.. Please Wait");
              $.post("/users/save_rfq_product_data/"+rfq_id,val, function(data) {
                if(data.success == "true"){
                    $("btn_save_pro_data").html("Proceeding..");
                    window.location.replace("/users/rfq_line_items/"+rfq_id);
                } else {

                }
            });
        }
    }
}

function rfq_gen_save(type){
    var val = $("#rfq_gen_form").serialize();
    var flag1 = validate_number('sales_hub_id','Please select valid Sales Hub');
    var flag2 = validate_number('customer_country','Please select valid Customer country');
    var flag3 = validate_number('customers_id','Please select valid Customer');
    var flag4 = validate_number('sales_person_id','Please select valid Sales Person');
    var flag5 = validate_number('type_of_quote_id','Please select valid Quote');
    var flag6 = validate_number('sales_segments_id','Please select valid Sales Segments');
    var flag7 = validate_number('probability','Please select valid Probability');
    var flag8 = validate_date('date_rfq','Please select valid Date');
    var flag9 = validate_date('requested_quotation','Please select valid Date');
    if( flag7 && flag6 && flag5 && flag4 && flag3 && flag2 && flag1 && flag9 && flag8  ){
        $("#btn_save").removeAttr("onclick");
        $("#btn_next").removeAttr("onclick");
        if(type == 1){
            $("#btn_save").html("Saving.. Please Wait");
            $.post("/users/newrfq",val, function(data) {
                if(data == "true"){
                    $("btn_save").html("Data Saved");
                    window.location.replace("/users/");
                } else {

                }
            });
        } else {
             $("#btn_next").html("Saving.. Please Wait");
              $.post("/users/newrfq",val, function(data) {
                if(data.success == "true"){
                    $("btn_save").html("Proceeding..");
                    // alert("/users/rfq_product_data/"+data.rfq_id);
                    window.location.replace("/users/rfq_product_data/"+data.rfq_id);
                } else {

                }
            });
        }
    }
}

// function rfq_line_save(type){
//     var val = $("#rfq_line_form").serialize();
//     var flag1 = validate_number('sales_hub_id','Please select valid Sales Hub');
//     var flag2 = validate_number('customer_country','Please select valid Customer country');
//     var flag3 = validate_number('customers_id','Please select valid Customer');
//     var flag4 = validate_number('sales_person_id','Please select valid Sales Person');
//     var flag5 = validate_number('type_of_quote_id','Please select valid Quote');
//     var flag6 = validate_number('sales_segments_id','Please select valid Sales Segments');
//     var flag7 = validate_number('probability','Please select valid Probability');
//     var flag8 = validate_date('date_rfq','Please select valid Date');
//     var flag9 = validate_date('requested_quotation','Please select valid Date');
//     if( flag7 && flag6 && flag5 && flag4 && flag3 && flag2 && flag1 && flag9 && flag8  ){
//         $("#btn_save").removeAttr("onclick");
//         $("#btn_next").removeAttr("onclick");
//         if(type == 1){
//             $("#btn_save").html("Saving.. Please Wait");
//             $.post("/users/save_rfq_line_items",val, function(data) {
//                 if(data.success== "true"){
//                     $("btn_save").html("Data Saved");
//                     window.location.replace("/users/");
//                 } else {

//                 }
//             });
//         } else {
             
//         }
//     }
// }


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
    if(value.match(/^\d{2}\/\d{2}\/\d{4}$/) == null){
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

function add_more_line_items(){
    $("#table_body").append('<tr><td><input id="product_properties_id" name="product_properties_id[]"></td><td><input id="value" name="value[]"></td><td><input id="remark" name="remark[]"></td></tr>');
}