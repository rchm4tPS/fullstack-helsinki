# Exercise 0.5: Single page app
This is a sequence diagram that shows the sequence of events when user accessing page in the `https://studies.cs.helsinki.fi/exampleapp/spa` page.
<br><br>
By: Rachmat Purwa Saputra

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: the HTML file of `/spa` page
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file for SPA version of web
    deactivate server

    Note left of browser: The browser starts executing the JavaScript code<br>by initialize empty client's notes arr<br>then making request to get JSON data

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: the JSON data is given for SPA version of web
    deactivate server

    %% Small notes:
    Note left of browser: The browser parses the incoming JSON<br>filling up client's notes arr<br>then redrawNotes()<br><br>At this part, client's notes arr<br>is not synchronized with the arr<br>in server until browser make a new<br>request to load new page with<br> new JSON data from server.

```
