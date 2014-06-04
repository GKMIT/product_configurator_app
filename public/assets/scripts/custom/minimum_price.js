$(document).on('keyup change','#dcp_body input.count_change', function() {
    dcp_final();
});

$(document).on('keyup change','#extra_engineering_hours', function() {
  var hours = parseFloat($(this).val()); 
  var costperhour = parseFloat($("#engineering_cost_hrs").val());
  var trans_numbers = parseFloat($("#trans_numbers").val());
  $("#extra_engineering_cost").val(Math.round(hours*costperhour/trans_numbers));
  dcp_final();
});

$(document).on('keyup change','#acc_factor', function() {
  dcp_final();
});

function dcp_final(){
  var value =0;
  $( "#dcp_body input.count_change" ).each(function() {
    if(!isNaN(parseFloat($(this).val()))){
      value = value + parseFloat($(this).val());
    }
  });
  var accFactor = 0;
  if( !isNaN(parseFloat($("#acc_factor").val())) ) accFactor = parseFloat($("#acc_factor").val());
  
  var final_dcp = Math.round(value*accFactor);

  $("#dcp").val(final_dcp);
  change_overheads(final_dcp);
  warranty_change();
}

function change_overheads(final_dcp){
  var final_overhead = 0;
  $( "#overheads_body input.form-control" ).each(function() {
      var percen = parseFloat($(this).parent().parent().find('input.overhead').val());
      final_dcp = parseFloat(final_dcp);
      var trans_numbers = parseFloat($("#trans_numbers").val());
 
      if(!isNaN(percen) && !isNaN(final_dcp)){
        if($(this).attr('name') == 'engineering_overheads'){
          var this_value = Math.round(percen*final_dcp/trans_numbers);
        } else {
          var this_value = Math.round(percen*final_dcp);
        }
        
        $(this).val(this_value);
        final_overhead = final_overhead + this_value;
      } else {
        $(this).val('0');
      }
 
    });
  $("#overheads").val(Math.round(final_overhead));
}

  $(document).on('keyup change','#transport_body input', function() {
    var value =0;
    $( "#transport_body input" ).each(function() {
      if(!isNaN(parseFloat($(this).val()))){
        value = value + parseFloat($(this).val());
      }
    });
    $("#transport").val(Math.round(value));
    calculate_commission_f_frieght();
    warranty_change();

  });

  $(document).on('change','#cost_packaging', function() {
    if( $(this).val() == 1 ){
      $("#packaging").val('0');
      $("#packaging_cost_transformer").val('0');
      $("#extra_packaging_costs_build_of_parts").val('0');
    } else {
      $("#packaging").val('0');
      $("#packaging_cost_transformer").val('0');
      $("#extra_packaging_costs_build_of_parts").val('0');
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
      if(!isNaN(parseFloat($(this).val()))) {
        value = value + parseFloat($(this).val());
      }
    });
    if(!isNaN(parseFloat($("#extra_cost_with_percent")))){
       value = value + parseFloat($("#extra_cost_with_percent"));
    }
   
    $("#extra_cost").val(Math.round(value));
    calculate_full_cost_ex_com();
  }

  function warranty_change(){
      var value = 0;
      var percen = parseFloat($("#warranty_on_full_cost").val());
      if(!isNaN(percen)){
        var sum_array = ["dcp", "overheads","transport","financial_cost_loc","financial_cost_bonds","maintenance_equipment","administrative_cost_various","supervision","erection_comm","factory_training","onsite_training"];
        var i =0;
        for(i=0;i<sum_array.length;i++){
          if(!isNaN(parseFloat($("#"+sum_array[i]).val()))){
            value = value + parseFloat($("#"+sum_array[i]).val());
          }
        }
      var final_val = value*percen/100;
        $("#extra_cost_with_percent").val(Math.round(final_val));
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
      if(!isNaN(parseFloat($("#"+sum_array[i]).val()))){
        value = value + parseFloat($("#"+sum_array[i]).val());
      }
    }
    $("#full_cost_excluding_commision").val(Math.round(value));
    calculate_ebit();
 }

$(document).on('keyup change','#ebit_percentage', function() {
    calculate_ebit();
});

function calculate_ebit(){
    var ebit_percen = parseFloat($("#ebit_percentage").val()); 
    var full_cost_excluding_commision = parseFloat($("#full_cost_excluding_commision").val());
    if(!isNaN(ebit_percen) && !isNaN(full_cost_excluding_commision)){
      $("#ebit").val(Math.round(full_cost_excluding_commision*ebit_percen/100));
    } else {
      $("#ebit").val('0');
    }
    calculate_commission_net_sales();
    calculate_commission_f_frieght();

 }

function calculate_final_price(){
  var full_cost_excluding_commision = parseFloat($("#full_cost_excluding_commision").val()); 
  var ebit = parseFloat($("#ebit").val());
  var commission = parseFloat($("#commission").val());
 
 if(isNaN(full_cost_excluding_commision)) full_cost_excluding_commision = 0;
 if(isNaN(ebit)) ebit = 0;
 if(isNaN(commission)) commission = 0;
 
  $("#minimum_intercompany_sales").val(Math.round(full_cost_excluding_commision+ebit));
  $("#minimum_sales_price_to_customer").val(Math.round(full_cost_excluding_commision+ebit+commission));
}
 
$(document).on('keyup change','#commission_on_net_sales_price', function() {
    calculate_commission_net_sales();
});
 
$(document).on('keyup change','#commission_on_f_term', function() {
   calculate_commission_f_frieght();   
});
 
$(document).on('keyup change','#commission_on_gross_sales', function() {
   calculate_commission_gross_sales();   
});
 
function calculate_commission_net_sales(){
  var ebit = parseFloat($("#ebit").val());
    var commission_on_net_sales_price = parseFloat($("#commission_on_net_sales_price").val());
    if(!isNaN(ebit) && !isNaN(commission_on_net_sales_price)){
      var value = ebit/(1-commission_on_net_sales_price/100) - ebit;
      $("#commission_on_net_sales_price_value").val(Math.round(value));
 
    } else {
      $("#commission_on_net_sales_price_value").val('0');
    }
    calculate_commission_gross_sales();
}
 
function calculate_commission_f_frieght(){
    var ebit = parseFloat($("#ebit").val());
    var commission_on_f_term = parseFloat($("#commission_on_f_term").val());
    var frieght_f_term = parseFloat($("#frieght_f_term").val());
 
    if(isNaN(ebit)) ebit = 0;
    if( isNaN(frieght_f_term)) frieght_f_term = 0;
 
    if(!isNaN(commission_on_f_term)){
      var value = (ebit+frieght_f_term)/(1-commission_on_f_term/100) - (ebit+frieght_f_term);
      $("#commission_on_f_term_value").val(Math.round(value));
    } else {
      $("#commission_on_f_term_value").val('0');
    }
    calculate_commission_gross_sales();
}
 
function calculate_commission_gross_sales(){
   var full_cost_excluding_commision = parseFloat($("#full_cost_excluding_commision").val());
   var ebit = parseFloat($("#ebit").val());
   var commission_on_f_term_value = parseFloat($("#commission_on_f_term_value").val());
   var commission_on_net_sales_price_value = parseFloat($("#commission_on_net_sales_price_value").val());
   var commission_on_gross_sales = parseFloat($("#commission_on_gross_sales").val());
  
   if(isNaN(ebit)) ebit = 0;
   if(isNaN(full_cost_excluding_commision)) full_cost_excluding_commision = 0;
   if(isNaN(commission_on_f_term_value)) commission_on_f_term_value = 0;
   if(isNaN(commission_on_net_sales_price_value)) commission_on_net_sales_price_value = 0;
 
 
    if(!isNaN(commission_on_gross_sales)){
      var sumup = ebit + full_cost_excluding_commision + commission_on_f_term_value + commission_on_net_sales_price_value;
      var value = sumup/(1-commission_on_gross_sales/100) - sumup;
      $("#commission_on_gross_sales_value").val(Math.round(value));
    } else {
      $("#commission_on_gross_sales_value").val('0');
    }
 
    calculate_final_commission();
}
 
function calculate_final_commission(){
 
 var commission_on_f_term_value = parseFloat($("#commission_on_f_term_value").val());
 var commission_on_net_sales_price_value = parseFloat($("#commission_on_net_sales_price_value").val());
 var commission_on_gross_sales_value = parseFloat($("#commission_on_gross_sales_value").val());
 
 if(isNaN(commission_on_f_term_value)) commission_on_f_term_value = 0;
 if(isNaN(commission_on_net_sales_price_value)) commission_on_net_sales_price_value = 0;
 if(isNaN(commission_on_gross_sales_value)) commission_on_gross_sales_value = 0;
 
 var sumup = commission_on_f_term_value + commission_on_net_sales_price_value + commission_on_gross_sales_value;
 
 $("#commission").val(Math.round(sumup));
 
  calculate_final_price();
}
 
jQuery(document).ready(function() {
    calculate_full_cost_ex_com();
});
