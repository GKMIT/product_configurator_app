$(document).on('keyup change','#dcp_body input.count_change', function() {
    dcp_final();
});

$(document).on('keyup change','#extra_engineering_hours', function() {
  var hours = parseInt($(this).val()); 
  var costperhour = parseInt($("#engineering_cost_hrs").val());
  var trans_numbers = parseInt($("#trans_numbers").val());
  $("#extra_engineering_cost").val(hours*costperhour/trans_numbers);
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
  warranty_change();
}

  $(document).on('keyup change','#transport_body input', function() {
    var value =0;
    $( "#transport_body input" ).each(function() {
      if(!isNaN(parseInt($(this).val()))){
        value = value + parseInt($(this).val());
      }
    });
    $("#transport").val(value);
    warranty_change();

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
    if(!isNaN(parseInt($("#extra_cost_with_percent")))){
       value = value + parseInt($("#extra_cost_with_percent"));
    }
   
    $("#extra_cost").val(value);
    calculate_full_cost_ex_com();
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
      extra_final();
  }

 function calculate_full_cost_ex_com(){
    var sum_array = ["dcp","packaging", "overheads","transport","extra_cost"];
    var i =0;
    var value = 0;
    for(i=0;i<sum_array.length;i++){
      if(!isNaN(parseInt($("#"+sum_array[i]).val()))){
        value = value + parseInt($("#"+sum_array[i]).val());
      }
    }
    $("#full_cost_excluding_commision").val(value);
    calculate_ebit();
 }

$(document).on('keyup change','#ebit_percentage', function() {
    calculate_ebit();
});

function calculate_ebit(){
    var ebit_percen = parseInt($("#ebit_percentage").val()); 
    var full_cost_excluding_commision = parseInt($("#full_cost_excluding_commision").val());
    if(!isNaN(ebit_percen) && !isNaN(full_cost_excluding_commision)){
      $("#ebit").val(full_cost_excluding_commision*ebit_percen/100);
    } else {
      $("#ebit").val('0');
    }
 }
