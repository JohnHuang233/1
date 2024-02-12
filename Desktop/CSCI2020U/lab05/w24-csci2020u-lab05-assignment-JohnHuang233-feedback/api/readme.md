# API (Lab 3 - REST API Building 2)

This is your API that will serve content to anyone or anything that accesses your API endpoint.

## Prerequisites

You'll need to copy over:

- `StudentResource.java`

>You'll need to rename the package from `lab3` to `lab5`.

The data files are given to you for this lab.

> Tip: before you start working on the modifications, make sure your API still executes properly.
> After, you ensure your Lab 03 version is working in this project (lab 05), you can focus on the modification for this lab.

## Modifications

You'll need to modify all of your existing endpoints from this lab.  
Instead of returning a `String`, you need to return a `Response` object which should...

1. contain the data from the file (e.g., `students.json`)
2. contain the headers:
   1. have the corresponding `Content-Type` header to the file you're serving
   2. have CORS enabled `"Access-Control-Allow-Origin"`, you will have to set the proper origin (e.g., `http://localhost:8448/` - the address of your client-side server)
3. have the status code `200`

>In lab 3 you were never actually returning a `String` to the website, if you check the developer tools of your browser
>you'll see that a proper HTTP response was sent from Glassfish to the browser that contains the proper information.
>
>You are doing the same thing in this lab, instead of having Glassfish take care of it for you, you are making your own HTTP
>response and tailoring it to what its function is.
