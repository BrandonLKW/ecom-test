# React + TypeScript + Vite + PGSQL

public domain: https://ecom-test-a62s.onrender.com/products  
github repo: https://github.com/BrandonLKW/ecom-test  
planning tool (used initially, does not reflect project's current progress): https://trello.com/b/HyHKmy2a/raid-project

To test public accounts:  
email: testpublic@testpublic.com  
password: test

To test superuser accounts:  
email: testadmin@testadmin.com  
password:test

Comments:  
Tried to complete as many user stories within my knowledge.  
Skipped some due to time constraints.  
Styling is not my strong suit yet, decided to prioritise for functionality instead (sorry for the jank).  
Please let me know if any bugs/unintended behaviour happens or if you need me to explain any decisions made, will correct immediately as needed.

## List of user stories completed/partially completed.

1. As a customer, I want to see a list of fruits that are available to buy (complete with stock and pricing information), so that I can decide which fruits I want to buy.  
   COMPLETED  
   This is the main product page.

2. As a customer, I want to keep track of the fruits and quantity that I have shortlisted (including the total amount I need to pay), so that I can adjust my purchasing decisions as I shop.  
   COMPLETED  
   Click on shopping cart icon to view selected items.

3. As a customer, I want to submit my order of the fruits I selected, so that I can complete my purchase when I am done shopping. Assume that payment is done separate from this POS application.  
   COMPLETED  
   Checkout from cart. POS system is a simple dialog with placeholder inputs, just need to hit confirm to fire api request.

4. As an owner, I want to see the orders that my customers have submitted, so that I can fulfill their orders.  
   COMPLETED  
   Orders will load separate data based on logged user's account_type.

5. As an owner, I want to see the total sales for each day and for each fruit, so that I can track the performance of my store.  
   NOT DONE  
   Would have done a transaction history page with input fields and a search button.  
   Search button will run the input params into a SQL statement to return a list of orders.

6. As an owner, I want to be able to add new fruits and amend my stock levels, so that I can keep my online store up to date.  
   COMPLETED  
   For superuser accounts, there is an 'Add Product' button on the nav bar, and stock levels are editable in the individual products itself.

7. As a customer, I want to be able to log in and see my order history, so that I can track my previous purchases.  
   COMPLETED  
   Logged users should see the Orders tab in the nav bar.

8. As a customer, I want to be able to re-order a previous order, so that I can quickly purchase the same items again.  
   COMPLETED  
   Logged users should be able to copy the past order to the cart. Current behaviour will overwrite existing cart items.

9. As a customer, I want to know how many people are currently considering buying a fruit, so that I can make a quick decision before the stock runs out.  
   NOT DONE  
   An idea to implement this will be to create a separate datatable to store the current user cart, but this would extend to logged users only.  
   Not sure if there will be noticable performance issues with having to query the db each time the cart is updated.

10. As a customer, I want to be able to ask the store owner common questions about a fruit, so that I can make an informed decision about my purchase.  
    NOT DONE  
    Do not have a clear idea of this one, the simplest solution would probably be to have a comment section, FAQ, or allow for direct emails via a fixed form on the site.

11. As a customer, I want to be able to use the app on my phone so I can shop on the go.  
    NOT DONE  
    Understand that you can configure styling based on different viewports, but do not have the experience to do it well and efficiently.

12. As a customer, I want my order shortlist to be saved so that I can continue shopping on my device layer, even if I have not logged in.  
    COMPLETED  
    The cart details should be stored in the local storage of the browser, with the key being specific to the logged user if needed.

13. As a customer, after logging in, I want my order shortlist to be saved so that I can log in and continue shopping on another device later.  
    NOT DONE  
    This can be implemented with my suggestion for point 9 above with a separate datatable to hold these information.

14. As an owner, I want to be able to serve millions of customers at the same time, so that I can scale my business.  
    NOT DONE  
    Not sure if the db will run into any concurrency issues with multiple requests in a short period of time.

15. As an owner, I do not want my customers to be able to see the whole store's order history, or amend my stocks, or perform any actions that should only be available for me.  
    COMPLETED  
    Users and Owners are split via the account_type field in the user table (either RESTRICTED or PUBLIC).

16. As an owner, I want my customers' order submissions to be encrypted, so they cannot be intercepted by my competitors.  
    NOT DONE  
    Not sure what the requirement is, but the user password is being encrypted if it is an example of what is to be done.

17. As a customer, I want the fruit store pages to load quickly at all times, so that I can browse and shop without delays.  
    COMPLETED  
    Seems fine when personally browsing, if not this can be affected by internal factors such as inefficient queries/api calls, or external factors like the hosting services.
