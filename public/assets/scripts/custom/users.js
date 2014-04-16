function fetch_sales_persons(){
    var val = $("#sales_hub_id").val();
    $("#sales_person_id").html('<option>Fetching..</option>');
    $.get("/users/fetch_sales_persons/"+val, function(data) {
        var i;
        var response = '';
        for (i = 0; i < data.length; ++i) {
            obj = data[i];
            response += '<option value="'+obj.id+'">'+obj.user_name+'</option>';
        }
        $("#sales_person_id").html(response);
    });
}

function fetch_sales_agents(){
    var val = $("#installation_country").val();
    $("#sales_agent").html('<option>Fetching..</option>');
    $.get("/users/fetch_sales_agents/"+val, function(data) {
        var i;
        var response = '';
        for (i = 0; i < data.length; ++i) {
            obj = data[i];
            response += '<option value="'+obj.id+'">'+obj.name+'</option>';
        }
        $("#sales_agent").html(response);
    });
}

function rfq_gen_save(){
    var val = $("#rfq_gen_form").serialize();
    $.post("/users/newrfq",val, function(data) {

    });
}