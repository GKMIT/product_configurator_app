$(document).on('keyup change','#dcp_body input.count_change', function() {
    dcp_final();
});

$(document).on('keyup change','#extra_engineering_hours', function() {
  var hours = parseInt($(this).val()); 
  var costperhour = parseInt($("#engineering_cost_hrs").val());
  $("#extra_engineering_cost").val(hours*costperhour);
  dcp_final();
});

$(document).on('keyup change','#acc_factor', function() {
  dcp_final();
});

function dcp_final(){
  var value =0;
  $( "#dcp_body input.count_change" ).each(function() {
    if(!isNaN(parseInt($(this).val()))){
      value = value + parseInt($(this).val());
    }
  });
  var accFactor = 0;
  if( !isNaN(parseFloat($("#acc_factor").val())) ) accFactor = parseFloat($("#acc_factor").val());
  $("#dcp").val(value*accFactor);
  calculate_full_cost_ex_com();
}

  $(document).on('keyup change','#transport_body input', function() {
    var value =0;
    $( "#transport_body input" ).each(function() {
      if(!isNaN(parseInt($(this).val()))){
        value = value + parseInt($(this).val());
      }
    });
    $("#transport").val(value);
  });

  $(document).on('change','#cost_packaging', function() {
    if( $(this).val() == 1 ){
      $("#packaging").val('0');
      $("#packaging_cost_transformer").val('0');
      $("#extra_packaging_costs_build_of_parts").val('0');
    } else {
      $("#packaging").val('1100');
      $("#packaging_cost_transformer").val('500');
      $("#extra_packaging_costs_build_of_parts").val('600');
    }
    calculate_full_cost_ex_com();
  });

  $(document).on('keyup','#extra_cost_body input.count_change', function() {
    warranty_change();
    extra_final();
  });

  $(document).on('keyup','#warranty_on_full_cost', function() {
    warranty_change();
    extra_final();
  });

  function extra_final(){
    var value =0;
    $( "#extra_cost_body input.count_change" ).each(function() {
      if(!isNaN(parseInt($(this).val()))) {
        value = value + parseInt($(this).val());
      }
    });
    $("#extra_cost").val(value);
  }

  function warranty_change(){
      var value = 0;
      var percen = parseInt($("#warranty_on_full_cost").val());
      if(!isNaN(percen)){
        var sum_array = ["dcp", "overheads","transport","financial_cost_loc","financial_cost_bonds","maintenance_equipment","administrative_cost_various","supervision","erection_comm","factory_training","onsite_training"];
        var i =0;
        for(i=0;i<sum_array.length;i++){
          if(!isNaN(parseInt($("#"+sum_array[i]).val()))){
            value = value + parseInt($("#"+sum_array[i]).val());
          }
        }
        var final_val = value*percen/100;
        $("#extra_cost_with_percent").val(final_val);

      } else {
        $("#extra_cost_with_percent").val('0');
      }
  }

 function calculate_full_cost_ex_com(){

 }
