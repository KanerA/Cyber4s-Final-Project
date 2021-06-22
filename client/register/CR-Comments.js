/*
 - We need to delete a stand items from DB when deleting a stand.
 - When the homepage opens after logging in, no restaurant name is chosen, 
    so trying to delete from this position will throw an error.
 - Step to retrace: 
    - launch the app and server
    - go in the app
    - see that no restaurant name is chosen in the top left corner of the page 
    (as it should because the stands owner didn't choose a stand yet)
    - try and delete one of the stands available
    - refresh the page and check the MySQL db if stand was deleted.
 - Ways to fix:
    - it's ugly but we can use the button clicked event to get to the parent element and then to the <p> of the restaurant name.
    - evt.target.parentElement.children[0].innerText;
    - Or
    - Using a ref or state when creating the stand
*/