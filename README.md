Product-Configurator
====================
~ RFQ General Product Data
  init:
    get /rfq_general_data/member_id/rfq_id where rfq_id = 0 for new rfq
    res: sales_hubs, countries, customers, type_of_quotes, sales_segments, selected_rfq(blank if new), selected_hubs->sales_persons(blank if new),selected_customer_countries->sales_agents(blank if new)
    
~ RFQ General Product Data
  init:
    get /rfq_product_lines/member_id/rfq_id
    res: product_lines, product_lines->tendering_teams(blank if product_lines_id is 0), tendering_teams->tendering_team_members(blank if product_lines_id is 0 )
